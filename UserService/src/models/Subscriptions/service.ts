import SubscriptionModel from './schema'; // Adjust path as needed
import { ISubscription } from './interface';

class SubscriptionService {
  // Create new subscription
  async create(subscription: ISubscription) {
    const newSubscription = new SubscriptionModel(subscription);
    return await newSubscription.save();
  }

  // Get subscription by id
  async findById(id: string) {
    return await SubscriptionModel.findById(id).exec();
  }

  // Update subscription by id
  async update(id: string, updateData: Partial<ISubscription>) {
    return await SubscriptionModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  // Delete subscription by id
  async delete(id: string) {
    return await SubscriptionModel.findByIdAndDelete(id).exec();
  }

  // List all subscriptions optionally filtered by company or plan
  async list(filter: Partial<ISubscription> = {}) {
    return await SubscriptionModel.find(filter).exec();
  }
}

export default new SubscriptionService();
