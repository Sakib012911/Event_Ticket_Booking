
const mongoose = require("mongoose")
const { Schema } = mongoose

const bookingSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "event"
    },
    eventDate:{
        type:Date,
        require:true
    },
    bookingDate: {
        type: Date,
        default: Date.now // Automatically set the booking date to the current date
    },
    ticketsBooked: {
        type: Number,
        required: true // Number of tickets booked
    },
    totalPrice: {
        type: Number,
        required: true // Total price for the tickets booked
    }
    // bookingStatus: {
    //     type: String,
    //     enum: ['pending', 'confirmed', 'cancelled'], // Define possible booking statuses
    //     default: 'pending' // Default status is 'pending'
    // },
    // otpVerified: {
    //     type: Boolean,
    //     default: false // OTP is not verified by default
    // },
    // otpSentAt: {
    //     type: Date // Time when OTP was sent
    // },
   
});

module.exports = mongoose.model('booking', bookingSchema);
