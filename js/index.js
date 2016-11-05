$(function() {
	var play = $('#play');
	play.on("click", function() {
		if(audio.paused) {
			audio.play();
			$(this).html('&#xe644;');
			return;
		}
		audio.pause();
		$(this).html('&#xe609;');
	})
	//播放暂停

	var pi = $('#p-i');
	var current = $('#current-time');
	var duration = $('#duration');
	var progress = $('#progress');

	progress.on('touchend', function(e) {
	  
	    var offsetX=e.originalEvent.changedTouches[0].clientX-pi.width();
		audio.currentTime = offsetX / progress.width() * audio.duration;
	});

	function format(v) {
		var v = Math.floor(v)
		var s = v % 60;
		s = (s < 10) ? ("0" + s) : s;
		var m = Math.floor(v / 60);
		return m + ":" + s;
	}

	$(audio).on('canpaly', function() {
		duration.html(format(audio.duration));
	})

	$(audio).on('timeupdate', function() {
		var leftB = vi.width()/2;
		current.html(format(audio.currentTime));
		duration.html(format(audio.duration));
		var left = (progress.width()) * audio.currentTime / audio.duration - leftB;
		pi.css("left", left);
	})

	var vol = $('#volume')
	var vi = $('#v-i');
	var mute = $('#jinyin');

	vol.on('click', function(e) {
		var leftB = -vi.width() / 2;
		audio.volume = e.offsetX / vol.width();
		vi.css('left', vol.width() * e.offsetX / vol.width() + leftB);
		mute.removeAttr('data-v');
	})

	mute.on('click', function() {

		if($(this).attr('data-v')) {
			var leftB = -vi.width() / 2;
			audio.volume = $(this).attr('data-v');
			vi.css('left', vol.width() * audio.volume + leftB);
			$(this).removeAttr('data-v');
			$("#jinyin").html("&#xe608;");
		} else {
			$(this).attr('data-v', audio.volume);
			audio.volume = 0;
			vi.css('left', '-15px');
			$("#jinyin").html("&#xe645;")

		}

	})

	


$(audio).on("timeupdate",function(){
	var leftB= -vi.width() / 2;
	pi.css('left',(progress.width()) * audio.currentTime / audio.duration + leftB)
})


pi.on('touchstart',function(e){
	var offsetX=e.originalEvent.changedTouches[0].clientX-pi.offset().left;
	var r=pi.width()/2;
	var start=r-offsetX;
console.log(pi.offset().left)
	console.log(r)
	console.log(offsetX)
	pi.on('touchmove',function(e){
		
		 var pos=e.originalEvent.changedTouches[0].clientX-progress.position().left+start;
		 var c=pos/vol.width()*audio.duration;
		 console.log(pos)
         if(c>=audio.duration || c <=0) { /*边界问题*/
				return;
			}
         audio.currentTime=pos/progress.width()*audio.duration;
	    
         
	})
	return false;
})
pi.on('touchend',function(e){
	var offsetX=e.originalEvent.changedTouches[0].clientX;
});
pi.on("touchend", false);


$(audio).on("volumechange",function(){
	vi.css('left',vol.width()*audio.volume-vi.width()/2)
})

vi.on('touchstart',function(e){
	var offsetX=e.originalEvent.changedTouches[0].clientX-vi.offset().left;
	var r=vi.width()/2;
	var start=r-offsetX;
	vi.on('touchmove',function(e){
		 var pos=e.originalEvent.changedTouches[0].clientX-vol.position().left+start;
		 var c=pos/vol.width();
         if(c< 0 || c > 1) { /*边界问题*/
				return;
			}
         audio.volume=pos/vol.width();
	})
	return false;
})
vi.on('touchend',function(e){
	var offsetX=e.originalEvent.changedTouches[0].clientX-vi.offset().left;
});
//	vi.on("mousedown", function(e) {
//		var r1 = vi.width() / 2;
//		var start1 = r1 - e.offsetX;
//		$(document).on("mousemove", function(e) {
//			var left1 = e.clientX - vol.position().left + start1;
//			var c1 = left1 / vol.width();
//			if(c1 < 0 || c1 > 1) { /*边界问题*/
//				return;
//			}
//			audio.volume = left1 / vol.width();
//			console.log(audio.volume)
//		})
//		return false;
//	})
//
//	vi.on("touchend", false);

	var currentIndex = 0;
	var musics = [{
		name: "gala - young for you",
		author: "gala",
		src: "mp3/gala - young for you.mp3"
	}, {
		name: "Jason Mraz - I'm Yours",
		author: "Jason Mraz",
		src: "mp3/Jason Mraz - I'm Yours.mp3"
	}, {
		name: "diamonds",
		author: "Rihanna",
		src: "mp3/diamonds.mp3"
	}, ]

	var ul = $("ul");

	function render() {
		ul.empty();
		$.each(musics, function(index, val) {
			var c = (index == currentIndex) ? "active" : "";

			$("<li class='" + c + "'><span>" + musics[index].name + "</span><span>" + musics[index].author + "</span></li>").appendTo(ul);
		})
	}
	render();
	ul.on("touchend", "li", function() {
		$("li").removeClass("active");
		$(this).addClass("active");
		currentIndex = $(this).index();
		console.log(currentIndex);
		audio.src = musics[currentIndex].src;
		audio.play();
		$('#geming').html(musics[currentIndex].name);
		$('#geshou').html(musics[currentIndex].author);
	})

	var next = $("#next");
	next.on("touchend", function() {
			currentIndex++;
			if(currentIndex > musics.length - 1) {
				currentIndex = 0;
			}
			$("li").removeClass("active");
			$("li").eq(currentIndex).addClass("active");
			audio.src = musics[currentIndex].src;
			audio.play();
			$('#geming').html(musics[currentIndex].name);
			$('#geshou').html(musics[currentIndex].author);
		})

	var pre = $("#pre");
	pre.on("touchend", function() {
			currentIndex--;
			if(currentIndex <= 0) {
				currentIndex = musics.length - 1;
			}
			$("li").removeClass("active");
			$("li").eq(currentIndex).addClass("active");
			audio.src = musics[currentIndex].src;
			audio.play();
			$('#geming').html(musics[currentIndex].name);
			$('#geshou').html(musics[currentIndex].author);
		})
		//$('.ways').on("touchend",function(){
		//	$('.list').css('display','block');
		//})
		//$(".ways").on("touchend",function(){
		//	$(".list").css("display","none")
		//})
})
	