const Discord = require('discord.js')
const bot = new Discord.Client();
//--------------------//
const PREFIX = "!";
//--------------------//
bot.on('ready', function() {
    bot.user.setGame("piloter Zero Tsū | !h")
    console.log("[LOGS]Hiro ready !")
});
//--------------------//
// Create an event listener for messages
bot.on('message', message => {
    if (message.content === '!avatar') {
      message.channel.send(message.author.avatarURL);
    }
  });
//--------------------//
bot.on('guildMemberAdd', member => {
    bot.channels.get('445531408186736650').send("Bienvenue à toi, " + member.user.username);
});
//--------------------//
bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split(" ");
    var command = args[0].toLowerCase();
    var mutedrole = message.guild.roles.find("name", "muted");

    if (command == "h") { // creates a command *help
        var embedhelpmember = new Discord.RichEmbed() // sets a embed box to the variable embedhelpmember
            .setTitle(":scroll: **Liste des Commandes** :scroll:\n") // sets the title to List of Commands
            .addField(" - h", "Affiche l'aide (usage: !help)") // sets the first field to explain the command *help
            .addField(" - info", "Pour parler de moi (usage: !info") // sets the field information about the command *info
            .addField(" - ping", "pong! (usage: !ping)") // sets the second field to explain the command *ping
            .addField(" - cookie", "Donnez un cookie à quelqu'un (usage: !cookie @username)") // sets the third field to explain the command *cookie
            .addField(" - avatar", "Permet d'afficher votre avatar (usage: !avatar)")
            .setColor(0x00b9ff)
            .setFooter("Besoins d'aide? Tenez!") // sets the footer to "You need help, do you?"
        var embedhelpadmin = new Discord.RichEmbed() // sets a embed box to the var embedhelpadmin
            .setTitle(":tools: **Liste des Commandes Admin** :tools:\n") // sets the title
            .addField(" - say", "Je peut dire ce que vous voulez (usage: !say [message])")
            .addField(" - mute", "Mute une personne (usage: !mute @username [reason])") // sets a field
            .addField(" - unmute", "Démute une personne (usage: !unmute @username)")
            .addField(" - kick", "Vire une personne avec raison ou non (usage: !kick @username [reason])") //sets a field
            .setColor(0xff6c8e) // sets a color
            .setFooter("Ooo, un admin!") // sets the footer
        message.channel.send(embedhelpmember); // sends the embed box "embedhelpmember" to the chatif
        if(message.member.roles.some(r=>["Dārin (ダーリン)"].includes(r.name)) ) return message.channel.send(embedhelpadmin); // if member is a botadmin, display this too
    }

    if (command == "info") { // creates the command *info
        message.channel.send("Je me nomme Hiro, ou Code 016 pour Papa et les Adultes. Je pilote un FranXX nommé Le Strelitzia avec Zero Tsu, bien que son code est 02. Ravis d'etre parmis vous!") // gives u info
    }

    if(command === "ping") {
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
      }

    if (command == "cookie") { // creates the command cookie
        if (args[1]) message.channel.send(message.author.toString() + " donne un cookie à " + args[1].toString() + " :cookie:") // sends the message saying someone has given someone else a cookie if someone mentions someone else
        else message.channel.send("Tu ne peut pas donner un cookie aux fantomes...") // sends the error message if no-one is mentioned
    }

    if (command == "say") { // creates command say
        if (!message.member.roles.some(r=>["Dārin (ダーリン)"].includes(r.name)) ) return ;
        var sayMessage = message.content.substring(4)
        message.delete().catch(O_o=>{});
        message.channel.send(sayMessage);
    }

    if(command === "purge") {
        if (!message.member.roles.some(r=>["Dārin (ダーリン)"].includes(r.name)) ) return ;
        let messagecount = parseInt(args[1]) || 1;

        var deletedMessages = -1;

        message.channel.fetchMessages({limit: Math.min(messagecount + 1, 100)}).then(messages => {
            messages.forEach(m => {
                if (m.author.id == bot.user.id) {
                    m.delete().catch(console.error);
                    deletedMessages++;
                }
            });
        }).then(() => {
                if (deletedMessages === -1) deletedMessages = 0;
                message.channel.send(`Je viens de supprimer \`${deletedMessages}\` messages.`)
                    .then(m => m.delete(2000));
        }).catch(console.error);
    }

    if (command == "mute") { // creates the command mute
        if (!message.member.roles.some(r=>["Dārin (ダーリン)"].includes(r.name)) ) return ;
        var mutedmember = message.mentions.members.first(); // sets the mentioned user to the var kickedmember
        if (!mutedmember) return message.channel.send("Veuillez choisir un membre présent dans ce serveur... et non un fantome!") // if there is no kickedmmeber var
        if (mutedmember.hasPermission("Dārin (ダーリン)")) return message.reply("Je ne peut pas mute cette personne :PandaSad:") // if memebr is an admin
        var mutereasondelete = 0 + mutedmember.user.id.length //sets the length of the kickreasondelete
        var mutereason = message.content.substring(mutereasondelete).split(" "); // deletes the first letters until it reaches the reason
        var mutereason = mutereason.join(" "); // joins the list kickreason into one line
        if (!mutereason) return message.reply("Indiquez une raison") // if no reason
        mutedmember.addRole(mutedrole) //if reason, kick
            .catch(error => message.reply(`Désolé, je ne peut mute cette personne pour cette raison: ${error}`)); //if error, display error
        message.reply(`${mutedmember.user} a été mute par ${message.author} pour cette raison: ${mutereason}`); // sends a message saying he was kicked
    }

    if (command == "unmute") { // creates the command unmute
        if (!message.member.roles.some(r=>["Dārin (ダーリン)"].includes(r.name)) ) return ;
        var unmutedmember = message.mentions.members.first(); // sets the mentioned user to the var kickedmember
        if (!unmutedmember) return message.reply("Veuillez choisir un membre présent dans ce serveur...") // if there is no kickedmmeber var
        unmutedmember.removeRole(mutedrole) //if reason, kick
            .catch(error => message.reply(`Désolé, je ne peut démute cette personne pour cette raison: ${error}`)); //if error, display error
        message.reply(`${mutedmember.user} a été démute par ${message.author}`); // sends a message saying he was kicked
    }

    if (command == "kick") { // creates the command kick
        if (!message.member.roles.some(r=>["Dārin (ダーリン)"].includes(r.name)) ) return ;
        var kickedmember = message.mentions.members.first(); // sets the mentioned user to the var kickedmember
        if (!kickedmember) return message.reply("Veuillez choisir un membre présent dans ce serveur...") // if there is no kickedmmeber var
        if (!kickedmember.kickable) return message.reply("Désolé, je ne peut virer cette personne") // if the member is unkickable
        var kickreasondelete = 0 + kickedmember.user.id.length //sets the length of the kickreasondelete
        var kickreason = message.content.substring(kickreasondelete).split(" "); // deletes the first letters until it reaches the reason
        var kickreason = kickreason.join(" "); // joins the list kickreason into one line
        if (!kickreason) return message.reply("Indiquez une raison") // if no reason
        kickedmember.kick(kickreason) //if reason, kick
            .catch(error => message.reply(`Désolé, je ne peut virer cette personne pour cette raison: ${error}`)); //if error, display error
        message.reply(`${kickedmember.user.username} a été viré(e) ${message.author.username} pour cette raison: ${kickreason}`); // sends a message saying he was kicked
    }

});







































//--------------------//
bot.login(process.env.TOKEN) // Token
//--------------------//
