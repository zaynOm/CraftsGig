from flask_smorest import Blueprint, abort
from flask.views import MethodView
from sqlalchemy.exc import SQLAlchemyError

from db import db
from models.review import Review
from schemas.reviewSchema import ReviewSchema
from utils.jwt_required_doc import jwt_required_with_doc


blp = Blueprint('reviews', __name__)


@blp.route('/reviews')
class Reviews(MethodView):

    @jwt_required_with_doc()
    @blp.arguments(ReviewSchema)
    @blp.response(201, ReviewSchema)
    def post(self, data):
        review = Review(**data)
        try:
            db.session.add(review)
            db.session.commit()
        except SQLAlchemyError as e:
            print(e)
            abort(400, message='Failed to create Review')
    
        return review