import { AuditManagement } from "@descope/react-sdk";

export const AuditTrailState = () => {
  return (
    <div>
      <AuditManagement
        widgetId="audit-management-widget"
        tenant={import.meta.env.VITE_DESCOPE_TENANT_ID}
      />
    </div>
  );
};
