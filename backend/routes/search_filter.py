from flask_smorest import Blueprint, abort
from sqlalchemy import and_

from schemas.paramsSchema import FilterParamsSchema
from schemas.gigSchema import GigSchema
from models.gig import Gig
from models.user import User


blp = Blueprint('filter', __name__)

@blp.get('/search_filter')
@blp.arguments(FilterParamsSchema, location='query', as_kwargs=True)
@blp.response(200, GigSchema(many=True))
def filter(search=None, city=None, domain=None, isAvailable=None):
    filters = []

    if search:
        filters.append(Gig.title.ilike(f'%{search}%'))
    if city:
        filters.append(Gig.city_id == city)
    if domain:
        filters.append(User.domain_id == domain)
    if isAvailable is not None:
        filters.append(User.available == isAvailable)

    gigs = Gig.query.join(User).filter(and_(*filters)).all()

    return gigs


    """ query = Gig.query

    if city:
        query = query.filter_by(city_id=city)
    if domain:
        query = query.join(User).filter_by(domain_id=domain)
    if isAvailable is not None:
        query = query.join(User).filter_by(available=isAvailable)

    if query.count() == 0:
        return []
    
    return query.all() """