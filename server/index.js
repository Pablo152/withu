const app = require("express")();
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

io.on("connection", (socket) => {
  socket.on("play", () => {
    socket.emit("playing")
  });

  socket.on("pause", () => {
    socket.emit("paused")
  });

  socket.on("seek", (data) => {
    socket.emit("seeking", data)
  });

  socket.on("progress", (data) => {
    socket.emit("progressing", data)
  });

  socket.on("message", (data) => {
    const key = Math.random().toString(36).substr(2, 5);
    socket.emit("messaging", data, key)
  })

});

httpServer.listen(3001);