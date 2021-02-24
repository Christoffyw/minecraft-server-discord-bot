const {Client, RichEmbed} = require('discord.js');
const Discord = require('discord.js');
const fetch = require('node-fetch');
const bot = new Client();

const token = "BOT_TOKEN" // Replace this <---------------------- Example, const token = "sSEjfSEifojsofSEfSJEfioEF"
const ip = "SERVER_ADDRESS"// Replace this <---------------------- Example, const ip = "mc.hypixel.net"
const port = "SERVER_PORT" // Replace this <---------------------- Example, const port = "25565"

const url = 'https://mcapi.xdefcon.com/server/' + ip + ':' + port + '/full/json';
const url2 = 'https://api.minetools.eu/ping/'ip + '/' + port;


//Bot login
bot.login(token);



//Logs bot logged
bot.on('ready', () => {
	console.log('This bot is online!');
	bot.setInterval(update, 5000);
});

bot.on('message', message => {
	let args = message.content.slice(PREFIX.length).split(" ");
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
