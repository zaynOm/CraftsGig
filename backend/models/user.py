from models.baseModel import BaseModel

from db import db


class User(BaseModel, db.Model):
    __tablename__ = 'users'

    first_name = db.Column(db.String(60), nullable=False)
    last_name = db.Column(db.String(60), nullable=False)
    birth_date = db.Column(db.DateTime(timezone=False), nullable=False) 
    email = db.Column(db.String(254), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    reviews = db.relationship('Review', back_populates='author', lazy=True)

    role = db.Column(db.String(10), nullable=False)

    phone = db.Column(db.String(10), nullable=True)
    experience = db.Column(db.Integer, nullable=True)
    available = db.Column(db.Boolean, default=True)
    domain_id = db.Column(db.Integer, db.ForeignKey('domains.id'), nullable=True)
    domain = db.relationship('Domain', uselist=False, back_populates='workers')

    def update(self, **kwargs):
        for key, value in kwargs.items():
            setattr(self, key, value)
