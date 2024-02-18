from flask_smorest import Blueprint, abort
from flask.views import MethodView
from sqlalchemy.exc import SQLAlchemyError
from schemas import UserSchema, UserUpdateSchema

from db import db
from models.user import UserModel

blp = Blueprint('Users', __name__)

@blp.route('/users')
class Users(MethodView):

    @blp.response(200, UserSchema(many=True))
    def get(self):
        return UserModel.query.all()

    @blp.arguments(UserSchema)
    @blp.response(201, UserSchema)
    def post(self, user_data):
        user = UserModel(**user_data)
        try:
            db.session.add(user)
            db.session.commit()
        except SQLAlchemyError as e:
            print(e)    
            abort(400, message='Failed to create User')

        return user
        


@blp.route('/users/<string:user_id>')
class User(MethodView):

    @blp.response(200, UserSchema)
    def get(self, user_id):
        return UserModel.query.get_or_404(user_id)
    
    @blp.arguments(UserUpdateSchema(partial=True))
    @blp.response(200, UserSchema)
    def put(self, user_data, user_id):
        user = UserModel.query.get_or_404(user_id)

        user.update(**user_data)
        db.session.commit()
        return user
    
    def delete(self, user_id):
        user = UserModel.query.get_or_404(user_id)
        db.session.delete(user)
        db.session.commit()
        return {'message': 'User was deleted'}, 200