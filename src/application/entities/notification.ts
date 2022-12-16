import { randomUUID } from 'node:crypto';
import { Replace } from '~/helpers/Replace';
import { Content } from './content';

export interface NotificationProps {
  recipientId: string;
  content: Content;
  category: string;
  readAt: Date | null;
  canceledAt: Date | null;
  createdAt: Date;
}

type NotificationPropsConstructor = Replace<
  NotificationProps,
  {
    readAt?: Date | null;
    canceledAt?: Date | null;
    createdAt?: Date;
  }
>;

export class Notification {
  private _id: string;
  private props: NotificationProps;

  constructor(props: NotificationPropsConstructor, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      readAt: props.readAt ?? null,
      canceledAt: props.canceledAt ?? null,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public get recipientId(): string {
    return this.props.recipientId;
  }

  public set recipientId(value: string) {
    this.props.recipientId = value;
  }

  public get content(): Content {
    return this.props.content;
  }

  public set content(value: Content) {
    this.props.content = value;
  }

  public get category(): string {
    return this.props.category;
  }

  public set category(value: string) {
    this.props.category = value;
  }

  public get readAt(): Date | null {
    return this.props.readAt;
  }

  public read() {
    this.props.readAt = new Date();
  }

  public unread() {
    this.props.readAt = null;
  }

  public get canceledAt(): Date | null {
    return this.props.canceledAt;
  }

  public cancel() {
    this.props.canceledAt = new Date();
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
