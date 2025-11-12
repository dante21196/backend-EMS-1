import express from 'express';
import {
  createSubscription,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
  listSubscriptions,
} from '../controllers/subscriptionController';
import { authMiddleware } from '../middlewares/auth';

const router = express.Router();

router.post('/', authMiddleware, createSubscription);
router.get('/:id', authMiddleware, getSubscriptionById);
router.post('/:id', authMiddleware, updateSubscription);
router.get('/delete/:id', authMiddleware, deleteSubscription);
router.get('/', authMiddleware, listSubscriptions);

export default router;
