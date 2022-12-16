import { randomUUID } from 'node:crypto';
import { NotificationFactory } from '~/factories/notification-factory';
import { InMemoryNotificationsRepository } from '~/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('Count recipient notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    const recipientId = randomUUID();

    const notification = NotificationFactory.build({ recipientId });

    await notificationsRepository.create(notification);
    await notificationsRepository.create(notification);
    await notificationsRepository.create(notification);
    await notificationsRepository.create(NotificationFactory.build());
    await notificationsRepository.create(NotificationFactory.build());

    const { count } = await countRecipientNotifications.execute({
      recipientId,
    });

    expect(count).toBe(3);
  });
});
