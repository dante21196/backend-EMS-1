export interface IQuota {
  user_quota: number;
  project_quota: number;
  team_quota: number;
}

export interface ISubscriptionPlan {
  _id?: string;
  name: string;
  description?: string;
  price: number;
  billingCycle: 'monthly' | 'yearly';
  quotas: IQuota;
  features?: string[];
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

