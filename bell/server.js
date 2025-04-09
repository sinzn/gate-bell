const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const player = require('play-sound')({});
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

// ✅ Function to play bell on server side (non-blocking, background)
function playBellSound() {
    const bellPath = path.join(__dirname, 'public', 'bell.mp3');
    player.play(bellPath, function (err) {
        if (err) {
            console.error('🔴 Failed to play bell sound:', err);
        } else {
            console.log('🔊 Server bell played.');
        }
    });
}

io.on('connection', (socket) => {
    console.log('🟢 Client connected');

    socket.on('ring-bell', () => {
        console.log('🔔 Bell pressed by client');
        playBellSound();         // Play on server
        socket.emit('bell-rung');    // Broadcast to clients
    });

    socket.on('disconnect', () => {
        console.log('🔴 Client disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
