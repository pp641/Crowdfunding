const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'auth-app',
  brokers: ['localhost:9092'],  
});

const consumer = kafka.consumer({ groupId: 'auth-app' });

const runConsumer = async () => {
  await consumer.connect();
  console.log('Consumer connected');

  await consumer.subscribe({ topic: 'auth-app', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        topic,
        partition,
        offset: message.offset,
        value: message.value.toString(),  
      });
    },
  });
};

runConsumer().catch(console.error);
