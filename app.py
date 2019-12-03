from flask import Flask, render_template, url_for, redirect, request, session, jsonify
from authlib.integrations.flask_client import OAuth
import os
import requests
import json
import dotenv
dotenv.load_dotenv()



GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
REDIRECT_URI = os.getenv("REDIRECT_URI")

app = Flask(__name__)
app.config['GOOGLE_ID'] = GOOGLE_CLIENT_ID
app.config['GOOGLE_SECRET'] = GOOGLE_CLIENT_SECRET
app.secret_key = os.getenv("SECRET_KEY") #os.environ.get("FN_FLASK_SECRET_KEY")
oauth = OAuth(app)


google = oauth.register('google',
api_base_url='https://www.google.com/accounts/',
server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
authorize_url='https://accounts.google.com/o/oauth2/auth',
request_token_url=None,
client_kwargs={'scope': 'https://www.googleapis.com/auth/userinfo.email',
'response_type': 'code'},
access_token_url='https://accounts.google.com/o/oauth2/token',
access_token_method='POST',
access_token_params={'grant_type': 'authorization_code'},
client_id=GOOGLE_CLIENT_ID,
client_secret=GOOGLE_CLIENT_SECRET)


@app.route('/login')
def login():
    redirect_uri = url_for('authorize', _external=True)
    return google.authorize_redirect(redirect_uri)


@app.route('/signin')
def authorize():
    token = google.authorize_access_token()
    # you can save the token into database
    access_token = token['access_token']
    user_info_url = 'https://www.googleapis.com/oauth2/v3/userinfo'
    final_access_token = 'Bearer ' + access_token
    headers = {'Authorization': final_access_token}
    r = requests.get(user_info_url, headers = headers)
    user_info = r.json()
    email = user_info['email']
    print(email)
    if '@talkdesk.com' in email:
        print('adding something to session')
        session['access_token'] = access_token
        return redirect(url_for('index'))
    else:
        return render_template('notLoggedIn.html')


def is_logged_in():
    return True if session.get('access_token') else False


@app.route('/')
def index():
    if session.get('access_token') is None:
        return redirect(url_for('login'))
    else:
        return render_template('index.html')


@app.route('/convoy') #done
def convoy():
    if is_logged_in():
        return render_template('convoy.html')
    else:
        return render_template('notLoggedIn.html')


@app.route('/demo2') #not available
def demo2():
    if is_logged_in():
        return render_template('wip.html')
    else:
        return render_template('notLoggedIn.html')


@app.route('/demo3') #not available
def demo3():
    if is_logged_in():
        return render_template('wip.html')
    else:
        return render_template('notLoggedIn.html')


@app.route('/sales-links') #done
def salesLinks():
    if is_logged_in():
        return render_template('salesLinks.html')
    else:
        return render_template('notLoggedIn.html')


@app.route('/technical-FAQ') #WIP
def salesTrain():
    if is_logged_in():
        return render_template('salesFAQ.html')
    else:
        return render_template('notLoggedIn.html')


@app.route('/sales-explore') #WIP
def salesExplore():
    if is_logged_in():
        return render_template('salesExplore.html')
    else:
        return render_template('notLoggedIn.html')


@app.route('/demo-jam') #not done
def demoJam():
    if is_logged_in():
        return render_template('demoJam.html')
    else:
        return render_template('notLoggedIn.html')


@app.route('/demoeng-help') #not done
def demoengHelp():
    if is_logged_in():
        return render_template('demoengHelp.html')
    else:
        return render_template('notLoggedIn.html')


@app.route('/demoeng-train') #not done
def demoengTrain():
    if is_logged_in():
        return render_template('demoengTrain.html')
    else:
        return render_template('notLoggedIn.html')


@app.route('/demoeng-daily') #not done
def demoengDaily():
    if is_logged_in():
        return render_template('demoengDaily.html')
    else:
        return render_template('notLoggedIn.html')


@app.route('/demoeng-weekly') #not done
def demoengWeekly():
    if is_logged_in():
        return render_template('demoengWeekly.html')
    else:
        return render_template('notLoggedIn.html')


@app.route('/demo-logins') #done
def demoLogins():
    if is_logged_in():
        return render_template('demoLogins.html')
    else:
        return render_template('notLoggedIn.html')


@app.route('/inteng-help') #not done
def intengHelp():
    if is_logged_in():
        return render_template('intengHelp.html')
    else:
        return render_template('notLoggedIn.html')


@app.route('/inteng-train') #not done
def intengTrain():
    if is_logged_in():
        return render_template('intengTrain.html')
    else:
        return render_template('notLoggedIn.html')


@app.route('/inteng-tools') #not done
def intengTools():
    if is_logged_in():
        return render_template('intengTools.html')
    else:
        return render_template('notLoggedIn.html')


@app.route('/feature1') #not done
def feature1():
    if is_logged_in():
        return render_template('wip.html')
    else:
        return render_template('notLoggedIn.html')


@app.route('/feature2') #not done
def feature2():
    if is_logged_in():
        return render_template('wip.html')
    else:
        return render_template('notLoggedIn.html')


if __name__ == '__main__':
    app.run(debug=True)
