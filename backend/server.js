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
    options: []
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
  socket.on("join", function(room) {
    console.log("joining room: ", room);
    socket.join(room);
    const foundRoom = Rooms.find(aRoom => aRoom.roomNumber === room);
    if (foundRoom) {
      io.to(room).emit("UPDATED_OPTIONS", foundRoom.options);
    }
  });

  socket.on("ADD_OPTION", function(data) {
    console.log("adding option");
    const { newOption, roomNumber } = data;
    const foundRoom = Rooms.find(
      room => room.roomNumber === parseInt(roomNumber)
    );
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
});
