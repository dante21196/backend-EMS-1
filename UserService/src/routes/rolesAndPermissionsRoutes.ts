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
  getRoles
} from '../controllers/roleAndPermissionsController';
import { authMiddleware } from '../middlewares/auth';

const router = express.Router();

// Role routes
router.get('/roles', authMiddleware, getRoles);

router.post('/roles', authMiddleware, createRole);
router.get('/roles/:roleId', authMiddleware, getRoleById);
router.post('/roles/:roleId', authMiddleware, updateRole);
router.get('/roles/delete/:roleId', authMiddleware, deleteRole);

// Permission routes
router.post('/permissions', authMiddleware, createPermission);
router.get('/permissions/:permissionId', authMiddleware, getPermissionById);
router.post('/permissions/:permissionId', authMiddleware, updatePermission);
router.get('/permissions/delete/:permissionId', authMiddleware, deletePermission);

export default router;
