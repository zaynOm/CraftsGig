from marshmallow import fields

from .baseSchema import BaseSchema
from .userSchema import UserSchema


class ReviewSchema(BaseSchema):
    comment = fields.Str(required=True)
    rating = fields.Int(required=True)
    gig_id = fields.Int(required=True)
    author_id = fields.Int(required=True)
    author = fields.Nested(UserSchema(), dump_only=True)
