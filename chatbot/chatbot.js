var messages = [
    "so CUTE", "love it", "haha", "the good old days!", "enjoy your youth...", "ignore the haters", "babyyyy", "omg", "LMAO", "congrats on UR birth! proud of U <i class='em em-tada'></i>", "<i class='em em-hearts'></i>", "<i class='em em---1'></i>", "does this iDiot know how to do taxes? <i class='em em-confused'></i>", "so cute!", "that's one fat boy", "love it"
]
var interval = 200;
var topcounter = 0;

var userNameFragments = [
	"mary", "linda", 'SHIRT', 'hell', 'heaven', 'status', '-', 'Xx', "xX", "demon", "Reaper", 'moon', 'd', 'apple', 'qr', 'bits','dog', '0', '1', '2', '99', 'david', 'lol', 'puppies', 'kittens', 'idiot', 'chan', 'jesus', 'z', 'PANTS'
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
            console.log(newtop);
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
