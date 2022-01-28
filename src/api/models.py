from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_utils import ScalarListType

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), unique=False, nullable=False)
    name = db.Column(db.String(80), unique=False, nullable=False)
    surname = db.Column(db.String(80), unique=False, nullable=False)
    date_of_birth = db.Column(db.String(200), unique=False, nullable=False)
    phone = db.Column(db.String(200), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    ticket = db.relationship("Ticket", backref="user")

    def __repr__(self):
        return '<User %r>' % self.email

   
    
    def serialize(self):
      
       ticket = ','.join(str(e) for e in self.ticket)
      
       return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "surname": self.surname,
            "date_of_birth": self.date_of_birth,
            "phone": self.phone,
            "ticket": ticket
        }

class Administrator(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)

    def __repr__(self):
        return '<Administrator %r>' % self.nombre

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "password": self.password
           }

class Movie(db.Model):
    schedule = db.relationship("Schedule", backref="movie")
    cinema = db.relationship("Cinema", backref="movie")
    id = db.Column(db.Integer, primary_key=True)
    poster = db.Column(db.String(300), unique=False, nullable=False)
    name = db.Column(db.String(120), unique=True, nullable=False)
    synopsis = db.Column(db.String(400), unique=False, nullable=False)
    genre = db.Column(db.String(40), unique=False, nullable=False)
    release_date = db.Column(db.String(120), unique=False, nullable=False)
    duration = db.Column(db.Integer, unique=False, nullable=False)
    director = db.Column(db.String(120), unique=False, nullable=False)
    released = db.Column(db.Boolean(), unique=False, nullable=True)
    ticket = db.relationship("Ticket", backref="movie")

    def __repr__(self):
        return '<Movie %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "genre": self.genre,
            "synopsis": self.synopsis,
            "release_date": self.release_date,
            "duration": self.duration,
            "director": self.director,
            "poster": self.poster,
            "released": self.released

                       
        }

class Cinema(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    location = db.Column(db.String(120), unique=True, nullable=False)
    address = db.Column(db.String(120), unique=True, nullable=False)
    image = db.Column(db.String(300), unique=False, nullable=True)
    latitude = db.Column(db.Float(53), unique=True, nullable=False)
    longitude = db.Column(db.Float(53), unique=True, nullable=False)
    schedule = db.relationship("Schedule", backref="cinema")
    id_movie = db.Column(db.Integer, db.ForeignKey('movie.id'))

    def __repr__(self):
        return '<Cinema %r>' % self.location

    def serialize(self):
        return {
            "id": self.id,
            "image": self.image,
            "location": self.location,
            "address": self.address,
            "id_movie": self.id_movie,
            "latitude": self.latitude,
            "longitude": self.longitude
           
        }

class Schedule(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    id_movie = db.Column(db.Integer, db.ForeignKey('movie.id'))
    id_cinema = db.Column(db.Integer, db.ForeignKey('cinema.id'))
    type = db.Column(db.String(80), unique=False, nullable=False)
    date = db.Column(db.String(80), unique=False, nullable=False)
    hour = db.Column(db.String(80), unique=False, nullable=False)
    seats = db.relationship("Ticket", backref="schedule")

    def __repr__(self):
        return '<Schedule %r>' % self.hour

    def serialize(self):
        seats = ','.join(str(e) for e in self.seats)
        
      
        return {
            "id": self.id,
            "id_movie": self.id_movie,
            "type": self.type,
            "id_cinema": self.id_cinema,
            "date": self.date,
            "hour": self.hour,
            "seats": seats

           
        }

class Ticket(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_movie = db.Column(db.Integer, db.ForeignKey('movie.id'))
    id_schedule = db.Column(db.Integer, db.ForeignKey('schedule.id'))
    type = db.Column(db.String(80), unique=False, nullable=False)
    hour = db.Column(db.String(80), unique=False, nullable=False)
    date = db.Column(db.String(80), unique=False, nullable=False)
    cinema = db.Column(db.String(80), unique=False, nullable=False)
    id_user = db.Column(db.Integer, db.ForeignKey('user.id'))
    code = db.Column(db.String(80), unique=True, nullable=False)
    seat = db.Column(db.String(200), unique=True, nullable=False)
    snack = db.relationship("Snack", backref="ticket")

    def __repr__(self):
        return '%r' % self.seat

    def serialize(self):
        snack = ','.join(str(e) for e in self.snack)
        print(snack)  
        return {
            "id": self.id,
            "id_movie": self.id_movie,
            "id_schedule": self.id_schedule,
            "hour": self.hour,
            "date": self.date,
            "cinema": self.cinema,
            "id_user": self.id_user,
            "code": self.code,
            "seat": self.seat,
            "snacks": snack


           
        }

class Snack(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_user = db.Column(db.Integer, db.ForeignKey('user.id'))
    id_ticket = db.Column(db.Integer, db.ForeignKey('ticket.id'))
    snack = db.Column(db.String(80), unique=False, nullable=False)
    quantity = db.Column(db.String(80), unique=False, nullable=False)


    def __repr__(self):
        return '<Snack %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "id_user": self.id_user,
            "id_ticket": self.id_ticket,
            "snack": self.snack,
            "quantity": self.quantity

        }