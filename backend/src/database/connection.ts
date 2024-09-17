const mongoose = require('mongoose');

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Connected to MongoDB');
  } catch (error) {
    throw new Error("Cannot connect to MongoDB");
  }
};

// export default dbConnection;

export const dbDisConnect = async () => {
    try {
      await mongoose.disconnect();
      console.log('Connected to MongoDB');
    } catch (error) {
      throw new Error("Cannot disconnect to MongoDB");
    }
  };