const {kafka} = require("./client");

async function init() {
  const admin = kafka.admin();

  console.log("Admin connecting.....");
  await admin.connect();
  console.log("Admin Connection Successful.");

  console.log("Creating Topic [internship-update]");
  await admin.createTopics({
    topics: [
      {
        topic: "internship-update",
        numPartitions: 2,
      },
    ],
  });

  console.log("Topic [internship-update] Created Successfully.");

//   console.log("Listing All topics");
//   const topics = await admin.listTopics();
//   console.log(topics);

  console.log("Disconnecting Admin...")
  await admin.disconnect();
}

init();