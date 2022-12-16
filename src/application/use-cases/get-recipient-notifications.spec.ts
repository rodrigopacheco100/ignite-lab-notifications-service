import { randomUUID } from 'node:crypto';
import { NotificationFactory } from '~/factories/notification-factory';
import { InMemoryNotificationsRepository } from '~/repositories/in-memory-notifications-repository';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Get recipient notifications', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientNotifications = new GetRecipientNotifications(
      notificationsRepository,
    );

    const recipientId = randomUUID();

    const notification = NotificationFactory.build({ recipientId });

    await notificationsRepository.create(notification);
    await notificationsRepository.create(notification);
    await notificationsRepository.create(notification);
    await notificationsRepository.create(NotificationFactory.build());
    await notificationsRepository.create(NotificationFactory.build());

    const { notifications } = await getRecipientNotifications.execute({
      recipientId,
    });

    expect(notifications.length).toBe(3);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId }),
        expect.objectContaining({ recipientId }),
      ]),
    );
  });
});
