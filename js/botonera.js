function play(event){
	var audio = document.getElementById('ad');
	audio.pause();

	$("#ad").attr("src", $(event.target).parent().children("audio").attr("src"));
	audio.currentTime = 0;
	audio.play();
}

