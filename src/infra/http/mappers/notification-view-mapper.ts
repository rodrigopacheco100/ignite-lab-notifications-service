import { Notification } from '~/application/entities/notification';
import { NotificationView } from '../views/notification';

export class NotificationViewMapper {
  static toHTTP(notification: Notification): NotificationView {
    return {
      id: notification.id,
      category: notification.category,
      content: notification.content.value,
      recipientId: notification.recipientId,
      readAt: notification.readAt,
      canceledAt: notification.canceledAt,
      createdAt: notification.createdAt,
    };
  }
}
