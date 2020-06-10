# Auth Server API - Node.js Express App

[DEMO]()

----------------------
Run DB: [mongodb://localhost/auth](mongodb://localhost/auth) ||
[http://127.0.0.1:27017/](http://127.0.0.1:27017/)
```
mongod
```

Run App: [http://localhost:3090/](http://localhost:3090/)
```
npm run start
npm run dev
```

open T3 Studio => new connection => create connection

open Postman => create new user account by sending POST request:
``` 
// raw tab, POST http://localhost:3090/signup

{
"email": "new.user@mail.com",
"password": "password"
} 


```

``` 
// response with res.json(user)

{
    "_id": "5ee0a54cbe66392266bc20af",
    "email": "new.user@mail.com",
    "password": "password",
    "__v": 0
}

```

``` 
// response with  res.json({token: tokenForUser(user)})

{
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1ZWUwYjk2YjY1MDIxYTNlMzU5MDQxYzIiLCJpYXQiOjE1OTE3ODU4MzU0ODJ9._VUDO9vFjEcHasKGkHi7EPMWzejdTEJLrMQgdgT0a7Q"
}
```

T3 Studio: localhost:27017 / auth / Collections / users / 
``` 
5ee0a54cbe66392266bc20af
new.user@mail.com
password
```


---------------------------------


#### Tech Stack

- HTTP module (handle HTTP requests)
- BodyParser (help parse incoming HTTP requests)
- Morgan (login)
- Express (parse response & routing)

- MongoDB (storing data)
- Mongoose (working with mongoDB)

- Bcrypt-Node.js (storing a users passwords safely)
- Passport-JWT (authenticating users with a [JWT](https://jwt.io/))
- Passport-Local (authenticating users with a username/password)
- Passport JS (authenticating users)

### [MongoDB installation](https://docs.mongodb.com/database-tools/installation/#installation)

###### [Getting Started tutorial](https://docs.mongodb.com/manual/tutorial/getting-started/#getting-started)

- [MongoDB Community Download Center](https://www.mongodb.com/download-center/community?tck=docs_databasetools)

- [MongoDB Enterprise Download Center](https://www.mongodb.com/download-center/enterprise?tck=docs_databasetools)

- [MongoDB Community Edition Installation Tutorials](https://docs.mongodb.com/manual/installation/#tutorial-installation)

- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas?tck=docs_server) 
 
- [Install MongoDB Community Edition on Ubuntu](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)


``` 
wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -

echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list

sudo apt-get update

sudo apt-get install -y mongodb-org

sudo systemctl start mongod
sudo systemctl daemon-reload
sudo systemctl status mongod
sudo systemctl stop mongod
sudo systemctl restart mongod

```

- MongoDB launches with bindIp set to ```127.0.0.1``` means that the ```mongod``` can only accept connections from clients that are running on the same machine.
- data directory: ```/var/lib/mongodb``` 
- the log directory: ```/var/log/mongodb ```
- MongoDB package includes a configuration file: ```/etc/mongod.conf```
- errors or important messages by watching the output in the ```/var/log/mongodb/mongod.log``` file
- MongoDB runs using the ```mongodb``` user account
- If you change the user that runs the MongoDB process, you must also modify the permission to the data and log directories to give this user access to these directories:
 ``` 
cd / && ls
sudo mkdir -p /data/db
sudo chown -R $USER /data/db
mongod 
```

- Start [The mongo Shell](https://docs.mongodb.com/manual/mongo/) on the same host machine as the mongod. 
You can run the ```mongo``` shell without any command-line options 
to connect to a ```mongod``` that is running on your localhost with default ```port 27017```:
``` 
mongo
```

- Localhost Binding in [config file: ```/etc/mongod.conf```](https://docs.mongodb.com/manual/reference/configuration-options/#net.bindIp) || The TCP port on which the MongoDB instance listens for client connections
```
 --bind_ip <hostnames|ipaddresses|Unix domain socket paths> 
```

[Uninstall MongoDB Community Edition](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)

``` 
sudo service mongod stop
sudo apt-get purge mongodb-org*
sudo rm -r /var/log/mongodb
sudo rm -r /var/lib/mongodb

netstat -an | grep 27017
sudo rm /tmp/mongodb-27017.sock
```


[MongoDB GUI power & Robo 3T](https://robomongo.org/download) - MongoDB management tool:
 
- [tutorial](https://www.softwaretestinghelp.com/mongodb/robo-3t-robomongo-tutorial/)
- [Connection Manager](https://studio3t.com/knowledge-base/articles/connect-to-mongodb/)
- [Introducing MongoDB and Studio 3T](https://studio3t.com/academy/lessons/introducing-mongodb/)
- [Getting Started with Studio 3T](https://studio3t.com/knowledge-base/articles/getting-started/)
``` 
sudo apt install unzip
sudo unzip -l studio-3t-robo-3t-linux-double-pack.zip
sudo sh studio-3t-linux-x64.sh
```

If you’ve reached the end of your 30-day trial, please contact
 ```support@studio3t.com``` to request an extension.

Atlas Cluster / Connect to Cluster0 / I have the mongo shell installed

```  
mongo "mongodb+srv://cluster0-ful45.gcp.mongodb.net/test" --username tom
TestAtlas3000
```

``` 
MongoDB server version: 4.2.6
Welcome to the MongoDB shell.
For interactive help, type "help".
For more comprehensive documentation, see
	http://docs.mongodb.org/
Questions? Try the support group
	http://groups.google.com/group/mongodb-user
MongoDB Enterprise Cluster0-shard-0:PRIMARY> 

```

### [Postman for Linux](https://www.postman.com/downloads/)

Testing API with [curl](https://www.keycdn.com/support/popular-curl-examples)

``` 
curl -v -H "Content-Type: application/json" -X POST \
     -d '{"email":"post.email@signup.com","password":"111-222"}' http://localhost:3090/signup

curl -X POST http://localhost:3090/signup/ -d 'username=yourusername&password=yourpassword'

curl -I http://localhost:3090/test
curl --request GET http://localhost:3090/test
curl -X GET http://localhost:3090/test
```

### SECRETS

``` 
// config.js

module.exports = {
    secret: 'laiejrfia34ta34995235235'
}
```


-----------------------------------------------------------

# AUTH PROCESS


- ## Test request

``` 
curl -X GET http://localhost:3090/test
```

- ## Sign up

``` 
curl -X POST -d '{"email":"user.email@signup.com","password":"111-222"}' http://localhost:3090/signup

{"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1ZWUxNDMwNDc2MTIwZjI0YWY2ZTExYWMiLCJpYXQiOjE1OTE4MjEwNjExNDB9.YM7ulDHZ-1a-I5vfhoJ27T93BsqNfhqbWPm6lzAeLAw"}

curl -X POST -d '{"email":"user.email@signup.com","password":"111-222"}' http://localhost:3090/signup

{"error":"Email is in use!"}

curl -X POST  http://localhost:3090/signup

{"error":"You must provide email & password"}

```

- ## Sign in

``` 
curl --location --request POST 'http://localhost:3090/signin' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "user.email@signup.com",
    "password": "111-222"
}'

{"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1ZWUxNDMwNDc2MTIwZjI0YWY2ZTExYWMiLCJpYXQiOjE1OTE4Mjg5Mjc4MzV9.vmQl8tP6iguCaazSZcBsRCtDddG9gD5hrbjbf-lXK94"}


curl --location --request POST 'http://localhost:3090/signin' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "user.email@signup.com",
    "password": "bad password"
}'

Unauthorized
```

- ## User/Password Access

```
curl -X GET  http://localhost:3090/

Unauthorized

curl --location --request GET 'http://localhost:3090/' \
--header 'Authorization: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1ZWUwZDk5ODY3N2RkZTFmZjAyNTU5MTMiLCJpYXQiOjE1OTE3OTQwNzMzNDh9.xxR3yqsecxgRh9VyqQd1dUm8-sHUhPy2-kBpz1A2ML8' \
--header 'Content-Type: text/plain' \
--data-raw '{"email":"user.email@signup.com","password":"111-222"}'

{"hi":"there!"}

curl --location --request GET 'http://localhost:3090/' \
--header 'Content-Type: text/plain' \
--data-raw '{"email":"user.email@signup.com","password":"111-222"}'

Unauthorized
```


- ## Token Access

```
curl -X GET  http://localhost:3090/

Unauthorized

curl -H 'Accept: application/json' -H "Authorization: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1ZWUxNDMwNDc2MTIwZjI0YWY2ZTExYWMiLCJpYXQiOjE1OTE4MjEwNjExNDB9.YM7ulDHZ-1a-I5vfhoJ27T93BsqNfhqbWPm6lzAeLAw" http://localhost:3090/

{"hi":"there!"}

```

