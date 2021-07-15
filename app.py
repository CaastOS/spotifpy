from flask import *
from flask_socketio import SocketIO, emit
from dotenv import load_dotenv
import spotipy
import spotipy.util as util
import lyricsgenius
import re
import os


load_dotenv() # loading .env file with all the APIs config. For developers, in most servers you have to add enviroment variables directly on servers (ex. Heroku)

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET')
port = int(os.getenv('PORT'))

socketio = SocketIO(app)
spotifyScope = 'user-read-currently-playing user-read-playback-state'
spotifyUsername = os.environ.get('USERNAME')
spotifyToken = util.prompt_for_user_token(spotifyUsername,spotifyScope,client_id=os.environ.get('CLIENT_ID'),client_secret=os.environ.get('CLIENT_SECRET'),redirect_uri=os.environ.get('REDIRECT_URI'))
sp = spotipy.Spotify(auth=spotifyToken)

genius = lyricsgenius.Genius(os.environ.get('GENIUS_KEY'))

@app.route('/')

def index():
    return render_template('index.html')


@socketio.on('message')

def feed(message):
    global sp, spotifyToken
    try:
        try:

            results = sp.current_user_playing_track() # Spotify API call
            listeningTo = {
            
                'name': results.get('item').get('name'),
                'artist': results.get('item').get('artists')[0].get('name'),
                'image': results.get('item').get('album').get('images')[0].get('url')
                
            }

        except:
            emit('nothing') # User is not listening to anything

        try:
        
            listeningTo['lyrics'] = genius.search_song(listeningTo['name'], listeningTo['artist']).lyrics
            emit('data', {'data': listeningTo})  
                
        except AttributeError: # No lyrics returned from Genius API
            listeningTo['lyrics'] = "No lyrics found."
            emit('data', {'data': listeningTo})

        except UnboundLocalError: # User is not listening to anything
            pass        

    except: # Token is expired, it will automatically get a new one without any user interaction
        spotifyToken = util.prompt_for_user_token(spotifyUsername,spotifyScope,client_id=os.environ.get('CLIENT_ID'),client_secret=os.environ.get('CLIENT_SECRET'),redirect_uri=os.environ.get('REDIRECT_URI'))
        sp = spotipy.Spotify(auth=spotifyToken)
            
        
if __name__ == '__main__':
    app.run(host="localhost", port=port)
