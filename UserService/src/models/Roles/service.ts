import  RoleSchema  from "./schema"
import { IRole } from "./interface"

export const RoleService = {
  create: async (data: Partial<IRole>) => await RoleSchema.create(data),
  findById: async (id: string) => await RoleSchema.findById(id),
  findAll: async () => await RoleSchema.find(),
  updateById: async (id: string, update: Partial<IRole>) =>
    await RoleSchema.findByIdAndUpdate(id, update, { new: true }),
  deleteById: async (id: string) => await RoleSchema.findByIdAndDelete(id),
}
