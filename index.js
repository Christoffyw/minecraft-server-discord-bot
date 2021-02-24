const {Client, RichEmbed} = require('discord.js');
const Discord = require('discord.js');
const fetch = require('node-fetch');
const bot = new Client();


const url = 'https://mcapi.xdefcon.com/server/192.99.232.92:25600/full/json';
const url2 = 'https://api.minetools.eu/ping/192.99.232.92/25600';


//Bot login
bot.login("NzI0NzU0MDUyMzY1MTU2NTIz.XwR_iw.E2ego8UtksNPSPXdA2ehA47iXmI");


//Sets prefix
const PREFIX = "rl.";

//Logs bot logged
bot.on('ready', () => {
	console.log('This bot is online!');
	bot.setInterval(update, 5000);
});

bot.on('message', message => {
	let args = message.content.slice(PREFIX.length).split(" ");
	if(message.content == "embedmedaddy") {
		message.delete();
		const embed = {
			"title": "Christoffyw's Car Goal",
			"description": "᲼᲼᲼᲼᲼᲼",
			"color": 3434234,
			"image": {
			  "url": "https://media.discordapp.net/attachments/640229249533476884/803489213723050024/unknown.png"
			},
			"fields": [
			  {
				"name": "Items:",
				"value": "- Sky Blue Octane \n- Sky Blue Esoto 4R Inverted\n- Stipple Gait"
			  },
			  {
				"name": "Prices:",
				"value": "~ 2200 CR\n~ 60 CR\n~ 1700 CR"
			  },
			  {
				"name": "Total: ~3960 CR",
				"value": "᲼᲼᲼᲼᲼᲼"
			  }
			]
		  };
		  message.channel.send({ embed });
	}
	if(message.content.startsWith("!who")) {
		if(message.channel.id == "720277340231565422") {
			return message.delete();
		}
		fetch(url2)
			.then(res => res.json())
			.then((out) => {
				var strUsers = "";
				if(out.error == '[Errno 111] Connection refused')
					return strUsers = "The server is currently offline.";
				else {
					var users = out.players.sample;
					if(users.length == 0) {
						strUsers = "Nobody is online. Maybe you should join.";
					}

					for(var i = 0; i < users.length; i++) {
						var str = users[i].name + "\n";
						strUsers += str;
					}
					console.log(strUsers);
				}
				const embed = {
				  "color": 2293516,
				  "thumbnail": {
					"url": "https://cdn.discordapp.com/avatars/724754052365156523/f3c2d24740e92192bc2f795e32a19fcd.png"
				  },
				  "fields": [
					{
					  "name": "Players Online:",
					  "value": `${strUsers}`
					}
				  ]
				};
				console.log(embed);
				message.channel.send({ embed });
		})
	}
})

function update() {
	fetch(url)
		.then(res => res.json())
		.then((out) => {
				if(out.serverStatus == 'offline')
					bot.user.setActivity("Server offline.");
				else {
					console.log(`MC Server: ${out.players}/${out.maxplayers}`);
					bot.user.setActivity(`MC Server: ${out.players}/${out.maxplayers}`);
				}
	}).catch(err => console.error(err));
}
