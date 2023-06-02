#!/usr/bin/env python3

import connexion
from flask import Flask
from flask_cors import CORS

from swagger_server import encoder

app = connexion.FlaskApp(__name__, specification_dir='./swagger/')
app.app.json_encoder = encoder.JSONEncoder
app.add_api('swagger.yaml', arguments={'title': 'MSP Multi Tenant Management'})

CORS(app.app, resources={
    r"*": {"origins": "http://localhost:.*"}
})

if __name__ == '__main__':
    app.run(port=8670)
