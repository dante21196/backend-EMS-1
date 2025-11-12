export interface ISubscription {
  _id?: string;
  company_id: string; // ObjectId string referencing Company
  plan_id: string; // ObjectId string referencing SubscriptionPlan
  start_date: Date;
  end_date?: Date | null;
  is_ended: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
