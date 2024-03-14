from . import *

from .baseSchema import BaseSchema
from .domainSchema import DomainSchema



class UserSchema(BaseSchema):
    class Meta:
        ordered = True

    first_name = fields.Str(required=True)
    last_name = fields.Str(required=True)
    birth_date = fields.Date(required=True)
    email = fields.Email(required=True)
    password = fields.Str(required=True, load_only=True, validate=Length(min=8))
    role = fields.Str(required=True, validate=OneOf(['user', 'worker']))




class WorkerSchema(UserSchema):
    available = fields.Bool()
    phone = fields.Str()
    experience = fields.Int(validate=Range(0, 100))
    domain_id = fields.Int()
    domain = fields.Nested(DomainSchema(), dump_only=True)



    # @validates_schema
    # def validate_worker_filds(self, data, **kwargs):
        
    #     if data.get('role') == 'worker':
    #         if not data.get('domain_id'):
    #             raise ValidationError('worker must have a domain')
    #         if not data.get('experience'):
    #             raise ValidationError('worker must specefier years of experience')