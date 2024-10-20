import { SiteList } from "./components/SiteList";
import { useClient } from "./DashboardLayout";

export const Dashboard = () => {
  const { client } = useClient();

  return <SiteList client={client} />;
};
