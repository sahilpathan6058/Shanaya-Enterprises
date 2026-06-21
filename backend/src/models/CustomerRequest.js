import mongoose from 'mongoose'

const customerRequestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    service: { type: String, required: true, trim: true },
    message: { type: String, default: '', trim: true },
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'resolved', 'cancelled'],
      default: 'pending',
    },
    adminNotes: { type: String, default: '', trim: true },
  },
  { timestamps: true },
)

export default mongoose.model('CustomerRequest', customerRequestSchema)
