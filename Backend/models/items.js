const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    ownerId: {
        type: String,
        // ref: 'owner',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageLink: {
        type: String,
        required: false
    },
    quantity: {
        type: Number,
        required: false
    },
    availabilityStatus: {
        type: Boolean,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: false,
    },

})

module.exports = mongoose.model('Items', itemSchema); 