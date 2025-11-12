import mongoose, { Schema } from 'mongoose';

const SubscriptionPlanSchema = new Schema({
  name: { type: String, required: true, unique: true }, // Plan name like Basic, Pro, Enterprise
  description: { type: String, default: '' }, // Optional human-readable description
  price: { type: Number, required: true }, // Price per billing period in cents or smallest currency unit
  billingCycle: { type: String, enum: ['monthly', 'yearly'], required: true }, // Billing frequency
  quotas: {
    user_quota: { type: Number, default: 1 },
    project_quota: { type: Number, default: 5 },
    team_quota: { type: Number, default: 3 },
  },
  features: { type: [String], default: [] }, // Array of feature flags or descriptions included in plan
  isActive: { type: Boolean, default: true }, // Whether this plan is currently available for subscription
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

SubscriptionPlanSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model('SubscriptionPlan', SubscriptionPlanSchema);

