const { Server } = require("socket.io");

process.loadEnvFile();

const PORT = process.env.PORT || 7860;
const io = new Server({
  cors: {
    origin: ["http://localhost:3000", "https://errorbattle.vercel.app"],
    methods: ["GET", "POST"],
  },
});

io.listen(PORT, {
  host: "0.0.0.0",
});

console.log(`Socket.io server is running on port ${PORT}`);

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("join_room", (roomcode) => {
    socket.join(roomcode);
    console.log(`socketid : ${socket.id} joined to room ${roomcode}`);
  });

  socket.on("send_message", (msgobj, roomcode) => {
    socket.to(roomcode).emit("recieve_message", msgobj);
  });

  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`);
  });
});
