let LeagueAPI = require('leagueapiwrapper');
LeagueAPI = new LeagueAPI('RIOTGAMESAPIKEYHERE', Region.NA);
const Discord = require('discord.js');
const client = new Discord.Client();
const {prefix, token} = require(`./config.json`);

client.login(token);

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    
    //message.channel.send(args.length);
    //message.channel.send(args);

    if (command == `summoner`) {
        if(args.length != 1) {
            message.channel.send("Invalid argument length.");
            message.channel.send("Format as '!summoner scdominator'");
            message.channel.send("As a note, you will not need capitals.");
        }
        else {
            var summonerName = args;
            //message.channel.send(`Summoner Name is: ${summonerName}`);
            LeagueAPI.getSummonerByName(summonerName)
                .then(function(accountInfo) {
                    console.log(accountInfo);
                    message.channel.send(`Summoner: ${accountInfo.name}`);
                })
                .catch(console.log);
        }
    }
    else if (command == `match`) {
        if(args.length != 1) {
            message.channel.send("Invalid argument length.");
            message.channel.send("Format as '!summoner scdominator'");
            message.channel.send("As a note, you will not need capitals.");
        }
        else {
            var summonerName = args;
            //message.channel.send(`Summoner Name is: ${summonerName}`);
            LeagueAPI.getSummonerByName(summonerName)
                .then(function(accountObject) {
                    console.log(accountObject);
                    return LeagueAPI.getActiveGames(accountObject);
                })
                .then(function(activeGames) {
                    console.log(activeGames);
                    //console.log(activeGames.participants[0].perks);
                    message.channel.send(`The type of gamemode being played is ${activeGames.gameMode}`);
                })
                .catch(console.log);
        }
    }
    else {
        message.channel.send("Not a valid argument");
    }
});
