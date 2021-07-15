document.addEventListener('DOMContentLoaded', function() {

	if (window.location.protocol == "https:") {
	  var ws_scheme = "wss://";
	} else {
	  var ws_scheme = "ws://"
	};

    var socket = io.connect(ws_scheme + document.domain + ':' + location.port + '/');

    function emit() {
        socket.emit('message', {
            data: "Ready!"
        });
    };
    
	socket.on('nothing', function() {
		document.getElementById('title').innerHTML = "Casto is currently not listening to music :( "
        document.getElementById('lyrics').innerHTML = "[Verse 1]<br> We're no strangers to love<br> You know the rules and so do I<br> A full commitment's what I'm thinking of<br> You wouldn't get this from any other guy<br><br> [Pre-Chorus]<br> I just wanna tell you how I'm feeling<br> Gotta make you understand<br><br> [Chorus]<br> Never gonna give you up<br> Never gonna let you down<br> Never gonna run around and desert you<br> Never gonna make you cry<br> Never gonna say goodbye<br> Never gonna tell a lie and hurt you<br><br> [Verse 2]<br> We've known each other for so long<br> Your heart's been aching, but you're too shy to say it<br> Inside, we both know what's been going on<br> We know the game, and we're gonna play it<br><br> [Pre-Chorus]<br> And if you ask me how I'm feeling<br> Don't tell me you're too blind to see<br><br> [Chorus]<br> Never gonna give you up<br> Never gonna let you down<br> Never gonna run around and desert you<br> Never gonna make you cry<br> Never gonna say goodbye<br> Never gonna tell a lie and hurt you<br> Never gonna give you up<br> Never gonna let you down<br> Never gonna run around and desert you<br> Never gonna make you cry<br> Never gonna say goodbye<br> Never gonna tell a lie and hurt you<br><br> [Post-Chorus]<br> Ooh (Give you up)<br> Ooh-ooh (Give you up)<br> Ooh-ooh<br> Never gonna give, never gonna give (Give you up)<br> Ooh-ooh<br> Never gonna give, never gonna give (Give you up)<br><br> [Bridge]<br> We've known each other for so long<br> Your heart's been aching, but you're too shy to say it<br> Inside, we both know what's been going on<br> We know the game, and we're gonna play it<br><br> [Pre-Chorus]<br> I just wanna tell you how I'm feeling<br> Gotta make you understand<br><br> [Chorus]<br> Never gonna give you up<br> Never gonna let you down<br> Never gonna run around and desert you<br> Never gonna make you cry<br> Never gonna say goodbye<br> Never gonna tell a lie and hurt you<br> Never gonna give you up<br> Never gonna let you down<br> Never gonna run around and desert you<br> Never gonna make you cry<br> Never gonna say goodbye<br> Never gonna tell a lie and hurt you<br> Never gonna give you up<br> Never gonna let you down<br> Never gonna run around and desert you<br> Never gonna make you cry<br> Never gonna say goodbye<br> Never gonna tell a lie and hurt you<br>"
		document.getElementById('album-cover').src = "https://spotifpy.herokuapp.com/static/placeholder.jpg"
        document.getElementById('background-pic').src = "https://spotifpy.herokuapp.com/static/placeholder.jpg"
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

        if (lyrics.includes("\n,")) {
            lyrics = lyrics.replaceAll("(\n,", ",")
        }
        
        document.getElementById('lyrics').innerHTML = lyrics.replace(/(?:\r\n|\r|\n)/g, '<br>');


    });

    setInterval(emit, 4000);
});