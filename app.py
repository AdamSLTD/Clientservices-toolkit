from flask import Flask, render_template, url_for

app = Flask(__name__)

@app.route('/') #done
def index():
    return render_template('index.html')

@app.route('/convoy') #done
def convoy():
    return render_template('convoy.html')

@app.route('/demo2') #not available
def demo2():
    return '404 Error'

@app.route('/demo3') #not available
def demo3():
    return '404 Error'

@app.route('/sales-links') #done
def salesLinks():
    return render_template('salesLinks.html')

@app.route('/sales-train') #WIP
def salesTrain():
    return render_template('salesTrain.html')

@app.route('/sales-explore') #WIP
def salesExplore():
    return render_template('salesExplore.html')

@app.route('/demo-jam') #not done
def demoJam():
    return render_template('demoJam.html')

@app.route('/demoeng-help') #not done
def demoengHelp():
    return render_template('demoengHelp.html')

@app.route('/demoeng-train') #not done
def demoengTrain():
    return render_template('demoengTrain.html')

@app.route('/demoeng-daily') #not done
def demoengDaily():
    return render_template('demoengDaily.html')

@app.route('/demoeng-weekly') #not done
def demoengWeekly():
    return render_template('demoengWeekly.html')

@app.route('/signin')
def signin():
    return 'signin'

@app.route('/demo-logins') #done
def demoLogins():
    return render_template('demoLogins.html')

@app.route('/inteng-help') #not done
def intengHelp():
    return render_template('intengHelp.html')

@app.route('/inteng-train') #not done
def intengTrain():
    return render_template('intengTrain.html')

@app.route('/inteng-tools') #not done
def intengTools():
    return render_template('intengTools.html')

@app.route('/feature1') #not done
def feature1():
    return 'feature1'

@app.route('/feature2') #not done
def feature2():
    return 'feature2'

if __name__ == '__main__':
    app.run(debug=True)
