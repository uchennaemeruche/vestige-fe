export interface IService {
  id: string;
  name: string;
  description: string;
  is_active: boolean;
  status: string;
  webhook_url: string;
  notification_email: string;
}
