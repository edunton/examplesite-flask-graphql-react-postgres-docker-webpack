from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from ariadne import graphql_sync, make_executable_schema, gql, load_schema_from_path
from ariadne.constants import PLAYGROUND_HTML
from resolvers import query, mutation
from flask_sqlalchemy import SQLAlchemy

import os


type_defs = gql(load_schema_from_path("./gql/schema.graphql"))
schema = make_executable_schema(type_defs, query, mutation)

static_dir = os.path.join('build')

print(static_dir)

app = Flask(__name__,
    root_path=os.path.abspath("."),
    static_folder=static_dir,
    static_url_path='')

db = SQLAlchemy()

#cors = CORS(app, resources={r"/graphql": {"origins": "*"}})

@app.route('/')
def root():
    return send_from_directory(static_dir, "index.html")


@app.route("/graphql", methods=["GET"])
def graphql_playgroud():
    """Serve GraphiQL playground"""
    return PLAYGROUND_HTML, 200


@app.route("/graphql", methods=["POST"])
def graphql_server():
    data = request.get_json()

    success, result = graphql_sync(
        schema,
        data,
        context_value=request,
        debug=app.debug)

    status_code = 200 if success else 400
    return jsonify(result), status_code


if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True)