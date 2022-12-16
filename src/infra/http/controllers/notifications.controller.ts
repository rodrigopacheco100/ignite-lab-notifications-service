import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CancelNotification } from '~/application/use-cases/cancel-notification';
import { CountRecipientNotifications } from '~/application/use-cases/count-recipient-notifications';
import { GetRecipientNotifications } from '~/application/use-cases/get-recipient-notifications';
import { ReadNotification } from '~/application/use-cases/read-notification';
import { SendNotification } from '~/application/use-cases/send-notification';
import { UnreadNotification } from '~/application/use-cases/unread-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewMapper } from '../mappers/notification-view-mapper';
import { NotificationView } from '../views/notification';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private getRecipientNotifications: GetRecipientNotifications,
    private countRecipientNotifications: CountRecipientNotifications,
  ) {}

  @Post()
  async create(
    @Body() body: CreateNotificationBody,
  ): Promise<{ notification: NotificationView }> {
    const { content, category, recipientId } = body;

    const { notification } = await this.sendNotification.execute({
      content,
      category,
      recipientId,
    });

    return { notification: NotificationViewMapper.toHTTP(notification) };
  }

  @Get('recipient/:recipientId')
  async getByRecipientId(
    @Param('recipientId') recipientId: string,
  ): Promise<{ notifications: NotificationView[] }> {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
    });

    return { notifications: notifications.map(NotificationViewMapper.toHTTP) };
  }

  @Get('recipient/:recipientId/count')
  async countByRecipientId(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId,
    });

    return { count };
  }

  @Patch(':id/cancel')
  async cancel(@Param('id') notificationId: string) {
    await this.cancelNotification.execute({ notificationId });
  }

  @Patch(':id/read')
  async read(@Param('id') notificationId: string) {
    await this.readNotification.execute({ notificationId });
  }

  @Patch(':id/unread')
  async unread(@Param('id') notificationId: string) {
    await this.unreadNotification.execute({ notificationId });
  }
}
