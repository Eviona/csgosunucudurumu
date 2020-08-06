const Discord = require('discord.js');
const client = new Discord.Client();
const { query } = require('gamedig');
const config = require("./config.js")

client.on('ready', () => {
  console.log(`Bot hesabına girildi ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('siktir git la');
  }
});

if(config.color === "random") {
  config.color = Math.floor(Math.random()*16777215).toString(16);
}



let editor = async () => {
  console.clear()
    console.log("===Güncelleniyor===")

    const servers = config.servers

    const embed = new Discord.MessageEmbed()
    .setTimestamp()
    .setAuthor("Sunucu Durumu", "https://cdn.discordapp.com/avatars/673574545373921301/e76e4b4f23ee13cd5c4d47a7387a6a87.png?size=256")
	.setFooter("SonJeton Durum Bot, Developed by Eviona", "https://cdn.discordapp.com/avatars/597065846950723617/325ff1def203afd980ecb208f111d158.png?size=256")
    .setColor(config.color)

    for (var server of servers) {
        let name = server.name
        let ip = server.ip
        let port = server.port
        
        const serverData = await query({
          type: 'csgo',
          host: ip,
          port: port,     
          socketTimeout: 5000,
          udpTimeout: 10000
        }).catch(() => null);
        if (!serverData) {
          embed.addField(`${name}`, `**Sunucu Kapalı** \n **IP Adresi:** ${ip}:${port}`, config.true)
          console.log(`${name} Güncellenemedi!`)
        } else {
          embed.addField(`${name}`, `**Oyuncular:** ${serverData.players.length}/${serverData.maxplayers} \n **Harita:** ${serverData.map} \n **Tıkla Bağlan:** steam://connect/${serverData.connect}`, config.true)
            console.log(`${name} Güncellendi!`)
        }

        }
        const channel = client.channels.cache.get(config.channelid);
        const msg = await channel.messages.fetch(config.id);
        msg.edit(embed)
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

client.on("message", async (message) => {
    if(message.content.startsWith('evionagururlasunar')) {
        message.delete()
    
    let config = require("./config.js")

    const servers = config.servers

    const embed = new Discord.MessageEmbed()
    .setTimestamp()
    .setAuthor("Sunucu Durumu", "https://cdn.discordapp.com/avatars/673574545373921301/e76e4b4f23ee13cd5c4d47a7387a6a87.png?size=256")
	.setFooter("SonJeton Durum Bot, Developed by Eviona", "https://cdn.discordapp.com/avatars/597065846950723617/325ff1def203afd980ecb208f111d158.png?size=256")
    .setColor(config.color)
    
    for (var server of servers) {
        let name = server.name
        let ip = server.ip
        let port = server.port
        
        

        const serverData = await query({
          type: 'csgo',
          host: ip,
          port: port,     
          socketTimeout: 5000,
          udpTimeout: 10000
        }).catch(() => null);
        if (!serverData) {
          embed.addField(`${name}`, `**Sunucu Kapalı** \n **IP Adresi:** ${ip}:${port}`, config.true)
          console.log(`${name} Güncellenemedi!`)
        } else {
          embed.addField(`${name}`, `**Oyuncular:** ${serverData.players.length}/${serverData.maxplayers} \n **Harita:** ${serverData.map} \n **Tıkla Bağlan:** steam://connect/${serverData.connect}`, config.true)
            console.log(`${name} Güncellendi!`)
        }

        }

        message.channel.send(embed).then(msg => {
         console.clear()
          console.log("Mesaj-ID:", msg.id)
          console.log("Kanal-ID:", msg.channel.id)
        })
    }

if(message.content.startsWith("guncelle")) {
  message.delete()
  editor()
}

})

let interval;

client.on("ready", async (client) => {
    interval = setInterval(editor, 120000)
})

client.login(config.token);
