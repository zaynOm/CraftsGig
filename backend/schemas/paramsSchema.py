from marshmallow import Schema, fields


class FilterParamsSchema(Schema):
    search = fields.Str()
    city = fields.Str()
    domain = fields.Str()
    isAvailable = fields.Bool()