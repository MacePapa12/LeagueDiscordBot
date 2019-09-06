let LeagueAPI = require('leagueapiwrapper');
LeagueAPI = new LeagueAPI('RIOTGAMESAPIKEYHERE', Region.NA);
const Discord = require('discord.js');
const client = new Discord.Client();
const {prefix, token} = require(`./config.json`);

client.login(token);

//Make sure client and any async functions are ready
client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return; //Check for prefix or bot message

    const args = message.content.slice(prefix.length).split(/ +/); //Parse the input into arguments
    const command = args.shift().toLowerCase(); //Takes the first arg and designates it as the command
    
    //message.channel.send(args.length);
    //message.channel.send(args);

    if (command == `summoner`) {
        //Error handelling for improper input
        if(args.length != 1) {
            message.channel.send("Invalid argument length.");
            message.channel.send("Format as '!summoner SummName'");
            message.channel.send("As a note, you will not need capitals.");
        }
        else {
            var summonerName = args;
            //message.channel.send(`Summoner Name is: ${summonerName}`);
            //Use MundoScript API to search for summoner info from user input
            LeagueAPI.getSummonerByName(summonerName)
                .then(function(accountInfo) {
                    console.log(accountInfo);
                    message.channel.send(`Summoner: ${accountInfo.name}`);
                })
                .catch(console.log);
        }
    }
    else if (command == `match`) {
        //Error handelling for improper input
        if(args.length != 1) {
            message.channel.send("Invalid argument length.");
            message.channel.send("Format as '!summoner SummName'");
            message.channel.send("As a note, you will not need capitals.");
        }
        else {
            var summonerName = args;
            //message.channel.send(`Summoner Name is: ${summonerName}`);
            //Search for summoner info from user input
            LeagueAPI.getSummonerByName(summonerName)
                .then(function(accountObject) {
                    console.log(accountObject);
                    //Use accountObject retrieved by getSummonerByName function to find active games
                    return LeagueAPI.getActiveGames(accountObject);
                })
                //Use activeGames object data returned from getActiveGames function to display desired game information
                .then(function(activeGames) {
                    console.log(activeGames);
                    //console.log(activeGames.participants[0].perks);
                    message.channel.send(`The type of gamemode being played is ${activeGames.gameMode}`);
                })
                .catch(console.log);
        }
    }
    //Final error handelling
    else {
        message.channel.send("Not a valid argument");
    }
});
