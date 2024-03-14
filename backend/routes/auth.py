from flask_smorest import Blueprint, abort
from flask import jsonify, request
from sqlalchemy.exc import SQLAlchemyError
from passlib.hash import pbkdf2_sha256
from flask_jwt_extended import (create_access_token, 
                                set_access_cookies,
                                unset_jwt_cookies
                                )

from db import db
from models.user import User
from schemas.authSchema import LoginSchema
from schemas.userSchema import UserSchema, WorkerSchema
from utils.jwt_required_doc import jwt_required_with_doc


blp = Blueprint('auth', __name__)


@blp.post('/register')
def register():
    user_data = request.get_json()
    if user_data.get('role') == 'user':
        user_data = UserSchema().load(user_data)
    else:
        user_data = WorkerSchema().load(user_data)

    hashed_pw = pbkdf2_sha256.hash(user_data.get('password'))
    user_data['password'] = hashed_pw
    user = User(**user_data)
    try:
        db.session.add(user)
        db.session.commit()
    except SQLAlchemyError as e:
        print(e)
        abort(400, message='Failed to create User', exc=e)

    return {'message': 'Registered successful'}


# TODO: the token should be stored in the cookie
@blp.post('/login')
@blp.arguments(LoginSchema, as_kwargs=True)
def login(email=None, password=None):
    user = User.query.filter_by(email=email).first()
    
    if user and pbkdf2_sha256.verify(password, user.password):
        #response = jsonify({"msg": "login successful"})
        access_token = create_access_token(identity=user.id)
        #set_access_cookies(response, access_token)
        return {"access_token": access_token}
    
    abort(401, message="Invalid credentials.")


@jwt_required_with_doc()
@blp.post('/logout')
def logout():
    response = jsonify({"message": "logout successful"})
    #unset_jwt_cookies(response)
    return response