# Cinema app

Cinema app is a full-stack application which enables you to:
- Check information about the movies that are playing
- Check movies that are coming soon
- Select your seat and buy it
- Check location of the cinemas
- Create an account to buy tickets
- Buy snacks
- Search movies in the search bar

## Tech

Cinema app uses technologies such as:

- [ReactJS]
- [Flux]
- [Javascript]
- [Bootstrap]
- [Python]
- [Flask]
- [JWT]
- [Flask Mail] 
- [PostgreSQL]
- [SQLAlchemy]
- [Google Maps API]
- [Mercado Pago API]

## Installation

### Back-End Manual Installation:

It is recomended to install the backend first, make sure you have Python 3.8, Pipenv and a database engine (Posgress recomended)

1. Install the python packages: `$ pipenv install`
2. Create a .env file based on the .env.example: `$ cp .env.example .env`
3. Install your database engine and create your database, depending on your database you have to create a DATABASE_URL variable with one of the possible values, make sure yo replace the valudes with your database information:

| Engine	| DATABASE_URL 						|
| ------------- | ----------------------------------------------------- |
| SQLite	| sqlite:////test.db	 				|
| MySQL		| mysql://username:password@localhost:port/example	|
| Postgress	| postgres://username:password@localhost:5432/example 	|

4. Migrate the migrations: `$ pipenv run migrate` (skip if you have not made changes to the models on the `./src/api/models.py`)
5. Run the migrations: `$ pipenv run upgrade`
6. Run the application: `$ pipenv run start`


### Front-End Manual Installation:

- Make sure you are using node version 14+ and that you have already successfully installed and runned the backend.

1. Install node: `$ nvm install 14`
1. Install the packages: `$ npm install`
2. Start the server `$ npm run start`

### Views
### Home:
![Imgur](https://imgur.com/JYmLwD5.gif)

***Email: user-test-4geeks@hotmail.com***
***Password: usuario***

### Cinemas:
![Imgur](https://imgur.com/pTP3bo8.gif)
![Imgur](https://imgur.com/igrgUVu.gif)

***Email: empresa-test-4geeks@hotmail.com***
***Password: empresa***

### Movie:
![Imgur](https://imgur.com/kAyJLUG.gif)

***Email: 	admin-test-4geeks@hotmail.com***
***Password: admin***

### Seats:
![Imgur](https://imgur.com/kAyJLUG.gif)

***Email: 	admin-test-4geeks@hotmail.com***
***Password: admin***

### Checkout:
![Imgur](https://imgur.com/kAyJLUG.gif)

***Email: 	admin-test-4geeks@hotmail.com***
***Password: admin***

### Confirmation:
![Imgur](https://imgur.com/kAyJLUG.gif)

***Email: 	admin-test-4geeks@hotmail.com***
***Password: admin***

### Profile:
![Imgur](https://imgur.com/kAyJLUG.gif)

***Email: 	admin-test-4geeks@hotmail.com***
***Password: admin***

### Heroku:
### [Click Here]

   [mariaperrone]: <https://github.com/mariaperrone>
   [flopezcardozo]: <https://github.com/flopezcardozo>
   [me]: <https://github.com/sromero50>
   [ReactJS]: <https://reactjs.org/>
   [Flux]: <https://facebook.github.io/flux/>
   [Javascript]: <https://www.javascript.com/>
   [Bootstrap]: <https://getbootstrap.com/>
   [Python]: <https://www.python.org/>
   [Flask]: <https://flask.palletsprojects.com/en/2.0.x/>
   [JWT]: <https://jwt.io/>
   [Flask Mail]: <https://pythonhosted.org/Flask-Mail/>
   [PostgreSQL]: <https://www.postgresql.org/>
   [SQLAlchemy]: <https://www.sqlalchemy.org/>
   [Google Maps API]: <https://developers.google.com/maps/documentation/javascript/overview>
   [Mercado Pago API]: <https://www.mercadopago.com.ar/developers/es/guides/online-payments/checkout-api/introduction>
   [Click Here]: <https://final-project-smarttravel.herokuapp.com/>

