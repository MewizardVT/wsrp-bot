const Discord = require("discord.js")
const config = require("./info.json")
const bot = new Discord.Client()
const fivem = require("fivereborn-query")
const fs = require("fs")
const reborn = require("fivem")
const server = new reborn.Server('80.208.231.231:30120')
bot.on("ready", async () => {
    console.log("a")
   
})

function activity(){ // Defines the function
    setTimeout(() => { // Starts a loop
        fivem.query(config.server_ip,config.server_port, (err, data) => { // Starts a function that allowes us to retrive data from our fivem server
            if (err) { // Checks for errors
                return console.log(err); // If a error is true then this will log that error and then stop it from going by
            } else { // If a error is not true then 
                bot.user.setActivity(`${data.clients} players on ${config.server_name}`, { type: "WATCHING" }); // Serts the Status
            }
        });
        activity(); // Runs the function we defined at line 15
    }, 1000); // Waits 1 second
}
activity(); // Runs the function again

bot.on("message", async message => {
    let prefix = config.prefix;
    let messageArray = message.content.split(" ")
    let cmd = messageArray[0]
    let args = messageArray.slice(1)

    if(message.content === "f8"){
        message.channel.send("connect 80.208.231.231:30120")
    }
 if(cmd === `${prefix}playercount`){
    fivem.query(config.server_ip,config.server_port, (err, data) => {
      message.channel.send(`There are currently ${data.clients} people on Wood State Roleplay!`)
    })
 }

 if(cmd === `${prefix}status`){
    let desc = fs.readFileSync("desc.txt", 'utf8')
    let embed = new Discord.MessageEmbed()
    fivem.query(config.server_ip,config.server_port, (err, data) => {
        embed.setTitle("WSRP Server Status")
        embed.setDescription(desc)
       embed.addField("Current Member Count", `There are currently ${data.clients} people on the main server at this time.`)
       embed.addField("Current AOP [Area of Patrol]", data.mapname)
       embed.setFooter("Copyright WSRP 2021 | All Rights Reserved; Programmed by Mewizard#0022")
       message.channel.send(embed)
    })
 }

 if(cmd === `${prefix}test1`){
     let count = server.getPlayersAll().then(data => console.log(data))
     message.channel.send(count)
 }
 
}) // end of file do not go past this



bot.login(config.token);
