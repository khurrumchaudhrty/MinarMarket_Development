// const {saveMessage} = require('../controllers/chatController');

// module.exports = (io) => {
//   io.on('connection', (socket) => {
//     console.log('New client connected:', socket.id);

//     socket.on('join', (userId) => {
//       socket.join(userId); // 🔥 Join a room using the user ID
//       console.log(`User ${userId} joined room`);
//     });

//     socket.on('sendMessage', async (data) => {
//       try {
//         const savedMessage = await saveMessage(data);
    
//         // Emit back to sender and/or receiver if you want
//         socket.emit('messageSaved', savedMessage);
        
//         // OR broadcast to receiver
//         socket.to(data.receiverId).emit('receive_message', savedMessage);
//       } catch (error) {
//         console.error("Socket Message Save Error:", error);
//         socket.emit('error_saving_message', { message: error.message });
//       }
//     });

//     socket.on('disconnect', () => {
//       console.log('Client disconnected:', socket.id);
//     });
//   });
// };
const { saveMessage } = require('../controllers/chatController');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    // 🔥 Listen for user joining their own room
    socket.on('join', (userId) => {
      socket.join(userId);
      console.log(`User ${userId} joined room`);
    });

    // Listen for sending messages
    socket.on('sendMessage', async (data) => {
      try {
        const savedMessage = await saveMessage(data);

        // Send confirmation back to sender (optional)
        socket.emit('messageSaved', savedMessage);

        // 🔥 Emit to the receiver's room (userId-based room)
        io.to(data.receiverId).emit('receive_message', savedMessage);
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
