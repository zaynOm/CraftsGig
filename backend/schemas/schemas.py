""" from marshmallow import Schema, fields, validates_schema, ValidationError
from marshmallow.validate import Length, OneOf, Range


class DomainSchema(Schema):
    id = fields.Int(dump_only=True)
    title = fields.Str()


class BaseSchema(Schema):
    id = fields.Int(dump_only=True)
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)



class UserSchema(BaseSchema):
    class Meta:
        ordered = True

    first_name = fields.Str(required=True)
    last_name = fields.Str(required=True)
    birth_date = fields.Date(required=True)
    email = fields.Email(required=True)
    password = fields.Str(load_only=True, validate=Length(min=8))
    role = fields.Str(required=True, validate=OneOf(['user', 'worker']))
    domain_id = fields.Int()
    domain = fields.Nested(DomainSchema(), dump_only=True)
    experience = fields.Int(validate=Range(0, 100))

    @validates_schema
    def validate_worker_filds(self, data, **kwargs):
        
        if data.get('role') == 'worker':
            if not data.get('domain_id'):
                raise ValidationError('worker must have a domain')
            if not data.get('experience'):
                raise ValidationError('worker must specefier years of experience')


class CitySchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)



class GigSchema(BaseSchema):
    title = fields.Str(required=True)
    description = fields.Str(required=True)
    worker_id = fields.Int(required=True)
    worker = fields.Nested(UserSchema(), dump_only=True)
    city_id = fields.Int(required=True)
    city = fields.Nested(CitySchema(), dump_only=True)



class CityGigsSchema(CitySchema):
    gigs = fields.List(fields.Nested(GigSchema()), dump_only=True)


class FilterParamsSchema(Schema):
    search = fields.Str()
    city = fields.Str()
    domain = fields.Str()
    isAvailable = fields.Bool() """