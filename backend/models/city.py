from db import db


class City(db.Model):
    __tablename__ = 'cities'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(60), nullable=False)
    gigs = db.relationship('Gig', back_populates='city')