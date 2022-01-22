from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    name = db.Column(db.String(80), unique=False, nullable=False)
    surname = db.Column(db.String(80), unique=False, nullable=False)
    date_of_birth = db.Column(db.String(80), unique=False, nullable=False)
    phone = db.Column(db.Integer, unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return '<User %r>' % self.username

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "surname": self.surname,
            "date_of_birth": self.date_of_birth,
            "phone": self.phone
        }

class Movie(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    synopsis = db.Column(db.String(400), unique=False, nullable=False)
    genre = db.Column(db.String(40), unique=False, nullable=False)
    release_date = db.Column(db.String(120), unique=False, nullable=False)
    duration = db.Column(db.Integer, unique=False, nullable=False)
    director = db.Column(db.String(120), unique=False, nullable=False)


    def __repr__(self):
        return '<Linea %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "genre": self.genre,
            "synopsis": self.synopsis,
            "release_date": self.release_date,
            "duration": self.duration,
            "director": self.director

                       
        }
    