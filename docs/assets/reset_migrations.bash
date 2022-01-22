rm -R -f ./migrations &&
pipenv run init &&
psql -U postgres -c 'DROP DATABASE cinema;' || true &&
psql -U postgres -c 'CREATE DATABASE cinema;' &&
psql -U postgres -c 'CREATE EXTENSION unaccent;' -d cinema &&
pipenv run migrate &&
pipenv run upgrade