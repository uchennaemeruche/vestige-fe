import { UserManagement } from "@descope/react-sdk";

export const UserList = () => {
  return (
    <div>
      <UserManagement
        widgetId="user-management-widget"
        tenant={import.meta.env.VITE_DESCOPE_TENANT_ID}
      />
    </div>
  );
};
