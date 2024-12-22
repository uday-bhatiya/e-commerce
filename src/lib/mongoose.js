import mongoose from 'mongoose';

let isConnected = false; // connection status

const connectDb = async () => {
    if (isConnected) {
        console.log('Already connected to MongoDB');
        return;
    }

    if (!process.env.MONGODB_URL) {
        throw new Error('MONGODB_URL environment variable is not defined');
    }

    try {
        const connection = await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        isConnected = connection.connections[0].readyState === 1;
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error; 
    }
};

export default connectDb;
