from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

    from app.routes.routing import routing_bp
    from app.routes.hospitals import hospitals_bp
    from app.routes.traffic import traffic_bp

    app.register_blueprint(routing_bp, url_prefix="/api")
    app.register_blueprint(hospitals_bp, url_prefix="/api")
    app.register_blueprint(traffic_bp, url_prefix="/api")

    return app
