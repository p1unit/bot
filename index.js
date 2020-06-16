require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
console.log(TOKEN);
const axios = require('axios');
bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', async msg => {
  const args = msg.content.split(/ +/);
   if(args[0]!='?') return;
   if(args.length != 2) return;
   
   const response = await axios.get('https://codeforces.com/api/user.status?handle=' + args[1]);
   const json = response.data;
   var problems = json.result; 
   console.log(problems);
   var solved = {};
   var unsolved = {};
    for(var i = 0;i<problems.length;i++){
        if (problems[i].verdict === 'OK') {
          solved[problems[i].problem.contestId + problems[i].problem.index] = problems[i];
          }
     }
            for(var i = 0;i<problems.length;i++){
            if (solved[problems[i].problem.contestId + problems[i].problem.index] == null) {
                 unsolved[problems[i].problem.contestId + problems[i].problem.index] = problems[i];
              }
        }
                var a = []
                for (var number in unsolved) {
                    a.push(unsolved[number])
                }
                a.sort(function(a, b) {
                    var r1 = a.problem.rating
                    var r2 = b.problem.rating
                    if (r1 == undefined) {
                        r1 = 10e5
                    }
                    if (r2 == undefined) {
                        r2 = 10e5
                    }
                    return r1 - r2;
                }) 
        var str = "";
        a.forEach((e,i)=>{
            const problem = e.problem;
            const link = "<https://codeforces.com/contest/"+e.contestId+"/problem/"+problem.index+">";

            if(i>=5);
            else{
            str += "\nProblem "+(i+1)+".\n";
            str += "Name: "+problem.name+"\n"; 
            str += "Link: "+link+"\n";
            str += "Rating: "+problem.rating+"\n\n"; 
            } 
        }); 
        msg.reply(str);       
    if (msg.content === 'ping') {
    msg.reply('pong');
    //msg.channel.send('pong');
  } 
});
