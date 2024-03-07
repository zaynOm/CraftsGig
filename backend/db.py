from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def init_db(app):
    db.init_app(app)

def create_tables(app):
    with app.app_context():
        import models
        db.create_all()

def teardown_db(app, e=None):
    db.drop_all()