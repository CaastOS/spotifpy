# Spotifpy

Spotifpy is a web application created in Python and based on Flask and Socket.io.

You can see a live version [here](https://spotifpy.herokuapp.com), in case I am listening to music (most likely). Otherwise, you will see a placeholder showing the UI of the application.

## Installation
_This application is not intended for public use, as you will have to register your own application to obtain the various keys. In any case, if you want to try it, this is the procedure._

As a first step, use the package manager [pip](https://pip.pypa.io/en/stable/) to install the requirements.

```bash
$ pip install -r requirements.txt
```
Then you have to create a .env file with the following keys:
```bash
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

## Usage

The usage's pretty straightforward. You will see a nice UI with the song you're listening to. Clicking the white button will bring up the lyrics of the song you are listening to, if they are in the Genius database.


## License
[MIT](https://choosealicense.com/licenses/mit/)
