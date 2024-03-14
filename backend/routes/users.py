from flask_smorest import Blueprint
from flask.views import MethodView

from db import db
from models.user import User
from models.gig import Gig
from schemas.userSchema import UserSchema, WorkerSchema
from schemas.gigSchema import PlainGigSchema
from utils.jwt_required_doc import jwt_required_with_doc

blp = Blueprint('Users', __name__)


#? This is for testing don't ship is in production 
@blp.route('/users')
class Users(MethodView):

    @blp.response(200)
    def get(self):
        users = User.query.all()
        results = []
        for user in users:
            if user.role == 'user':
                results.append(UserSchema().dump(user))
            else:
                results.append(WorkerSchema().dump(user))
        return results


@blp.route('/users/<int:user_id>')
class UserById(MethodView):

    @blp.response(200)
    def get(self, user_id):
        user = User.query.get_or_404(user_id)
        if user.role == 'user':
            return UserSchema().dump(user)

        return WorkerSchema().dump(user)
    
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
    
@blp.route('/users/<int:user_id>/gigs')
class UserGigs(MethodView):

    @blp.response(200, PlainGigSchema(many=True))
    def get(self, user_id):
        return Gig.query.filter_by(worker_id=user_id).all()