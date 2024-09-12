const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'auth-app',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();

const runProducer = async (message) => {
  await producer.connect();
  console.log('Producer connected');

  await producer.send({
    topic: 'auth-app',
    messages: [{value : JSON.stringify({data : message})}],
  });

  console.log('Message sent');
  await producer.disconnect();
};

module.exports = {runProducer};