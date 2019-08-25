# LeagueDiscordBot
Discord Bot made for League of Legends

Currently, this bot takes in two commands: !match and !summoner

The !match command will take one argument.
Ex: !match summonerNameHere
The bot will then search for that summoner. If the summoner is in a game, the game mode is returned in the discord chat.

The !summoner command will also take one argument.
Ex: !summoner summonerNameHere
The bot will search Riot's data to find a summoner with the entered summoner name. If it exists, it is returned in chat.

This bot was created with Node.js, Discord.js, and LeagueAPIWrapper.
