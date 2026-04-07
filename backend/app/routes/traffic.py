from flask import Blueprint, jsonify
import threading
import time
import random
from app.database.supabase_client import db

traffic_bp = Blueprint('traffic', __name__)

def update_traffic():
    while True:
        try:
            edges_response = db.table('edges').select('id').execute()
            edges = edges_response.data
            for edge in edges:
                new_multiplier = round(random.uniform(1.0, 3.0), 2)
                db.table('edges').update({"traffic_multiplier": new_multiplier}).eq('id', edge['id']).execute()
            time.sleep(60)
        except Exception as e:
            print("Traffic update error:", e)
            time.sleep(60)

# Start background thread
traffic_thread = threading.Thread(target=update_traffic, daemon=True)
traffic_thread.start()

@traffic_bp.route('/traffic', methods=['GET'])
def get_traffic():
    try:
        response = db.table('edges').select('id, traffic_multiplier').execute()
        return jsonify(response.data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
