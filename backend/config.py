import os
from dotenv import load_dotenv
from datetime import timedelta

load_dotenv()


# we can provide this latter
#SECRET_KEY = os.environ.get('SECRET_KEY') or 'your-secret-key'
SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')


API_TITLE = 'CraftsMan'
API_VERSION = 'v1'
OPENAPI_VERSION = "3.0.2"
#SQLALCHEMY_DATABASE_URI = environ.get('DATABASE_URL')
OPENAPI_VERSION = "3.0.3"
OPENAPI_URL_PREFIX = "/"
OPENAPI_SWAGGER_UI_PATH = "/docs"
OPENAPI_SWAGGER_UI_URL = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"
JWT_SECRET_KEY = "test_key"
JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=30)