from app import create_app
from app.models import db
from config import Env

env = Env.FLASK_ENV

app = create_app(env)

with app.app_context():
    db.create_all()
    