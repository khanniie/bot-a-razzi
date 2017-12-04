var messages = [
    "so CUTE!", "love it!", "wow, this sucks ass", "ignore the haters!!!"
]
var interval = 200;
var topcounter = 0;


var assignto = document.getElementById("other-comments");
setInterval(function() {
    if (topcounter > 50) {
        $(".comment").each(function() {
        	var parsed = parseInt($(this).css('top'));
        	var newtop =  (parsed-20) + "px";
        	console.log(newtop);
            $(this).css('top', newtop);
        });
    }
    var temp = document.createElement("div");
    $(temp).html(messages[Math.floor(Math.random() * messages.length)]);
    $(temp).css('top', topcounter);
    $(temp).addClass('comment');
    assignto.appendChild(temp);
    topcounter += 20;

}, Math.floor(Math.random() * 3000));