from db import db


class Domain(db.Model):
    __tablename__ = 'domains'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(60), nullable=False)
    workers = db.relationship('User', back_populates='domain')
