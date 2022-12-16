import { Notification as PrismaNotification } from '@prisma/client';
import { Content } from '~/application/entities/content';
import { Notification } from '~/application/entities/notification';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification): PrismaNotification {
    return {
      id: notification.id,
      content: notification.content.value,
      category: notification.category,
      recipientId: notification.recipientId,
      createdAt: notification.createdAt,
      readAt: notification.readAt,
      canceledAt: notification.canceledAt,
    };
  }

  static toDomain(prismaNotification: PrismaNotification): Notification {
    return new Notification(
      {
        category: prismaNotification.category,
        content: new Content(prismaNotification.content),
        recipientId: prismaNotification.recipientId,
        canceledAt: prismaNotification.canceledAt,
        readAt: prismaNotification.readAt,
        createdAt: prismaNotification.createdAt,
      },
      prismaNotification.id,
    );
  }
}
