from flask import Flask, jsonify
from flask_smorest import Api
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from os import environ
from dotenv import load_dotenv

from db import create_tables, db, init_db
from routes.users import blp as UserBlueprint
from routes.gigs import blp as GigBlueprint
from routes.cities import blp as CityBlueprint
from routes.domains import blp as DomainBlueprint
from routes.reviews import blp as ReviewBlueprint
from routes.search_filter import blp as FilterBlueprint
from routes.auth import blp as AuthBlueprint

load_dotenv()

def create_app():

    app = Flask(__name__)
    app.config['API_TITLE'] = 'CraftsMan'
    app.config['API_VERSION'] = 'v1'
    app.config["OPENAPI_VERSION"] = "3.0.2"
    app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('DATABASE_URL')

    app.config["OPENAPI_VERSION"] = "3.0.3"
    app.config["OPENAPI_URL_PREFIX"] = "/"
    app.config["OPENAPI_SWAGGER_UI_PATH"] = "/docs"
    app.config["OPENAPI_SWAGGER_UI_URL"] = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"

    app.config["JWT_SECRET_KEY"] = "test_key"
    

    app.json.sort_keys = False
    CORS(app, resources={r"/*": {"origins": "*"}})
    init_db(app)
    migrate = Migrate(app, db)
    api = Api(app)
    jwt = JWTManager(app)

    api.spec.components.security_scheme(
    "bearerAuth", {"type":"http", "scheme": "bearer", "bearerFormat": "JWT"}
    )
    #api.spec.options["security"] = [{"bearerAuth": []}]
    
    # @jwt.additional_claims_loader
    # def add_claims_to_jwt(identity):
    #     # TODO: Read from a config file instead of hard-coding
    #     if identity == 1:
    #         return {"is_admin": True}
    #     return {"is_admin": False}


    # @jwt.expired_token_loader
    # def expired_token_callback(jwt_header, jwt_payload):
    #     return jsonify({"message": "The token has expired.", "error": "token_expired"}), 401


    # @jwt.invalid_token_loader
    # def invalid_token_callback(error):
    #     return (
    #         jsonify(
    #             {"message": "Signature verification failed.", "error": "invalid_token"}
    #         ),
    #         401,
    #     )


    # @jwt.unauthorized_loader
    # def missing_token_callback(error):
    #     return (
    #         jsonify(
    #             {
    #                 "description": "Request does not contain an access token.",
    #                 "error": "authorization_required",
    #             }
    #         ),
    #         401,
    #     )


    # @jwt.needs_fresh_token_loader
    # def token_not_fresh_callback(jwt_header, jwt_payload):
    #     return (
    #         jsonify(
    #             {"description": "The token is not fresh.", "error": "fresh_token_required"}
    #         ),
    #         401,
    #     )


    # @jwt.revoked_token_loader
    # def revoked_token_callback(jwt_header, jwt_payload):
    #     return (
    #         jsonify(
    #             {"description": "The token has been revoked.", "error": "token_revoked"}
    #         ),
    #         401,
    #     )

    create_tables(app)

    # register Blueprints here
    api.register_blueprint(AuthBlueprint)
    api.register_blueprint(UserBlueprint)
    api.register_blueprint(GigBlueprint)
    api.register_blueprint(CityBlueprint)
    api.register_blueprint(DomainBlueprint)
    api.register_blueprint(ReviewBlueprint)
    api.register_blueprint(FilterBlueprint)



    return app
