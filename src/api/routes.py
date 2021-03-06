"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, current_app
from api.models import Administrator, Cinema, Movie, Schedule, Ticket, db, User, Snack
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired
import mercadopago
from itsdangerous import URLSafeTimedSerializer, SignatureExpired
from flask_mail import Message
from werkzeug.security import generate_password_hash, check_password_hash
import os



api = Blueprint('api', __name__)

s = URLSafeTimedSerializer('cinema')

@api.route("/user/login", methods=["POST"])
def login():
    body = request.get_json()
    user = User.query.filter_by(email=body['email']).first()
    
    if user is None:
        return jsonify({"msg":"email does not exist"})

    password = body['password']
    hashed = user.password

    if user is None:
        return jsonify({"msg":"Email does not exist"})

    if check_password_hash(hashed, password) != True:
        return jsonify({"msg": "Wrong password"}), 401

    if user.is_active == True:
        access_token = create_access_token(identity=user.id)
        return jsonify({ "token": access_token, "user_id": user.id, "email": user.email,"rol":"user", "name":user.name, "surname": user.surname, "phone": user.phone, "date_of_birth": user.date_of_birth  })
    else:
        return jsonify({"msg": "account not verified"})

@api.route("/recover", methods=['POST'])
def recover_password():
    email = request.json.get("email", None)

    user = User.query.filter_by(email=email).first()

    if user is None:
         return jsonify({"msg": "wrong email"}), 401
    
    if user:
        tokenUser = s.dumps([email], salt='emailconfirm')
        link = f"https://cinema-app-2022-sromero.herokuapp.com/resetpassword/{tokenUser}"
        msg = Message()
        msg.subject = "Recover your password"
        msg.recipients = [email]
        msg.sender = "cinemaapp2022@gmail.com"
        msg.html = f'<h3>To recover your password click <a href={link}>here</a></h3>'
        current_app.mail.send(msg)
        return jsonify({ "msg": "email sent"  }), 200

@api.route("/resetpassword", methods=['PUT'])
def reset_password(): 
    token = request.json.get("token", None)
    new_password = request.json.get("new_password", None)
    user = s.loads(token, salt='emailconfirm')
    email = user[0]

    user = User.query.filter_by(email=email).first()


    if user:
        hashed = generate_password_hash(new_password)
        user.password = hashed
        db.session.commit()
        return jsonify({ "msg": "password changed"  }), 200


@api.route('/user/signup', methods=['POST'])
def add_new_usuario():
    body = request.get_json()
    exist = User.query.filter_by(email=body['email']).first()
    if body is None:
        return APIException("You need to specify the request body as a json object", status_code=400)
    if exist:
        return jsonify({ "msg": "email alredy exists"  }), 400

    password = body['password']
    hashed = generate_password_hash(password)

    user = User(name=body['name'], surname=body['surname'], email=body['email'], password=hashed, date_of_birth=body['date_of_birth'], phone=body['phone'], is_active=body['is_active'])
    db.session.add(user)
    db.session.commit()

    
    tokenUser = s.dumps(body['email'], salt='emailconfirm')
    link = f"https://cinema-app-2022-sromero.herokuapp.com/verified/{tokenUser}"
    msg = Message()
    msg.subject = "Verify your account"
    msg.recipients = body['email'].split()
    msg.sender = "cinemaapp2022@gmail.com"
    msg.html = f'<h3>Verify your account clicking <a href={link}>here</a></h3>'
    current_app.mail.send(msg)

    return jsonify({ "msg": "account created"  }), 200

@api.route("/verify", methods=['PUT'])
def verify_account(): 
    token = request.json.get("token", None)
    user = s.loads(token, salt='emailconfirm')
    email = user
    user = User.query.filter_by(email=email).first()

    if user:
        user.is_active = True
        db.session.commit()
    

    return jsonify({ "msg": "account verified"  }), 200

@api.route('/user', methods=['GET'])
def get_users():
    user = User.query.all()
    all_users = list(map(lambda x: x.serialize(), user))

    return jsonify(all_users), 200

@api.route('/movie', methods=['GET'])
def get_movie():
    movie = Movie.query.all()
    all_movies = list(map(lambda x: x.serialize(), movie))

    return jsonify(all_movies), 200

@api.route('/schedule', methods=['GET'])
def get_schedule():
    schedule = Schedule.query.all()
    all_schedules = list(map(lambda x: x.serialize(), schedule))

    return jsonify(all_schedules), 200

@api.route('/cinema', methods=['GET'])
def get_cinema():
    cinema = Cinema.query.all()
    all_cinemas = list(map(lambda x: x.serialize(), cinema))

    return jsonify(all_cinemas), 200

@api.route('/ticket', methods=['GET'])
def get_ticket():
    ticket = Ticket.query.all()
    all_tickets = list(map(lambda x: x.serialize(), ticket))

    return jsonify(all_tickets), 200

@api.route('/snack', methods=['GET'])
def get_snack():
    snack = Snack.query.all()
    all_snacks = list(map(lambda x: x.serialize(), snack))

    return jsonify(all_snacks), 200

@api.route("/user/<email>", methods=["GET"])
@jwt_required()
def get_user(email):
    logged_user = get_jwt_identity()
    actual_user = User.query.filter_by(id=logged_user, email=email).first()
    user = actual_user.serialize()
    return user, 200


@api.route('/movie', methods=['POST'])
@jwt_required()
def add_new_movie():
    body = request.get_json()
    if body is None:
        raise APIException("You need to specify the request body as a json object", status_code=400)
    if 'name' not in body:
        raise APIException('You need to specify the name', status_code=400)
    if 'synopsis' not in body:
        raise APIException('You need to specify synopsis', status_code=400)
    if 'genre' not in body:
        raise APIException('You need to specify genre', status_code=400)
    if 'release_date' not in body:
        raise APIException('You need to specify release_date', status_code=400)
    if 'duration' not in body:
        raise APIException('You need to specify duration', status_code=400)
    if 'director' not in body:
        raise APIException('You need to specify director', status_code=400)


    movie = Movie(name=body['name'], synopsis=body['synopsis'], genre=body['genre'], release_date=body['release_date'], duration=body['duration'], director=body['director'], poster=body['poster'])
    db.session.add(movie)
    db.session.commit()
    movie = Movie.query.all()
    all_movies = list(map(lambda x: x.serialize(), movie))

    return jsonify(all_movies), 200

@api.route('/cinema', methods=['POST'])
@jwt_required()
def add_new_cinema():
    body = request.get_json()
    if body is None:
        raise APIException("You need to specify the request body as a json object", status_code=400)
    if 'location' not in body:
        raise APIException('You need to specify the location', status_code=400)
    if 'latitud' not in body:
        raise APIException('You need to specify the latitud', status_code=400)
    if 'longitud' not in body:
        raise APIException('You need to specify the longitud', status_code=400)
    if 'id_movie' not in body:
        raise APIException('You need to specify the id_movie', status_code=400)

                               
    cinema = Cinema(location=body['location'],latitud=body['latitud'],longitud=body['longitud'],id_movie=body['id_movie'],)
    db.session.add(cinema)
    db.session.commit()

    cinema = Cinema.query.all()
    all_cinemas = list(map(lambda x: x.serialize(), cinema))

    return jsonify(all_cinemas), 200

@api.route('/schedule', methods=['POST'])
@jwt_required()
def add_new_schedule():
    body = request.get_json()
    if body is None:
        raise APIException("You need to specify the request body as a json object", status_code=400)
    if 'id_movie' not in body:
        raise APIException('You need to specify the id_movie', status_code=400)
    if 'id_cinema' not in body:
        raise APIException('You need to specify the id_cinema', status_code=400)
    if 'date' not in body:
        raise APIException('You need to specify the date', status_code=400)
    if 'hour' not in body:
        raise APIException('You need to specify the hour', status_code=400) 
                                         
    schedule = Schedule(id_movie=body['id_movie'], id_cinema=body['id_cinema'], date=body['date'], hour=body['hour'])
    db.session.add(schedule)
    db.session.commit()

    schedule = Schedule.query.all()
    all_schedules = list(map(lambda x: x.serialize(), schedule))

    return jsonify(all_schedules), 200


@api.route('/ticket', methods=['POST'])
@jwt_required()
def add_new_ticket():
    body = request.get_json()
    if body is None:
        raise APIException("You need to specify the request body as a json object", status_code=400)
    if 'id_movie' not in body:
        raise APIException('You need to specify the id_movie', status_code=400)
    if 'hour' not in body:
        raise APIException('You need to specify the hour', status_code=400)
    if 'date' not in body:
        raise APIException('You need to specify the date', status_code=400)
    if 'cinema' not in body:
        raise APIException('You need to specify the cinema', status_code=400)
    if 'id_user' not in body:
        raise APIException('You need to specify the id_user', status_code=400)  
    if 'code' not in body:
        raise APIException('You need to specify the code', status_code=400)  
    if 'seat' not in body:
        raise APIException('You need to specify the seat', status_code=400)  

    seats = body['seat']
    seats = ','.join([str(elem) for elem in seats])
    
    ticket = Ticket(id_movie=body['id_movie'], type=body["type"], hour=body['hour'], date=body['date'], cinema=body['cinema'], id_user=body['id_user'], code=body['code'], seat=seats, id_schedule = body['id_schedule'])
    db.session.add(ticket)
    db.session.commit()

    ticket = Ticket.query.all()
    all_tickets = list(map(lambda x: x.serialize(), ticket))
    return jsonify(all_tickets), 200

@api.route('/snack', methods=['POST'])
@jwt_required()
def add_snack():
    body = request.get_json()
    if body is None:
        raise APIException("You need to specify the request body as a json object", status_code=400)
    if 'id_user' not in body:
        raise APIException('You need to specify the id_user', status_code=400)
    if 'id_ticket' not in body:
        raise APIException('You need to specify the id_ticket', status_code=400)
    if 'snack' not in body:
        raise APIException('You need to specify the snack', status_code=400)
    if 'quantity' not in body:
        raise APIException('You need to specify the quantity', status_code=400)
    
    snack = Snack(id_user=body['id_user'], id_ticket=body["id_ticket"], snack=body['snack'], quantity=body['quantity'])
    db.session.add(snack)
    db.session.commit()

    snacks = Snack.query.all()
    all_snacks = list(map(lambda x: x.serialize(), snacks))
    return jsonify(all_snacks), 200

@api.route('/movie/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_movie(id):
    movie = Movie.query.filter_by(id=id).first()

    if movie is None:
        raise APIException('movie not found', status_code=404)
    db.session.delete(movie)
    db.session.commit()

    movie = Movie.query.all()
    all_movies = list(map(lambda x: x.serialize(), movie))
    return jsonify(all_movies), 200

@api.route('/cinema/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_cinema(id):
    cinema = Cinema.query.get(id)

    if cinema is None:
        raise APIException('cinema not found', status_code=404)
    db.session.delete(cinema)
    db.session.commit()
    cinema = Cinema.query.all()
    all_cinemas = list(map(lambda x: x.serialize(), cinema))
    return jsonify(all_cinemas), 200

@api.route('/schedule/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_schedule(id):
    schedule = Schedule.query.get(id)

    if schedule is None:
        raise APIException('schedule not found', status_code=404)
    db.session.delete(schedule)
    db.session.commit()

    schedule = Schedule.query.all()
    all_schedules = list(map(lambda x: x.serialize(), schedule))
    return jsonify(all_schedules), 200

@api.route('/movie/<int:id>', methods=['PUT'])
@jwt_required()
def modify_movie(id):
    body = request.get_json()
    movie = Movie.query.filter_by(id=id).first()
    if movie is None:
        raise APIException('movie not found', status_code=404)
    
    movie.name = body["name"]
    movie.synopsis = body["synopsis"]
    movie.genre = body["genre"]
    movie.release_date = body["release_date"]
    movie.duration = body["duration"]
    movie.director = body["director"]
    movie.poster = body["poster"]
    
    db.session.commit()
    movie = Movie.query.all()
    all_movies = list(map(lambda x: x.serialize(), movie))
    return jsonify(all_movies), 200   

@api.route('/cinema/<int:id>', methods=['PUT'])
@jwt_required()
def modify_cinema(id):
    body = request.get_json()
    cinema = Cinema.query.get(id)
    if cinema is None:
        raise APIException('cinema not found', status_code=404)
    
    cinema.location = body["location"]
    cinema.latitud = body["latitud"]
    cinema.longitud = body["longitud"]
    cinema.longitud = body["longitud"]

    db.session.commit()
    cinema = Cinema.query.all()
    all_cinemas = list(map(lambda x: x.serialize(), cinema))
    return jsonify(all_cinemas), 200


@api.route('/schedule/<int:id>', methods=['PUT'])
@jwt_required()
def modify_schedule(id):
    body = request.get_json()
    schedule = Schedule.query.get(id)
    if schedule is None:
        raise APIException('schedule not found', status_code=404)
    
    schedule.id_movie = body["id_movie"]
    schedule.id_cinema = body["id_cinema"]
    schedule.date = body["date"]
    schedule.hour = body["hour"]

    db.session.commit()
    schedule = Schedule.query.all()
    all_schedules = list(map(lambda x: x.serialize(), schedule))
    return jsonify(all_schedules), 200

@api.route('/user/<int:id>', methods=['PUT'])
@jwt_required()
def modify_user(id):
    body = request.get_json()
    user = User.query.get(id)

    user.name = body["name"]
    user.email= body["email"]
    user.surname = body["surname"]
    user.phone = body["phone"]
    user.date_of_birth = body["date_of_birth"]

    db.session.commit()
    user = User.query.get(id)
    user = user.serialize()
    return user, 200

@api.route('/password/<int:id>', methods=['PUT'])
@jwt_required()
def modify_password(id):
    body = request.get_json()
    user = User.query.get(id)
    hashed = user.password

    if user is None:
        raise APIException('user not found', status_code=404)
    
    if check_password_hash(hashed, body['old_password']) != True:
        raise APIException('password does not match', status_code=404)

    user.password = generate_password_hash(body["new_password"])
    db.session.commit()
   
    return jsonify({"msg": "password modified"}), 200

@api.route('/process_payment', methods=['POST'])
def payment():
    sdk = mercadopago.SDK(os.getenv("backMercado"))

    token = request.json.get("token", None)
    issuer_id = request.json.get("issuer_id", None)
    payment_method_id = request.json.get("payment_method_id", None)
    transaction_amount = request.json.get("transaction_amount", None)
    installments = request.json.get("installments", None)
    description = request.json.get("description", None)
    payer = request.json.get("payer", None)
    email = payer.get("email", None)
    identification = payer.get("identification")
    type = identification.get("type")
    number = identification.get("number")
    first_name = payer.get("first_name")
  
    payment_data = {
        "transaction_amount": float(transaction_amount),
        "token": token,
        "description": description,
        "installments": int(installments),
        "payment_method_id": payment_method_id,
        "payer": {
            "email": email,
            "identification": {
                "type": type, 
                "number": number
            },
            "first_name": first_name
        }
    }

    payment_response = sdk.payment().create(payment_data)
    payment = payment_response["response"]
    
    return jsonify(payment), 200

@api.route('/ticket/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_ticket(id):
    ticket = Ticket.query.get(id)

    if ticket is None:
        raise APIException('ticket not found', status_code=404)

    db.session.delete(ticket)
    db.session.commit()

    return jsonify({"msg": "ticket deleted"}), 200