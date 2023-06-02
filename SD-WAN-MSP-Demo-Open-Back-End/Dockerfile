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
RUN pip install --force-reinstall git+https://github.com/benoitc/gunicorn.git@master

COPY . /usr/src/app

EXPOSE 8670

CMD gunicorn -b 0.0.0.0:8670 swagger_server.app:app
