import { Request, Response } from 'express';
import SubscriptionService from '../models/Subscriptions/service';
import { successResponse, errorResponse } from '../config/response';

// POST /subscriptions - create new subscription
const createSubscription = async (req: Request, res: Response) => {
  try {
    const subscription = await SubscriptionService.create(req.body);
    return successResponse(res, 'Subscription created', subscription, 201);
  } catch (err) {
    return errorResponse(res, 'Failed to create subscription', 500, err instanceof Error ? err.message : err);
  }
};

// GET /subscriptions/:id - get subscription by id
const getSubscriptionById = async (req: Request, res: Response) => {
  try {
    const subscription = await SubscriptionService.findById(req.params.id);
    if (!subscription) return errorResponse(res, 'Subscription not found', 404);
    return successResponse(res, 'Subscription fetched', subscription);
  } catch (err) {
    return errorResponse(res, 'Failed to fetch subscription', 500, err instanceof Error ? err.message : err);
  }
};

// PUT /subscriptions/:id - update subscription
const updateSubscription = async (req: Request, res: Response) => {
  try {
    const updated = await SubscriptionService.update(req.params.id, req.body);
    if (!updated) return errorResponse(res, 'Subscription not found', 404);
    return successResponse(res, 'Subscription updated', updated);
  } catch (err) {
    return errorResponse(res, 'Failed to update subscription', 500, err instanceof Error ? err.message : err);
  }
};

// DELETE /subscriptions/:id - delete subscription
const deleteSubscription = async (req: Request, res: Response) => {
  try {
    const deleted = await SubscriptionService.delete(req.params.id);
    if (!deleted) return errorResponse(res, 'Subscription not found', 404);
    return successResponse(res, 'Subscription deleted', null);
  } catch (err) {
    return errorResponse(res, 'Failed to delete subscription', 500, err instanceof Error ? err.message : err);
  }
};

// GET /subscriptions - list subscriptions, optionally filtered by query params like company_id, plan_id
const listSubscriptions = async (req: Request, res: Response) => {
  try {
    const filter = req.query || {};
    const subscriptions = await SubscriptionService.list(filter);
    return successResponse(res, 'Subscriptions fetched', subscriptions);
  } catch (err) {
    return errorResponse(res, 'Failed to fetch subscriptions', 500, err instanceof Error ? err.message : err);
  }
};

export {
  createSubscription,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
  listSubscriptions,
};
