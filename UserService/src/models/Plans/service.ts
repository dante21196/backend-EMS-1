import SubscriptionPlanModel from './schema'; // Adapt path as needed
import { ISubscriptionPlan } from './interface';

class SubscriptionPlanService {
  // Create new subscription plan
  async create(plan: ISubscriptionPlan) {
    const newPlan = new SubscriptionPlanModel(plan);
    return await newPlan.save();
  }

  // Get subscription plan by id
  async findById(id: string) {
    return await SubscriptionPlanModel.findById(id).exec();
  }

  // Update subscription plan by id
  async update(id: string, updateData: Partial<ISubscriptionPlan>) {
    return await SubscriptionPlanModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  // Delete subscription plan by id
  async delete(id: string) {
    return await SubscriptionPlanModel.findByIdAndDelete(id).exec();
  }

  // List all subscription plans (optional)
  async list() {
    return await SubscriptionPlanModel.find().exec();
  }
}

export default new SubscriptionPlanService();
