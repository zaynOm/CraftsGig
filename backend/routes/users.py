from flask_smorest import Blueprint
from flask.views import MethodView

from db import db
from models.user import User
from schemas.userSchema import UserSchema
from utils.jwt_required_doc import jwt_required_with_doc

blp = Blueprint('Users', __name__)


blp.openapi_sec_requires = [{"BearerAuth": []}]

#? This is for testing don't ship is in production 
@blp.route('/users')
class Users(MethodView):

    @jwt_required_with_doc()
    @blp.response(200, UserSchema(many=True))
    def get(self):
        return User.query.all()

@blp.route('/users/<int:user_id>')
class UserById(MethodView):

    @blp.response(200, UserSchema)
    def get(self, user_id):
        return User.query.get_or_404(user_id)
    
    @jwt_required_with_doc()
    @blp.arguments(UserSchema(partial=True))
    @blp.response(200, UserSchema)
    def put(self, user_data, user_id):
        user = User.query.get_or_404(user_id)

        user.update(**user_data)
        db.session.commit()
        return user
    
    @jwt_required_with_doc()
    def delete(self, user_id):
        user = User.query.get_or_404(user_id)
        db.session.delete(user)
        db.session.commit()
        return {'message': 'User was deleted'}, 200