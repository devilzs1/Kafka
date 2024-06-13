const {kafka} = require("./client");
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

async function init(){
    const producer = kafka.producer();

    console.log("Connecting Producer....");
    await producer.connect();
    console.log("Producer Connected Successfully");

    rl.setPrompt('> ');
    rl.prompt();

    rl.on('line', async function(line){

        const [role, location] = line.split(' ');

        console.log("Producer sending messsage in [internship-update]");
        await producer.send({
          topic: "internship-update",
          messages: [
            {
              partition: location.toLowerCase() === 'varanasi' ? 0 : 1,
            //   partition: 0,
              key: "update",
              value: JSON.stringify({ role: role, loc: location }),
            },
          ],
        });
        console.log("Message sent successfully");
    }).on('close', async ()=>{
        console.log("Disconnecting Producer...")
        await producer.disconnect();
    })
}

init();