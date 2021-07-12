const mongoose = require('mongoose');

async function initializeDBConnection() {
    try {
        await mongoose.connect(process.env.DB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });

        console.log('succefully connected to remote DB');
    } catch (error) {
        console.log('mongose connection failed.....', error);
    }
}

module.exports = { initializeDBConnection };
