<h1 align="center"> Spotifpy </h1>
<img src="https://i.imgur.com/KuVYLUy.jpg">
<hr>

Spotifpy is a web application created in [Python](https://www.python.org/) and based on [Flask](https://flask.palletsprojects.com/en/2.0.x/) and [Flask-SocketIO](https://flask-socketio.readthedocs.io/en/latest/).

You can see a live version [here](https://spotifpy.herokuapp.com), it will display what I'm currently listen to (great music!), if I'm listening to something at all.<br>Otherwise, you will see a placeholder showing the UI of the application.<hr>

<h2 align="center"> Installation </h2>
<p align="center">This application is not intended for public use, as you will have to register your own application to obtain the various keys. In any case, if you want to try it, this is the procedure.</p><br>

As a first step, download the release "Spotifpy 0.1" and use the package manager [pip](https://pip.pypa.io/en/stable/) to install the requirements.

```bash
$ pip install -r requirements.txt
```
Then you have to fill the [.env](https://pypi.org/project/python-dotenv/) file with the following keys:
```bash
# You can find this in your Spotify profile
USERNAME = "Your Spotify username"

# You can get these values in the developer section of Spotify's website
CLIENT_ID ='Your API client ID' 
CLIENT_SECRET ='Your client secret number'
REDIRECT_URI ='your redirect URI'

# You can get this key in the developer section of Genius's website
GENIUS_KEY = 'Your Genius key'

# You can generate this yourself, it's a key that Flask uses to encrypt your cookies.
SECRET_KEY = 'Your secret key'
```
Now that you configured everything, run the script:

```bash
$ py app.py
```
Your application will run on [localhost:8080](https://localhost:8080)
<hr>
<h2 align="center"> Usage </h2>

The usage's pretty straightforward. You will see a nice UI with the song you're listening to. Clicking the white button will bring up the lyrics of the song you are listening to, if they are in the Genius database. The app is of course responsive so, if you decide to deploy it, you could technically use it on mobile (although the main reason I created it is to be used on your second / third monitor).
<hr>

<h2 align="center"> License </h2>
<h3 align="center"><a href="https://choosealicense.com/licenses/mit/" target="_blank"> MIT </a></h3>
