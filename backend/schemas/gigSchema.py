from marshmallow import fields

from .baseSchema import BaseSchema
from .userSchema import WorkerSchema
from .citySchema import CitySchema
from .reviewSchema import ReviewSchema


class GigSchema(BaseSchema):
    title = fields.Str(required=True)
    description = fields.Str(required=True)
    worker_id = fields.Int(required=True)
    worker = fields.Nested(WorkerSchema(), dump_only=True)
    city_id = fields.Int(required=True)
    city = fields.Nested(CitySchema(), dump_only=True)


class CityGigsSchema(CitySchema):
    gigs = fields.List(fields.Nested(GigSchema()), dump_only=True)


class GigReviewsSchema(GigSchema):
    reviews = fields.List(fields.Nested(ReviewSchema()))
