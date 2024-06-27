from flask import Flask, request, jsonify, g
from flask_bcrypt import Bcrypt, check_password_hash
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta, datetime
import json
import mysql.connector

app = Flask(__name__)
bcrypt = Bcrypt(app)
CORS(app)

app.config['JWT_SECRET_KEY'] = '2010 earthquake, I overslept.'
jwt = JWTManager(app)


def get_db():
    if 'db' not in g:
        g.db = mysql.connector.connect(
            host='localhost',
            user='root',
            password='',
            database='SmartPort'
        )
    return g.db

@app.teardown_appcontext
def close_db(exception):
    db = g.pop('db', None)
    if db is not None:
        db.close()

@app.before_request
def before_request():
    clean_expired_sessions()

def clean_expired_sessions():
    db = get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM sesiones WHERE fecha_expiracion < NOW()")
    db.commit()
    cursor.close()

@app.route('/usuarios', methods=['GET'])
def get_users():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT email, userName, namePerson, rut, isAdmin, isBusiness, isSuscribed FROM Usuario")
    users = cursor.fetchall()
    cursor.close()
    return jsonify(users), 200

@app.route('/<string:email>', methods=['GET'])
def get_user(email):
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT email, userName, namePerson, rut, isAdmin, isBusiness, isSuscribed, password FROM Usuario WHERE email = %s", (email,))
    user = cursor.fetchone()
    cursor.close()
    if user:
        return jsonify(user), 200
    else:
        return jsonify({"error": "Usuario no encontrado"}), 404
    

@app.route('/new-usuario', methods=['POST'])
def post_user():
    data = request.json
    email = data['email']
    userName = data['userName']
    namePerson = data['namePerson']
    if(data.get('rut')):
        rut = data.get('rut')
    else:
        rut = None
    password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    isAdmin = data.get('isAdmin', 0)
    isBusiness = data.get('isBusiness', 0)
    isSuscribed = data.get('isSuscribed', 0)
    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("INSERT INTO Usuario (email, userName, namePerson, password, isAdmin, isBusiness, isSuscribed, rut) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
                    (email, userName, namePerson, password, isAdmin, isBusiness, isSuscribed, rut))
        db.commit()
        cursor.close()
        return jsonify({"status": "Usuario creado exitosamente"}), 201
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 400

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data['email']
    password = data['password']

    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT email, password FROM Usuario WHERE email = %s", (email,))
    user = cursor.fetchone()
    cursor.close()

    if user and check_password_hash(user['password'], password):
        expires_delta = timedelta(hours=1)
        access_token = create_access_token(identity=email, expires_delta=expires_delta)

        cursor = db.cursor()
        fecha_expiracion = datetime.utcnow() + expires_delta
        cursor.execute("INSERT INTO sesiones (email, token, fecha_expiracion) VALUES (%s, %s, %s)",
                    (email, access_token, fecha_expiracion))
        db.commit()
        cursor.close()

        return jsonify(access_token=access_token), 200
    else:
        return jsonify({"error": "Credenciales inválidas"}), 401

@app.route('/logout', methods=['POST'])
@jwt_required() 
def logout():
    current_user = get_jwt_identity()
    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("DELETE FROM sesiones WHERE email = %s", (current_user,))
        db.commit()
        cursor.close()
        return jsonify({"message": "Logout exitoso"}), 200
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 400

@app.route('/current-usuario', methods=['GET'])
@jwt_required()
def get_current_user():
    current_user = get_jwt_identity()
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT email, userName, namePerson, rut, isAdmin, isBusiness, isSuscribed FROM Usuario WHERE email = %s", (current_user,))
    user = cursor.fetchone()
    cursor.close()

    if user:
        return jsonify(user), 200
    else:
        return jsonify({"error": "Usuario no encontrado"}), 404
    
@app.route('/change-password', methods=['PUT'])
@jwt_required()
def change_password():
    current_user = get_jwt_identity()

    data = request.json
    new_password = data.get('new_password')

    if not new_password:
        return jsonify({"error": "Se requiere proporcionar la nueva contraseña"}), 400

    hashed_password = bcrypt.generate_password_hash(new_password).decode('utf-8')

    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("UPDATE Usuario SET password = %s WHERE email = %s", (hashed_password, current_user))
        db.commit()
        cursor.close()
        return jsonify({"status": "Contraseña cambiada exitosamente"}), 200
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 400
    
@app.route('/update', methods=['PUT'])
@jwt_required()
def put_user():
    current_user = get_jwt_identity()

    data = request.json
    userName = data.get('userName')
    namePerson = data.get('namePerson')
    rut = data.get('rut')
    isAdmin = data.get('isAdmin', 0)
    isBusiness = data.get('isBusiness', 0)
    isSuscribed = data.get('isSuscribed', 0)

    db = get_db()
    cursor = db.cursor()
    try:
        if userName:
            cursor.execute("UPDATE Usuario SET userName = %s WHERE email = %s", (userName, current_user))
        if namePerson:
            cursor.execute("UPDATE Usuario SET namePerson = %s WHERE email = %s", (namePerson, current_user))
        if rut:
            cursor.execute("UPDATE Usuario SET rut = %s WHERE email = %s", (rut, current_user))
        if isAdmin is not None:
            cursor.execute("UPDATE Usuario SET isAdmin = %s WHERE email = %s", (isAdmin, current_user))
        if isBusiness is not None:
            cursor.execute("UPDATE Usuario SET isBusiness = %s WHERE email = %s", (isBusiness, current_user))
        if isSuscribed is not None:
            cursor.execute("UPDATE Usuario SET isSuscribed = %s WHERE email = %s", (isSuscribed, current_user))
        db.commit()
        cursor.close()
        return jsonify({"status": "Usuario actualizado exitosamente"}), 200
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 400

@app.route('/eliminar/distinct-user', methods=['DELETE'])
@jwt_required()
def delete_distinct_user():
    current_user = get_jwt_identity()
    data = request.json
    email = data.get('email')

    if current_user == email:
        return jsonify({"error": "No permitido."}), 403

    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("DELETE FROM usuario WHERE email = %s", (email,))
        db.commit()
        cursor.close()
        return jsonify({"status": "Usuario eliminado exitosamente"}), 200
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 400

@app.route('/eliminar/current-user', methods=['DELETE'])
@jwt_required()
def delete_current_user():
    current_user = get_jwt_identity()

    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("DELETE FROM usuario WHERE email = %s", (current_user,))
        db.commit()
        cursor.close()
        return jsonify({"status": "Usuario eliminado exitosamente"}), 200
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 400

if __name__ == '__main__':
    app.run(debug=True)