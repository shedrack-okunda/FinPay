import { Server } from "socket.io";
import jwt from "jsonwebtoken";
let io;
export const initializeSocketIO = (socketServer) => {
    io = socketServer;
    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            socket.userId = decoded.userId;
            socket.join(decoded.userId);
            next();
        }
        catch (err) {
            next(new Error("Authentication error"));
        }
    });
    io.on("connection", (socket) => {
        console.log(`User ${socket.userId} connected`);
        socket.on("disconnect", () => {
            console.log(`User ${socket.userId} disconnected`);
        });
    });
};
export const getSocketIO = () => {
    if (!io) {
        throw new Error("Socket.IO not initialized");
    }
    return io;
};
//# sourceMappingURL=socketService.js.map