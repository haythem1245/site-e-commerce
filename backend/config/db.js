const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connecté avec succès !');
  } catch (error) {
    console.error('Erreur MongoDB :', error.message);

  }
};

module.exports = connectDB;
