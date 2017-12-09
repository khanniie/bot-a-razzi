var weebmessages = [
    "look at those posters", "I laugh daily. Keeps the depression at bay.", "Har har har", "Karl Marx was a fool but he did get one thing right. Religion is the opiate of the masses.", "I don’t know if it’s fair to call their Russian dressing Russian dressing — it should be called something sexy, like liquid Moscow.", "lelouch is HUSBANDO #1!!!!!!!!!! $@", "The only ones who should kill, are those who are prepared to be killed.", 
"To defeat evil, I must become a greater evil", "r u a jungkook stan?", "woah armys r everywere!", "666666", "233333333", "i wake up in the morning thinking about food", "i'm a culinary gangsta", "room tour plz", "o(>ω<)o wow!! love ur crib!!~~~~", "I'm dying (:з」∠)", "owo~~~~~", "uwahhhhh", "do you even watch the sub", "im moving to japan soon, so excited!", "omae wa mou shinderu", "ur a fake fan", "anyone down to go to a maid cafe with me", "Time for another episode of shrek drinking swamp water",
"omgggggg", "yiKes", "LMAO", "hahahahaha", "W A T E R    M E    D A D", "better than the real dub", "i like how geese sound like balloons rubbing together.", "I don't know what I expected", "It's too hot for my chinchilla..", "Lo más kawaii  que e vistooo!!!!!", "What a time to be alive", "Scientifically proven by shrek himself that eggs are sexier then women"
]

var babymessages = [
    "so CUTE", "love it","I FEEL........UNCOMFORTABLE", "im sorry you dont deserve to be born", "SOMEONE CALL AN EXORCIST!%TEGHKDJSHGKLJAHKDHG", "do you have time for our lord and savior", "WHY IS THE BABY STANDING!!!!!",  "haha", "the good old days!", "enjoy your youth...", "ignore the haters", "babyyyy", "omg", "LMAO", "congrats on UR birth! proud of U <i class='em em-tada'></i>", "<i class='em em-hearts'></i>", 
    "<i class='em em---1'></i>", "does this iDiot know how to do taxes? <i class='em em-confused'></i>", "so cute!", "that's one fat boy", "love it", "wow, he can stand already!!!! :))) healthy boy!", "best wishes ~~ ", "your parents did a good job +++", "where's your mommy", "hey how are you doing", "how was the experience of being born? i'm curious", "is it naptime yet", "aaaaaa", "2333333", "Omg my baby has been sleeping so well he hasn't woken up for 3 weeks should I just wait for him to wake up or?", 
    "life HACk: do NOT trust what anyone tells you!!! theyre all lying to you", "looks like UR surrounded by fake friends"
]

var mommessages = [
    "hey how are you doing", "omgggg", "uhhhhhhhh", "haha", "LOL, that is SO you", "too much makeup", "so fake", "do you have time for our lord and savior", "Anyone have any info on hip hop classes for a 6 year old boy?", "my kid beat your kid in soccer, how does that make you feel", "when's the next potluck?", "hey it was great seing U @ starbucks today", "didn't see U at last yoga session, are you doing ok?", "you and mike are the perfect couple", "hang in there kitten", "​is that﻿ cailyn jenner", "that looks rank﻿ ngl", "​Jessica﻿ shut up", "slut", "​dreadful.﻿", "​bingo﻿ bongo", "nice﻿ legs", "Is the screen flashing every so often for anyone else or is﻿ it just me?", "lmao﻿", "yes", "​lord﻿", "GOD IS REAL﻿", "​PMURT ATTRACTS EVIL PERVERTS", "poor﻿ dumb Snaciremas.", "​chat rooms﻿ are so deep", "k shut up now, thx﻿", "​have fun screaming into the﻿ void 45 trolls", "Jesus love thee", "FUCK YOU ... GO WORSHIP﻿ PMURT'S COCK ASSHOLE", "you look lovely!", "beautiful!", "can't wait to see you again soon"
]

var messages = babymessages;

var interval = 200;
var topcounter = 0;

var userNameFragments = [
	"Ayyy", "taco", "plz", "kill", "mary", "linda", 'SHIRT', 'Clorox', 'Bleach', 'Crystals', 'hell', 'heaven', 'status', '-', 'Xx', "xX", "demon", "Reaper", 'moon', 'd', 'apple', 'qr', 'bits','dog', '0', '1', '2', '99', 'david', 'lol', 'puppies', 'kittens', 'idiot', 'chan', 'jesus', 'z', 'PANTS'
]
var colors=[
	'blue', 'red', 'green', 'pink', 'purple'
]
var sentenceenders= [
	'!', '...', '.....', '!?', ';;', '!!!', '???', '.', ':))', '  xx', '<i class="em em-clap"></i>', '<i class="em em-eyes"></i>', '<i class="em em-laughing"></i><i class="em em-laughing"></i>', '<i class="em em-laughing"></i>'
]

var createUsername = function(){
	var length = Math.floor(Math.random() * 4);
	var name = userNameFragments[Math.floor(Math.random() * userNameFragments.length)];
	for(var i = 0; i < length; i ++){
		var add = userNameFragments[Math.floor(Math.random() * userNameFragments.length)];
		name = name.concat(add);
	}
	return name;
}

var assignto = document.getElementById("other-comments");
setInterval(function() {
    if (topcounter > 140) {
        $(".comment").each(function() {
            var parsed = parseInt($(this).css('top'));
            if (parsed < 0) {
                $(this).remove();
            }
            var newtop = (parsed - 30) + "px";
            $(this).css('top', newtop);
        });
    }
    else {
        topcounter += 30;
    }
    var temp = document.createElement("div");
    var name = createUsername();
    var color = colors[Math.floor(Math.random() * colors.length)];
    if(Math.random() < 0.2){
    	var string = "<span class=" + color + ">" + name + "</span>: @" + createUsername();
    }
    else{
    	 var string = "<span class=" + color + ">" + name + "</span>: " + messages[Math.floor(Math.random() * messages.length)] + sentenceenders[Math.floor(Math.random() * sentenceenders.length)];
    }
    $(temp).html(string);
    $(temp).css('top', topcounter);
    $(temp).addClass('comment');
    setTimeout(function(){
    	assignto.appendChild(temp);
    }, 100);
    

}, 3000);
