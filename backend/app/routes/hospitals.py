from flask import Blueprint, jsonify
from app.database.supabase_client import db

hospitals_bp = Blueprint('hospitals', __name__)

@hospitals_bp.route('/hospitals', methods=['GET'])
def get_hospitals():
    try:
        response = db.table('hospitals').select('*').gt('available_beds', 0).eq('is_active', True).execute()
        return jsonify(response.data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
