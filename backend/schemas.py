from marshmallow import Schema, fields
from marshmallow.validate import Length


class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    first_name = fields.Str(required=True)
    last_name = fields.Str(required=True)
    birth_date = fields.Date(required=True)
    email = fields.Email(required=True)
    password = fields.Str(load_only=True, validate=Length(min=8))
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)


class UserUpdateSchema(UserSchema):
    pass