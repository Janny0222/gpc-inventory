import { Server } from 'socket.io';

export default async function handler(req, res) {
    if (!res.socket.server.io) {
        console.log('New socket.io server');
        const io = new Server(res.socket.server);

        // Handle connection event
        io.on('connection', (socket) => {
            console.log('Client connected');

            // Handle events here
            socket.on('inventoryUpdated', () => {
                console.log('Inventory updated event received');

                // Broadcast updated data to all connected clients
                io.emit('inventoryDataUpdated');
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });

        res.socket.server.io = io;
    } else {
        console.log('Reusing existing socket.io server');
    }
    res.end();
}