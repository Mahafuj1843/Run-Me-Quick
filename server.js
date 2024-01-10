import app from "./app.js"
import { Server } from "socket.io";
import { connected } from './config/db.js'

const PORT = process.env.PORT || 8081;

const host = app.listen(PORT, () => {
    connected();
    console.log(`Server is running at port ${PORT}`)
})

export const io = new Server(host, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:5173"
    },
})

io.on("connection", (socket) => {

    socket.on("setup", (executionData) => {
        socket.join(executionData._id)
        socket.emit("connected")
    })

    socket.off("setup", () => {
        console.log("DISCONNECTED");
        socket.leave(executionData._id);
    });
});