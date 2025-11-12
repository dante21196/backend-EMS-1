import { Request, Response } from 'express';
import { RoleService } from '../models/Roles/service';
import { PermissionService } from '../models/Permissions/service';
import { successResponse, errorResponse } from '../config/response';



const getRoles = async (req: Request, res: Response) => {
  try {
    const role = await RoleService.findAll();
    if (!role) return errorResponse(res, 'RoleS not found', 404);
    return successResponse(res, 'Role fetched', role);
  } catch (err) {
    return errorResponse(res, 'Failed to fetch role', 500, err instanceof Error ? err.message : err);
  }
};
// POST /roles - create new role
const createRole = async (req: Request, res: Response) => {
  try {
    const role = await RoleService.create(req.body);
    return successResponse(res, 'Role created', role, 201);
  } catch (err) {
    return errorResponse(res, 'Failed to create role', 500, err instanceof Error ? err.message : err);
  }
};

// GET /roles/:roleId - get role by id
const getRoleById = async (req: Request, res: Response) => {
  try {
    const role = await RoleService.findById(req.params.roleId);
    if (!role) return errorResponse(res, 'Role not found', 404);
    return successResponse(res, 'Role fetched', role);
  } catch (err) {
    return errorResponse(res, 'Failed to fetch role', 500, err instanceof Error ? err.message : err);
  }
};




// PUT /roles/:roleId - update role
const updateRole = async (req: Request, res: Response) => {
  try {
    const updatedRole = await RoleService.updateById(req.params.roleId, req.body);
    if (!updatedRole) return errorResponse(res, 'Role not found', 404);
    return successResponse(res, 'Role updated', updatedRole);
  } catch (err) {
    return errorResponse(res, 'Failed to update role', 500, err instanceof Error ? err.message : err);
  }
};

// DELETE /roles/:roleId - delete role
const deleteRole = async (req: Request, res: Response) => {
  try {
    const deleted = await RoleService.deleteById(req.params.roleId);
    if (!deleted) return errorResponse(res, 'Role not found', 404);
    return successResponse(res, 'Role deleted', null);
  } catch (err) {
    return errorResponse(res, 'Failed to delete role', 500, err instanceof Error ? err.message : err);
  }
};

// POST /permissions - create new permission
const createPermission = async (req: Request, res: Response) => {
  try {
    const permission = await PermissionService.create(req.body);
    return successResponse(res, 'Permission created', permission, 201);
  } catch (err) {
    return errorResponse(res, 'Failed to create permission', 500, err instanceof Error ? err.message : err);
  }
};

// GET /permissions/:permissionId - get permission by id
const getPermissionById = async (req: Request, res: Response) => {
  try {
    const permission = await PermissionService.findById(req.params.permissionId);
    if (!permission) return errorResponse(res, 'Permission not found', 404);
    return successResponse(res, 'Permission fetched', permission);
  } catch (err) {
    return errorResponse(res, 'Failed to fetch permission', 500, err instanceof Error ? err.message : err);
  }
};

// PUT /permissions/:permissionId - update permission
const updatePermission = async (req: Request, res: Response) => {
  try {
    const updatedPermission = await PermissionService.updateById(req.params.permissionId, req.body);
    if (!updatedPermission) return errorResponse(res, 'Permission not found', 404);
    return successResponse(res, 'Permission updated', updatedPermission);
  } catch (err) {
    return errorResponse(res, 'Failed to update permission', 500, err instanceof Error ? err.message : err);
  }
};

// DELETE /permissions/:permissionId - delete permission
const deletePermission = async (req: Request, res: Response) => {
  try {
    const deleted = await PermissionService.deleteById(req.params.permissionId);
    if (!deleted) return errorResponse(res, 'Permission not found', 404);
    return successResponse(res, 'Permission deleted', null);
  } catch (err) {
    return errorResponse(res, 'Failed to delete permission', 500, err instanceof Error ? err.message : err);
  }
};

export {
  createRole,
  getRoleById,
  updateRole,
  deleteRole,
  createPermission,
  getPermissionById,
  updatePermission,
  deletePermission,
  getRoles
};
