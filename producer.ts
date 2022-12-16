import 'dotenv/config';
import { randomUUID } from 'crypto';
import { Kafka } from 'kafkajs';

(async () => {
  const { UPSTASH_KAFKA_USERNAME, UPSTASH_KAFKA_PASSWORD } = process.env;

  if (!UPSTASH_KAFKA_USERNAME || !UPSTASH_KAFKA_PASSWORD) {
    throw new Error(
      'UPSTASH_KAFKA_USERNAME and UPSTASH_KAFKA_PASSWORD not defined',
    );
  }

  const kafka = new Kafka({
    clientId: 'any-producer',
    brokers: ['legible-sunfish-6086-us1-kafka.upstash.io:9092'],
    sasl: {
      mechanism: 'scram-sha-256',
      username: UPSTASH_KAFKA_USERNAME,
      password: UPSTASH_KAFKA_PASSWORD,
    },
    ssl: true,
  });

  const producer = kafka.producer();
  await producer.connect();

  await producer.send({
    topic: 'notifications.send-notification',
    messages: [
      {
        value: JSON.stringify({
          content: 'Salve do Kafka producer',
          category: 'social',
          recipientId: randomUUID(),
        }),
      },
    ],
  });

  await producer.disconnect();
})();
