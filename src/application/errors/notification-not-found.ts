import { HttpException, HttpStatus } from '@nestjs/common';

export class NotificationNotFound extends HttpException {
  constructor() {
    super('Notification not found.', HttpStatus.BAD_REQUEST);
  }
}
