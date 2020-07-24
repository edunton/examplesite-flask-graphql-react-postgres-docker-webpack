# React + Flask + PostgreSQL w/ Docker + Webpack
### a.k.a. Eric's Awesome Country Explorer

This is an introduction to using React, Flask, PostgreSQL, Webpack, and Docker to make a website.

### Get Up and Running

#### Step 0: Prerequisites
- Node 12+ (includes NPM)
- Docker

#### Step 1: Build the UI
First outside of docker, we are going to build the React with Webpack and send a "build" directory to live with our server files. The Flask server is also going to be our static file server. 

Assume you are at the root folder in your terminal and run these commands

```bash
cd ./client
npm install
npm run build
```

Now you should see a new folder with JS and HTML files in `/[root]/server/build/`

#### (Possible) Step 2: Environment Variables File
Skip to Step 3 if you are using "Docker Desktop" on Windows/Mac or if you are using Linux. If you are using "Docker Toolbox", thus forced to run Docker via VirtualBox, you need to configure the `.env` file at the root of the project. Uncomment the one line (remove the `#`) in that file. This will set the DB connection string for the server.

#### Step 3: Run Docker
Go to the root of the project where the `docker-compose.yml` file is. 

Simply run this command:

```
docker-compose up --build
```

Now go to [http://localhost:5000](http://localhost:5000) or [http://192.168.99.100:5000](http://192.168.99.100:5000) if you are using "Docker Toolbox"

### Development Notes
You may find it easier to run flask outside of Docker. If so, spin up a virtual environment.

And if you want to run the code outside Docker you will also need this:
- Python 3.7.X
- PostgreSQL 12+

```bash
cd ./server
python -m venv venv
./venv/bin/activate #or .\venv\Scripts\activate on Windows
pip install -r requirements.txt
python app.py
```

To develop the UI with automatic rebuilds use `npm start`. Webpack will kindly rebuild only the differences for you.

To initial the database manually run this into the Postgres Terminal
```
\i [/path/to/root]/db/init.sql
```

To get rid of everything in Docker and start fresh

```bash
docker-compose down --rmi all --volumes
```
