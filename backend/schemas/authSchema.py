from marshmallow import Schema, fields
from marshmallow.validate import Length, Range, OneOf

from schemas.baseSchema import BaseSchema
from schemas.domainSchema import DomainSchema

# Todo: move the 
# class UserRegisterSchema(BaseSchema):
#     first_name = fields.Str(required=True)
#     last_name = fields.Str(required=True)
#     birth_date = fields.Date(required=True)
#     email = fields.Email(required=True)
#     password = fields.Str(load_only=True, validate=Length(min=8))
#     role = fields.Str(required=True, validate=OneOf(['user', 'worker']))


# class WorkerRegisterSchema(UserRegisterSchema):
#     experience = fields.Int(validate=Range(0, 100))
#     available = fields.Bool()
#     domain_id = fields.Int()
#     domain = fields.Nested(DomainSchema(), dump_only=True)


class LoginSchema(Schema):
    email = fields.Email(required=True)
    password = fields.Str(required=True, load_only=True, validate=Length(min=8))