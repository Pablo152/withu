const express = require("express")
const app = express();
const path = require("path")
const cors = require("cors");
app.use(cors());

const httpServer = require("http").createServer(app);
const options = {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
};
const io = require("socket.io")(httpServer, options);

app.use(express.static(path.join(__dirname, '../build')));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
})


io.on("connection", (socket) => {
  socket.on("join-room", (data) => {
    socket.join(data)
  });

  socket.on("play", (data) => {
    socket.to(data).emit("playing")
  });

  socket.on("pause", (data) => {
    socket.to(data).emit("paused")
  });

  socket.on("progress", (data) => {
    socket.to(data).emit("progressing", data)
  });

  socket.on("start", (data) => {
    socket.to(data).emit("starting", data)
  });

  socket.on("seek", (data, channel) => {
    socket.to(channel).emit("seeking", data)
  });

  socket.on("message", (data, channel) => {
    const key = Math.random().toString(36).substr(2, 5);
    const time = new Date();
    const timeFormattedString = `${time.getHours()}:${time.getMinutes()}`
    socket.to(channel).emit("messaging", data, key, timeFormattedString)
  })

});

httpServer.listen(process.env.PORT || 3001);