from flask import Flask
from flask_smorest import Api
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from db import create_tables, db, init_db
from routes.users import blp as UserBlueprint
from routes.gigs import blp as GigBlueprint
from routes.cities import blp as CityBlueprint
from routes.domains import blp as DomainBlueprint
from routes.reviews import blp as ReviewBlueprint
from routes.search_filter import blp as FilterBlueprint
from routes.auth import blp as AuthBlueprint



app = Flask(__name__)

app.config.from_object('config')



app.json.sort_keys = False
CORS(app, resources={r"/*": {"origins": "*"}})
init_db(app)
migrate = Migrate(app, db)
api = Api(app)
jwt = JWTManager(app)

api.spec.components.security_scheme(
"bearerAuth", {"type":"http", "scheme": "bearer", "bearerFormat": "JWT"}
)

create_tables(app)

# register Blueprints here
api.register_blueprint(AuthBlueprint)
api.register_blueprint(UserBlueprint)
api.register_blueprint(GigBlueprint)
api.register_blueprint(CityBlueprint)
api.register_blueprint(DomainBlueprint)
api.register_blueprint(ReviewBlueprint)
api.register_blueprint(FilterBlueprint)
