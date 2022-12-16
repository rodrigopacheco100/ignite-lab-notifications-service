export class NotificationView {
  id: string;
  recipientId: string;
  content: string;
  category: string;
  readAt: Date | null;
  canceledAt: Date | null;
  createdAt: Date;
}
