from marshmallow import Schema, fields


class DomainSchema(Schema):
    id = fields.Int(dump_only=True)
    title = fields.Str()