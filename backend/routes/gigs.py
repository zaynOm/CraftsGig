from flask_smorest import Blueprint, abort
from flask.views import MethodView
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import and_

from db import db
from models.gig import Gig
from models.city import City
from models.user import User
from schemas.gigSchema import GigSchema, GigReviewsSchema
from schemas.paramsSchema import FilterParamsSchema
from utils.jwt_required_doc import jwt_required_with_doc

blp = Blueprint('gigs', __name__)


@blp.route('/gigs')
class Gigs(MethodView):


    @blp.arguments(FilterParamsSchema, location='query', as_kwargs=True)
    @blp.response(200, GigSchema(many=True))

    def get(search=None, city=None, domain=None, isAvailable=None):
        query = Gig.query
        if city:
            query = query.filter_by(city_id=city)
        if domain:
            query = query.join(User).filter_by(domain_id=domain)
        if isAvailable is not None:
            query = query.join(User).filter_by(available=isAvailable)

        if query.count() == 0:
            return []
        
        return query.all()

    
    @jwt_required_with_doc()
    @blp.arguments(GigSchema)
    @blp.response(201, GigSchema)
    def post(self, gig_data):
        gig = Gig(**gig_data)
        try:
            db.session.add(gig)
            db.session.commit()
        except SQLAlchemyError as e:
            print(e)    
            abort(400, message='Failed to create Gig')

        return gig
    

@blp.route('/gigs/<int:gig_id>')
class GigById(MethodView):

    @blp.response(200, GigReviewsSchema)
    def get(self, gig_id):
        return Gig.query.get_or_404(gig_id)
    
    @jwt_required_with_doc()
    @blp.arguments(GigSchema(partial=True))
    @blp.response(200, GigSchema)
    def put(self, gig_data, gig_id):
        try:
            Gig.query.filter_by(id=gig_id).update(**gig_data)
        except SQLAlchemyError:
            abort(404, message='Failed to update the gig')


    @jwt_required_with_doc()
    def delete(self, gig_id):
        gig = Gig.query.get_or_404(gig_id)
        db.session.delete(gig)
        db.session.commit()
        return {"message": 'Gig deleted succeessfuly'}
        
        

