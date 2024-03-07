from marshmallow import Schema, fields


class CitySchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
