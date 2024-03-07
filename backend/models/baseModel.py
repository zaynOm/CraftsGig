from sqlalchemy.sql import func
from db import db



class BaseModel():

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now(), onupdate=func.now())