from flask_smorest import Blueprint, abort
from flask.views import MethodView

from models.city import City
from schemas.citySchema import CitySchema

blp = Blueprint('cities', __name__)


@blp.route('/cities')
class Cities(MethodView):

    @blp.response(200, CitySchema(many=True))
    def get(self):
        return City.query.all()
