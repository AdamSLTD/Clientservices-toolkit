from flask import Flask, render_template, url_for

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/convoy')
def convoy():
    return render_template('convoy.html')

@app.route('/demo2')
def demo2():
    return '404 Error'

@app.route('/demo3')
def demo3():
    return '404 Error'

@app.route('/sales-links')
def salesLinks():
    return render_template('salesLinks.html')

@app.route('/sales-train')
def salesTrain():
    return 'sales-train'

@app.route('/sales-explore')
def salesExplore():
    return render_template('salesExplore.html')

@app.route('/demo-jam')
def demoJam():
    return render_template('demoJam.html')

@app.route('/demoeng-help')
def demoengHelp():
    return render_template('demoeng-help.html')

@app.route('/demoeng-train')
def demoengTrain():
    return render_template('demoeng-train.html')

@app.route('/demoeng-daily')
def demoengDaily():
    return render_template('demoeng-daily.html')

@app.route('/demoeng-weekly')
def demoengWeekly():
    return render_template('demoeng-weekly.html')

@app.route('/signin')
def signin():
    return 'signin'

@app.route('/demo-logins')
def demoLogins():
    return render_template('demoLogins.html')

@app.route('/inteng-help')
def intengHelp():
    return render_template('intengHelp.html')

@app.route('/inteng-train')
def intengTrain():
    return render_template('intengTrain.html')

@app.route('/inteng-tools')
def intengTools():
    return render_template('intengTools.html')

@app.route('/feature1')
def feature1():
    return 'feature1'

@app.route('/feature2')
def feature2():
    return 'feature2'

if __name__ == '__main__':
    app.run(debug=True)
