document.addEventListener('DOMContentLoaded', function() {

	if (window.location.protocol == "https:") {
	  var ws_scheme = "wss://";
	} else {
	  var ws_scheme = "ws://"
	};

    var socket = io.connect(ws_scheme + document.domain + ':' + location.port + '/');
	var pic = document.getElementById('album-cover').src
	var originalLyrics = document.getElementById('lyrics')
    function emit() {
        socket.emit('message', {
            data: "Ready!"
        });
    };
    
	socket.on('nothing', function(msg) {
		document.getElementById('title').innerHTML = "Casto is currently not listening to music :( "
		document.getElementById('album-cover').src = pic
        document.getElementById('background-pic').src = pic
		document.getElementById('lyrics').innerHTML = originalLyrics
	});

    socket.on('data', function(msg) {
        listeningTo = msg.data;
        document.getElementById('title').innerHTML = listeningTo.name + " by " + listeningTo.artist;
        document.getElementById('album-cover').src = listeningTo.image;
        document.getElementById('background-pic').src = listeningTo.image;
        lyrics = listeningTo.lyrics

        if (lyrics.endsWith('Copy')) {
            lyrics = lyrics.substring(0, lyrics.length - 34);
        }

        if (lyrics.includes("\n)")) {
            lyrics = lyrics.replaceAll("\n)", ")")
        }

        if (lyrics.includes("\n)")) {
            lyrics = lyrics.replaceAll("\n)", ")")
        }

        if (lyrics.includes("\n]")) {
            lyrics = lyrics.replaceAll("\n]", "]")
        }

        if (lyrics.includes("& \n")) {
            lyrics = lyrics.replaceAll("& \n", "& ")
        }

        if (lyrics.includes("[\n")) {
            lyrics = lyrics.replaceAll("[\n", "[")
        }

        if (lyrics.includes("(\n")) {
            lyrics = lyrics.replaceAll("(\n", "(")
        }

        if (lyrics.includes("(\n")) {
            lyrics = lyrics.replaceAll("(\n", "(")
        }
        
        if (lyrics.includes("\n,")) {
            lyrics = lyrics.replaceAll("(\n,", ",")
        }
        
        document.getElementById('lyrics').innerHTML = lyrics.replace(/(?:\r\n|\r|\n)/g, '<br>');


    });

    setInterval(emit, 4000);
});