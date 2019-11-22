const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 3000;
const { RoomStatuses } = require("../enums");

app.use(cors());
app.use(bodyParser.json());

let Rooms = [];

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
    users: []
  };
  Rooms.push(newRoom);
  res.json(newRoom);
});
roomRoutes.route("/:roomNumber").get((req, res) => {
  const roomNumber = parseInt(req.params.roomNumber);
  const foundRoom = Rooms.find(room => room.roomNumber === roomNumber);
  res.json(foundRoom);
});

const optionsRoute = express.Router();
app.use("/options", optionsRoute);
optionsRoute.route("/add").post((req, res) => {
  const { newOption, roomNumber } = req.body;
  const foundRoom = Rooms.find(
    room => room.roomNumber === parseInt(roomNumber)
  );
  const updatedOptions = {
    ...foundRoom.options,
    newOption
  };
  const updatedRoom = {
    ...foundRoom,
    options: updatedOptions
  };
  Rooms = Rooms.filter(rm => rm.roomNumber !== roomNumber);
  Rooms.push(updatedRoom);
  res.json("Success");
});

const server = app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});

const io = require("socket.io")(server);
io.on("connection", function(socket) {
  socket.on("join", function(data) {
    const { roomNumber, userName } = data;
    console.log("joining room: ", roomNumber);
    socket.join(roomNumber);
    const foundRoom = Rooms.find(aRoom => aRoom.roomNumber === roomNumber);
    if (foundRoom) {
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

      const updatedUsers = [...foundRoom.users, { name: nameBuilder }];
      const updatedRoom = { ...foundRoom, users: updatedUsers };
      Rooms = Rooms.filter(rm => rm.roomNumber !== roomNumber);
      Rooms.push(updatedRoom);
      console.log("User ", nameBuilder, " Room ", roomNumber);
      io.to(roomNumber).emit("UPDATED_OPTIONS", foundRoom.options);
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
    }
    Rooms = Rooms.filter(rm => rm.roomNumber !== data.roomNumber);
    Rooms.push(updatedRoom);
    io.to(data.roomNumber).emit("SET_ROOM_STATUS", updatedRoom.dotVoting);
  });
});
