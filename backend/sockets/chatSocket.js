const {saveMessage} = require('../controllers/chatController');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    socket.on('sendMessage', async (data) => {
      try {
        const savedMessage = await saveMessage(data);
    
        // Emit back to sender and/or receiver if you want
        socket.emit('messageSaved', savedMessage);
        
        // OR broadcast to receiver
        socket.to(data.receiverId).emit('receive_message', savedMessage);
      } catch (error) {
        console.error("Socket Message Save Error:", error);
        socket.emit('error_saving_message', { message: error.message });
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
};
