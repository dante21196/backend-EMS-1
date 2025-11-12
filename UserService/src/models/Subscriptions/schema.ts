import mongoose, { Schema } from 'mongoose';

const SubscriptionSchema = new Schema({
  company_id: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
  plan_id: { type: Schema.Types.ObjectId, ref: 'Plan', required: true },
  start_date: { type: Date, required: true, default: Date.now },
  end_date: { type: Date, default: null }, // null if subscription is active
  is_ended: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

SubscriptionSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model('Subscription', SubscriptionSchema);
