from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


class Tarefa(db.Model):
    _tablename_ = 'tarefas'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(120))
    completion_date = db.Column(db.DateTime)
    priority = db.Column(db.Boolean)  


@app.route('/criar_tarefa', methods=['POST'])
def criar_nova_tarefa():
    task = request.json
  
    title = task.get('title')
    description = task.get('description')
    completion_date = datetime.strptime(task.get('completion_date'), '%Y-%m-%d')
    priority = bool(request.form.get('priority'))

    nova_tarefa = Tarefa(title=title, description=description, completion_date=completion_date, priority=priority)
    db.session.add(nova_tarefa)
    db.session.commit()
    return "ok"

@app.route('/')
def hello_world():
    return 'ola mundo'

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    CORS(app)
    app.run(debug=True)