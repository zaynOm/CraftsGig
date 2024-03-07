from flask_smorest import Blueprint
from flask.views import MethodView

from models.domain import Domain
from schemas.domainSchema import DomainSchema


blp = Blueprint('domains', __name__)


@blp.route('/domains')
class Domains(MethodView):

    @blp.response(200, DomainSchema(many=True))
    def get(self):
        return Domain.query.all()
