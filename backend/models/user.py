from sqlalchemy.sql import func

from db import db


class BaseUserModel():
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(60), nullable=False)
    last_name = db.Column(db.String(60), nullable=False)
    birth_date = db.Column(db.DateTime(timezone=False), nullable=False) 
    email = db.Column(db.String(254), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now(), onupdate=func.now())

    def update(self, **kwargs):
        for key, value in kwargs.items():
            setattr(self, key, value)


class UserModel(BaseUserModel, db.Model):
    __tablename__ = 'users'


class CraftsmanModel(BaseUserModel, db.Model):
    __tablename__ = 'workers'

    phone = db.Column(db.String(10), nullable=False)
    experience = db.Column(db.Integer, nullable=False)
    available = db.Column(db.Boolean, default=True)
    domain_id = db.Column(db.Integer, db.ForeignKey('domains.id'), nullable=False)
