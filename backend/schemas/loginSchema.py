from marshmallow import Schema, fields
from marshmallow.validate import Length

class LoginSchema(Schema):
    email = fields.Email(required=True)
    password = fields.Str(required=True, load_only=True, validate=Length(min=8))