import express from 'express';
import {
  createRole,
  getRoleById,
  updateRole,
  deleteRole,
  createPermission,
  getPermissionById,
  updatePermission,
  deletePermission,
} from '../controllers/roleAndPermissionsController';
import { authMiddleware } from '../middlewares/auth';

const router = express.Router();

// Role routes
router.post('/roles', authMiddleware, createRole);
router.get('/roles/:roleId', authMiddleware, getRoleById);
router.put('/roles/:roleId', authMiddleware, updateRole);
router.delete('/roles/:roleId', authMiddleware, deleteRole);

// Permission routes
router.post('/permissions', authMiddleware, createPermission);
router.get('/permissions/:permissionId', authMiddleware, getPermissionById);
router.put('/permissions/:permissionId', authMiddleware, updatePermission);
router.delete('/permissions/:permissionId', authMiddleware, deletePermission);

export default router;
