const mongoose = require('mongoose');

const connectToMongo = () => {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('connected to MongoDB!'))
        .catch(error => console.log(error))
}

module.exports = connectToMongo;
