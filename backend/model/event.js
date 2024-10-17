const mongoose=require("mongoose")
const {Schema}=mongoose

const EventSchema=new Schema({
    image:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUH0K3epJ4UcqTqVnhL_apqHEcEA4SsHGGNQ&s"
    },
    title:{
      type:String,
      required:true
  },
    description:{
        type:String,
        require:true,
    },
    organizerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    date: { 
        type: Date, 
        required: true 
      },
      location: {
        address: { 
          type: String, 
          required: true 
        },
        city: { 
          type: String, 
          required: true 
        },
        state: { 
          type: String, 
          required: true 
        }
      },
      category: { 
        type: String, 
        required: true 
      }, // e.g., 'Concert', 'Conference', 'Workshop'
      price: { 
        type: Number, 
        required: true 
      }, // Price of the event
      availableTicket: { 
        type: Number, 
        required: true 
      }, // Number of tickets available for booking
      totalTicket: { 
        type: Number, 
        required: true 
      }, // Total number of tickets for the event
      createdAt: { 
        type: Date, 
        default: Date.now 
      } // Timestamp when the event is created
    });

module.exports=mongoose.model('event',EventSchema);