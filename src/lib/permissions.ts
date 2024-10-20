import { UserResponse } from "@descope/core-js-sdk";

export const isSuperAdmin = (tenants: UserResponse["userTenants"]) => {
  if (!tenants || tenants.length == 0) return false;

  const userTenants = tenants?.filter(
    (tenant) =>
      tenant.tenantName === import.meta.env.VITE_DESCOPE_ADMIN_TENANT_NAME
  );

  const isSuperAdmin = userTenants && userTenants.length >= 1;
  return isSuperAdmin;
};
