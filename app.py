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

@app.route('/sales-org')
def salesOrg():
    return 'sales-org'

@app.route('/sales-wiki')
def salesWiki():
    return 'sales-wiki'

@app.route('/ps-org')
def psOrg():
    return 'ps-org'

@app.route('/ps-wiki')
def psWiki():
    return 'ps-wiki'

@app.route('/signin')
def signin():
    return 'signin'

@app.route('/feature1')
def feature1():
    return 'feature1'

@app.route('/feature2')
def feature2():
    return 'feature2'

if __name__ == '__main__':
    app.run(debug=True)
