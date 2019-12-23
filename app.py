from flask import Flask, render_template, url_for, redirect, request, session, jsonify
from authlib.integrations.flask_client import OAuth
#from flask_pymongo import PyMongo
import os
import requests
import json
import dotenv
dotenv.load_dotenv()


#MONGO_DB =os.getenv("MONGO_DB")
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
REDIRECT_URI = os.getenv("REDIRECT_URI")

app = Flask(__name__)
#app.config['MONGO_URI']=MONGO_DB
app.config['GOOGLE_ID'] = GOOGLE_CLIENT_ID
app.config['GOOGLE_SECRET'] = GOOGLE_CLIENT_SECRET
app.secret_key = os.getenv("SECRET_KEY") #os.environ.get("FN_FLASK_SECRET_KEY")
oauth = OAuth(app)
#mongo = PyMongo(app)


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


#@app.route('requests', methods=['GET','POST', 'PATCH'])
#def requests():



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

@app.route('/Wow-Demos')
def wowdemoGuide():
    if is_logged_in():
        return render_template('wowdemoGuide.html')
    else:
        return render_template('notLoggedIn.html')


@app.route('/Wow-Demos/Convoy')
def convoy():
    if is_logged_in():
        return render_template('convoy.html')
    else:
        return render_template('notLoggedIn.html')


@app.route('/Wow-Demos/One-Fine-Stay') #not available
def demo2():
    if is_logged_in():
        return render_template('onefinestay.html')
    else:
        return render_template('notLoggedIn.html')


@app.route('/Wow-Demos/Better-Mortgage') #not available
def demo3():
    if is_logged_in():
        return render_template('Better_Mortgage.html')
    else:
        return render_template('notLoggedIn.html')


@app.route('/Wow-Demos/Talkdesk-Credit-Union') #not available
def demo4():
    if is_logged_in():
        return render_template('tdcu.html')
    else:
        return render_template('notLoggedIn.html')


@app.route('/Wow-Demos/mongoDB') #not available
def demo5():
    if is_logged_in():
        return render_template('mongoDB.html')
    else:
        return render_template('notLoggedIn.html')


@app.route('/Wow-Demos/EmployBridge') #not available
def demo6():
    if is_logged_in():
        return render_template('employ_bridge.html')
    else:
        return render_template('notLoggedIn.html')


@app.route('/Sales-Engineering/Home')
def salesGuide():
    if is_logged_in():
        return render_template('salesGuide.html')
    else:
        return render_template('notLoggedIn.html')


@app.route('/Sales-Engineering/Onboarding')
def salesOnboarding():
    if is_logged_in():
        return render_template('salesOnboarding.html')
    else:
        return render_template('notLoggedIn.html')


@app.route('/Sales-Engineering/Processes')
def salesProcess():
    if is_logged_in():
        return render_template('salesProcess.html')
    else:
        return render_template('notLoggedIn.html')


@app.route('/Sales-Engineering/Feature-Library')
def salesFeatures():
    if is_logged_in():
        return render_template('featureLibrary.html')
    else:
        return render_template('notLoggedIn.html')



@app.route('/Sales-Engineering/Links')
def salesLinks():
    if is_logged_in():
        return render_template('salesLinks.html')
    else:
        return render_template('notLoggedIn.html')


@app.route('/Sales-Engineering/Technical-FAQ')
def salesTrain():
    if is_logged_in():
        return render_template('salesFaq.html')
    else:
        return render_template('notLoggedIn.html')


@app.route('/Demo-Engineering/Onboarding')
def demoengOnboarding():
    if is_logged_in():
        return render_template('demoengOnboarding.html')
    else:
        return render_template('notLoggedIn.html')


@app.route('/Demo-Engineering/Processes') #not done
def demoengProcess():
    if is_logged_in():
        return render_template('demoengProcess.html')
    else:
        return render_template('notLoggedIn.html')


@app.route('/Demo-Engineering/Home')
def demoengGuide():
    if is_logged_in():
        return render_template('demoengGuide.html')
    else:
        return render_template('notLoggedIn.html')


@app.route('/Demo-Engineering/Help') #not done
def demoengHelp():
    if is_logged_in():
        return render_template('demoengHelp.html')
    else:
        return render_template('notLoggedIn.html')



@app.route('/Sales-Engineering/Demo-Logins')
def demoLogins():
    if is_logged_in():
        return render_template('demoLogins.html')
    else:
        return render_template('notLoggedIn.html')


@app.route('/Integrations-Engineering/Home')
def intengGuide():
    if is_logged_in():
        return render_template('intengGuide.html')
    else:
        return render_template('notLoggedIn.html')


@app.route('/Integrations-Engineering/Processes') #not done
def intengProcess():
    if is_logged_in():
        return render_template('intengProcess.html')
    else:
        return render_template('notLoggedIn.html')


@app.route('/Integrations-Engineering/Help')
def intengHelp():
    if is_logged_in():
        return render_template('intengHelp.html')
    else:
        return render_template('notLoggedIn.html')


@app.route('/Integrations-Engineering/Onboarding')
def intengOnboarding():
    if is_logged_in():
        return render_template('intengOnboarding.html')
    else:
        return render_template('notLoggedIn.html')


@app.route('/Integrations-Engineering/Tools') #not done
def intengTools():
    if is_logged_in():
        return render_template('intengTools.html')
    else:
        return render_template('notLoggedIn.html')


@app.route('/Feature1') #not done
def feature1():
    if is_logged_in():
        return render_template('feature1.html')
    else:
        return render_template('notLoggedIn.html')


@app.route('/Feature2') #not done
def feature2():
    if is_logged_in():
        return render_template('feature2.html')
    else:
        return render_template('notLoggedIn.html')


@app.route('/Products/Appconnect-Dialer')
def appconnectDialer():
    if is_logged_in():
        return render_template('appconnectDialer.html')
    else:
        return render_template('notLoggedIn.html')


@app.route('/Products/Custom-Callback') #not done
def customCallback():
    if is_logged_in():
        return render_template('customCallback.html')
    else:
        return render_template('notLoggedIn.html')


@app.route('/Site-Moderators')
def siteModerators():
    if is_logged_in():
        return render_template('siteModerators.html')
    else:
        return render_template('notLoggedIn.html')


if __name__ == '__main__':
    app.run(debug=True)
