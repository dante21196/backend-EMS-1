import PermissionSchema  from "./schema"
import { IPermission } from "./interface"

export const PermissionService = {
  create: async (data: Partial<IPermission>) => await PermissionSchema.create(data),
  findById: async (id: string) => await PermissionSchema.findById(id),
  findAll: async () => await PermissionSchema.find(),
  updateById: async (id: string, update: Partial<IPermission>) =>
    await PermissionSchema.findByIdAndUpdate(id, update, { new: true }),
  deleteById: async (id: string) => await PermissionSchema.findByIdAndDelete(id),
}
