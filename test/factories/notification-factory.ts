import { randomUUID } from 'crypto';
import { Content } from '~/application/entities/content';
import {
  Notification,
  NotificationProps,
} from '~/application/entities/notification';

export class NotificationFactory {
  static build(overrides: Partial<NotificationProps> = {}) {
    return new Notification({
      content: new Content('notification content'),
      category: 'category',
      recipientId: randomUUID(),
      ...overrides,
    });
  }
}
