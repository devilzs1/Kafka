const { Kafka, logLevel } = require("kafkajs");
// const ip = require("ip");

// const host = process.env.HOST_IP || ip.address();
const host = process.env.HOST_IP;

exports.kafka = new Kafka({
//   logLevel: logLevel.DEBUG,
  clientId: "learn-kafka",
  brokers: [`${host}:9092`],
});
