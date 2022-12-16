import { NotificationFactory } from '~/factories/notification-factory';
import { InMemoryNotificationsRepository } from '~/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from '../errors/notification-not-found';
import { ReadNotification } from './read-notification';

describe('Read notification', () => {
  it('should be able to read a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    const notification = NotificationFactory.build();

    await notificationsRepository.create(notification);
    await notificationsRepository.create(NotificationFactory.build());

    await readNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications).toHaveLength(2);
    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
    expect(notificationsRepository.notifications[1].readAt).toBeNull();
  });

  it('should not be able to read a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    expect(
      readNotification.execute({
        notificationId: 'fake-notification-id',
      }),
    ).rejects.toThrow(NotificationNotFound);
  });
});
