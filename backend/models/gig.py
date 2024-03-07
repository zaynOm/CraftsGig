from models.baseModel import BaseModel

from db import db


class Gig(BaseModel, db.Model):
    __tablename__ = 'gigs'

    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    worker_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    worker = db.relationship('User', uselist=False)
    city_id = db.Column(db.Integer, db.ForeignKey('cities.id'), nullable=False)
    city = db.relationship('City', uselist=False, back_populates='gigs')
    reviews = db.relationship('Review', backref='gig')