from db import db
from models.baseModel import BaseModel

 # TODO: Make the author_id unique, so each user can have only one review for a gig

class Review(BaseModel, db.Model):
    __tablename__ = 'reviews'
    comment = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    gig_id = db.Column(db.Integer, db.ForeignKey('gigs.id'), nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    author = db.relationship('User', back_populates='reviews')