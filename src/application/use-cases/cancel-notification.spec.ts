import { NotificationFactory } from '~/factories/notification-factory';
import { InMemoryNotificationsRepository } from '~/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from '../errors/notification-not-found';
import { CancelNotification } from './cancel-notification';

describe('Cancel notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    const notification = NotificationFactory.build();

    await notificationsRepository.create(notification);
    await notificationsRepository.create(NotificationFactory.build());
    await notificationsRepository.create(NotificationFactory.build());

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications).toHaveLength(3);
    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
    expect(notificationsRepository.notifications[1].canceledAt).toBeNull();
  });

  it('should not be able to cancel a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    expect(
      cancelNotification.execute({
        notificationId: 'fake-notification-id',
      }),
    ).rejects.toThrow(NotificationNotFound);
  });
});
