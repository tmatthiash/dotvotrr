const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 3000;

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
    options: []
  };
  Rooms.push(newRoom);
  console.log("New Room", newRoom);
  console.log("Number of Rooms: ", Rooms.length);
  res.json(newRoom);
});
roomRoutes.route("/:roomNumber").get((req, res) => {
  const roomNumber = parseInt(req.params.roomNumber);
  const foundRoom = Rooms.find(room => room.roomNumber === roomNumber);
  console.log("found", foundRoom);
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

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});
