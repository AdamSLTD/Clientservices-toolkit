from flask import Flask, render_template, url_for

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/convoy')
def convoy():
    return 'convoy'

@app.route('/demo2')
def demo2():
    return '404 Error'

@app.route('/demo3')
def demo3():
    return '404 Error'

@app.route('/sales-links')
def salesLinks():
    return 'sales-links'

@app.route('/sales-train')
def salesTrain():
    return 'sales-train'

@app.route('/sales-explore')
def salesExplore():
    return 'sales-explore'

@app.route('/demo-jam')
def demoJam():
    return 'demo-jam'

@app.route('/ps-sme')
def psSme():
    return 'ps-sme'

@app.route('/ps-train')
def psTrain():
    return 'ps-train'

@app.route('/signin')
def signin():
    return 'signin'

@app.route('/demo-logins')
def demoLogins():
    return 'demo-logins'

@app.route('/csm-links')
def csmLinks():
    return 'csm-links'

@app.route('/csm-train')
def csmTrain():
    return 'csm-train'

@app.route('/feature1')
def feature1():
    return 'feature1'

@app.route('/feature2')
def feature2():
    return 'feature2'

if __name__ == '__main__':
    app.run(debug=True)
