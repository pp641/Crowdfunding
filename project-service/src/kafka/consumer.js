const dotenv = require('dotenv');
dotenv.config();    
const { Kafka } = require('kafkajs');
const jwt = require('jsonwebtoken'); 

console.log('JWT_SECRET:', process.env.JWT_SECRET); // Debug log


const kafka = new Kafka({
  clientId: 'project-service',
  brokers: ['localhost:9092'] 
});

const consumer = kafka.consumer({ groupId: 'project-service-group' });

const runConsumer = async () => {
    try{
  await consumer.connect();
  console.log('Consumer connected');

  await consumer.subscribe({ topic: 'auth-app', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const tokenData = JSON.parse(message.value.toString()); 
      const token = tokenData.data;
      console.log("provided" , token , 'pp_is_here')
      const decoded = jwt.verify(token, 'pp_is_here');
      console.log("decoded", decoded)
      console.log(`Received token from Kafka: ${token}`);
    },
  });
    } catch(error){
        console.log("Error", error);
    }
};

runConsumer().catch(console.error);

module.exports = { runConsumer };
