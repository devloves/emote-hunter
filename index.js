const Discord = require('discord.js');
const configs = require('./config.json');
const commandHandler = require('./command.js');
const express = require("express");
const url = require("url");
const path = require("path");
const client = new Discord.Client();

const ejs = require("ejs"); 

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity("Hunting Down Emojies");
    commandHandler.init();
    const app = express(); 
    app.listen(8000, null, null, () => console.log("The web server is up and running!"));
    app.get ("/", function (req,res) {
        res.render( "index.ejs", Object.assign({ bot: client }));	
    });
});

client.on("message", async message => {

    if (message.author.bot) return;

    const args = message.content.slice(configs.prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    
    commandHandler.exec(client, args, command, message) 
});

client.login(configs.token)
