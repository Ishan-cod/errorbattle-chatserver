const { Server } = require("socket.io");
const io = new Server({
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.listen(4000);

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("join_room", (roomcode) => {
    socket.join(roomcode);
    console.log(`socketid : ${socket.id} joined to room ${roomcode}`);
  });

  socket.on("send_message", (msgobj, roomcode) => {
    socket.to(roomcode).emit("recieve_message", msgobj);
  });
});
