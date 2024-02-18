from dotenv import load_dotenv
from flask import Flask
from flask_smorest import Api
from flask_migrate import Migrate

from db import create_tables, db, init_db
from routes.users import blp as UserBlueprint

load_dotenv()

def create_app():

    app = Flask(__name__)
    app.config['API_TITLE'] = 'CraftsMan'
    app.config['API_VERSION'] = 'v1'
    app.config["OPENAPI_VERSION"] = "3.0.2"
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///data.db"
    init_db(app)
    migrate = Migrate(app, db)
    api = Api(app)

    create_tables(app)

    # register Blueprints here
    api.register_blueprint(UserBlueprint)


    return app
