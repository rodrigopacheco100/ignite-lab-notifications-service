import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor() {
    const { UPSTASH_KAFKA_USERNAME, UPSTASH_KAFKA_PASSWORD } = process.env;

    if (!UPSTASH_KAFKA_USERNAME || !UPSTASH_KAFKA_PASSWORD) {
      throw new Error(
        'UPSTASH_KAFKA_USERNAME and UPSTASH_KAFKA_PASSWORD not defined',
      );
    }

    super({
      client: {
        clientId: 'notifications-consumer',
        brokers: ['legible-sunfish-6086-us1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',
          username: UPSTASH_KAFKA_USERNAME,
          password: UPSTASH_KAFKA_PASSWORD,
        },
        ssl: true,
      },
    });
  }

  async onModuleDestroy() {
    await this.close();
  }
}
