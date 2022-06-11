FROM python:3

RUN pip3 install --no-cache-dir --upgrade pip
RUN pip3 install --no-cache-dir pipenv

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY Pipfile /usr/src/app/
COPY requirements.txt /usr/src/app/

RUN pip3 install --no-cache-dir -r requirements.txt
RUN pip install connexion[swagger-ui]
RUN pip3 install -U flask_cors

COPY . /usr/src/app

EXPOSE 8080

CMD gunicorn -b 0.0.0.0:8080 swagger_server.app:app