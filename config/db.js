const mongoose = require('mongoose');

const mongo_uri = 'mongodb+srv://ajay123:ajay123@transactions-puvlf.mongodb.net/knightmob?retryWrites=true&w=majority';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(mongo_uri, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch(err) {
        console.log(`ErrorL ${err.message}`.red);
        process.exit(1);
    }
}

module.exports = connectDB;