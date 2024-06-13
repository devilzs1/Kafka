const {kafka} = require("./client")

const group  = process.argv[2];

async function init(){
    const consumer = kafka.consumer({groupId: group});

    console.log("Connecting Consumer....");
    await consumer.connect();

    await consumer.subscribe({topics: ['internship-update'], fromBeginning: true});

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
        console.log(`${group} - ${prefix} ${message.key}#${message.value}`);
      },
    });

    // console.log("Disconnecting consumer...");
    // await consumer.disconnect();
}

init();