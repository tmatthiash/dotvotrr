const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { RoomStatuses } = require("../enums");
var schedule = require("node-schedule");

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

let Rooms = [];

const ONE_HOUR = 60 * 60 * 1000;
schedule.scheduleJob("00 * * * *", function() {
  const now = new Date();
  console.log("roomcount before: ", Rooms.length);
  Rooms = Rooms.filter(rm => now - rm.createdAtDate < ONE_HOUR * 3);
  console.log("roomcount after: ", Rooms.length);
});

app.use("/", express.static("../dist"));
app.get("/", (req, res) => {
  const path = require("path");
  res.sendFile(path.resolve("../dist/index.html"));
});

const roomRoutes = express.Router();
app.use("/NewRoom", roomRoutes);
roomRoutes.route("/").post((req, res) => {
  const RoomName = req.body.RoomName;
  const adminName = req.body.UserName;
  const votesPerPerson = req.body.selectedVoteNumber;
  const roomNumber = Math.floor(1000 + Math.random() * 9000);
  const newRoom = {
    RoomName,
    adminName,
    votesPerPerson,
    roomNumber,
    roomStatus: RoomStatuses.addingOptions,
    options: [],
    users: [],
    totalVotes: 0,
    createdAtDate: new Date()
  };
  Rooms.push(newRoom);
  res.json(newRoom);
});
roomRoutes.route("/:roomNumber").get((req, res) => {
  const roomNumber = parseInt(req.params.roomNumber);
  const foundRoom = Rooms.find(room => room.roomNumber === roomNumber);
  if (!foundRoom) {
    res.json(false);
  } else {
    res.json(foundRoom);
  }
});

// const optionsRoute = express.Router();
// app.use("/options", optionsRoute);
// optionsRoute.route("/add").post((req, res) => {
//   const { newOption, roomNumber } = req.body;
//   const foundRoom = Rooms.find(
//     room => room.roomNumber === parseInt(roomNumber)
//   );
//   const updatedOptions = {
//     ...foundRoom.options,
//     newOption
//   };
//   const updatedRoom = {
//     ...foundRoom,
//     options: updatedOptions
//   };
//   Rooms = Rooms.filter(rm => rm.roomNumber !== roomNumber);
//   Rooms.push(updatedRoom);
//   res.json("Success");
// });

const resultBuilder = roomNumber => {
  const foundRoom = Rooms.find(room => room.roomNumber === roomNumber);
  if (!foundRoom) {
    return;
  }

  const combinedVotes = foundRoom.users.reduce((accumulator, currentValue) => {
    const retValue = accumulator.concat(currentValue.votes);
    return retValue;
  }, []);

  return foundRoom.options
    .map(opt => {
      return {
        name: opt,
        count: combinedVotes.filter(cv => cv === opt).length
      };
    })
    .sort((a, b) => a.count < b.count);
};

const server = app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});

const io = require("socket.io")(server);
io.on("connection", function(socket) {
  socket.on("join", function(data) {
    const { roomNumber, userName, effectiveUUID } = data;
    console.log("joining room: ", roomNumber);
    socket.join(roomNumber);
    const foundRoom = Rooms.find(aRoom => aRoom.roomNumber === roomNumber);

    if (!foundRoom) {
      return;
    }

    const foundUser = foundRoom.users.find(u => u.UUID === effectiveUUID);
    if (!foundUser) {
      let isNameGood = false;
      let nameBuilder = userName;
      let i = 2;
      while (!isNameGood) {
        if (
          foundRoom.users.filter(us => us.name === nameBuilder).length === 0
        ) {
          isNameGood = true;
        } else {
          nameBuilder = userName + "(" + i + ")";
          i = i + 1;
        }
      }

      const updatedUsers = [
        ...foundRoom.users,
        { name: nameBuilder, UUID: effectiveUUID, votes: [] }
      ];
      const updatedRoom = { ...foundRoom, users: updatedUsers };
      Rooms = Rooms.filter(rm => rm.roomNumber !== roomNumber);
      Rooms.push(updatedRoom);
      console.log("User ", nameBuilder, " Room ", roomNumber);

      io.to(roomNumber).emit("UPDATED_OPTIONS", foundRoom.options);
      io.to(roomNumber).emit("UPDATED_USER_COUNT", updatedUsers.length);
      if (nameBuilder !== userName) {
        console.log("emitting ", nameBuilder);
        socket.emit("FORCE_NAME_CHANGE", nameBuilder);
      }
    }
  });

  socket.on("ADD_OPTION", function(data) {
    console.log("adding option");
    const { newOption, roomNumber } = data;
    const foundRoom = Rooms.find(
      room => room.roomNumber === parseInt(roomNumber)
    );
    if (!foundRoom) {
      return;
    }
    if (foundRoom.options.filter(op => op === newOption).length !== 0) {
      return;
    }
    console.log("old Options", foundRoom.options);
    const updatedOptions = [...foundRoom.options, newOption];
    const updatedRoom = {
      ...foundRoom,
      options: updatedOptions
    };
    Rooms = Rooms.filter(rm => rm.roomNumber !== roomNumber);
    Rooms.push(updatedRoom);
    console.log("UpdatedOptions", updatedOptions);
    io.to(roomNumber).emit("UPDATED_OPTIONS", updatedOptions);
  });

  socket.on("ADVANCE_ROOM", function(data) {
    console.log("advancinig", data);
    const foundRoom = Rooms.find(aRoom => aRoom.roomNumber === data.roomNumber);
    if (!foundRoom) {
      return;
    }
    let updatedRoom;
    if (foundRoom.roomStatus === RoomStatuses.addingOptions) {
      updatedRoom = {
        ...foundRoom,
        roomStatus: RoomStatuses.dotVoting
      };
    } else if (foundRoom.roomStatus === RoomStatuses.dotVoting) {
      updatedRoom = {
        ...foundRoom,
        roomStatus: RoomStatuses.results
      };
      const theResults = resultBuilder(data.roomNumber);
      io.to(data.roomNumber).emit("UPDATE_RESULTS", theResults);
    } else {
      return;
    }
    Rooms = Rooms.filter(rm => rm.roomNumber !== data.roomNumber);
    Rooms.push(updatedRoom);
    io.to(data.roomNumber).emit("SET_ROOM_STATUS", updatedRoom.roomStatus);
  });

  socket.on("ADD_VOTE", function(data) {
    const { roomNumber, option, UUID } = data;
    const foundRoom = Rooms.find(aRoom => aRoom.roomNumber === roomNumber);
    if (!foundRoom) {
      console.log("no room found");
      return;
    }
    const foundUser = foundRoom.users.find(u => u.UUID === UUID);
    if (!foundUser) {
      console.log("no user");

      return;
    }
    if (foundUser.votes.length >= foundRoom.votesPerPerson) {
      console.log("too many votes");

      return;
    }
    const newVotes = [...foundUser.votes, option];
    const newUser = { ...foundUser, votes: newVotes };
    const filteredUsers = foundRoom.users.filter(u => u.UUID !== UUID);
    const updatedUsers = [...filteredUsers, newUser];
    const newRoom = {
      ...foundRoom,
      users: updatedUsers,
      totalVotes: foundRoom.totalVotes + 1
    };
    Rooms = Rooms.filter(rm => rm.roomNumber !== roomNumber);
    Rooms.push(newRoom);
    socket.emit("UPDATE_OWN_VOTES", newVotes);

    io.to(roomNumber).emit("UPDATE_TOTAL_VOTES", newRoom.totalVotes);
  });
});
