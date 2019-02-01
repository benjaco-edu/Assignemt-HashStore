## Assignment 1 - Simple DB with Hashmap-based Index

 - Build a `simple_db` in the programming language of your choice.
   - Implement a Hashmap-based index.
   - Implement functionality to store your data on disk in a binary file.
   - Implement functionality to read your data from disk again, so that you can reinstantiate your database after a shutdown.

## Solution

This solution is created in Node.js (tested in v11) with some http endpoints to retrieve and save data.

### File overview

App.js exposes the database by http using express.

hashMapDB.js reads and writes the database file.

### Technical details

The file is streamed in line by line using [linebyline](https://www.npmjs.com/package/linebyline) and the overview is build using a [ES& Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)].

Keys and values are url encoded before it's saved, that way it able to save values containing new lines.

Nothing is deleted when duplicated keys are saved.

The (hash)map contains the key, and the start and end byte location of the data in the file

### Usages

#### Save a key

`http://localhost:8080/set/KEY/VALUE`

#### Get a key

`http://localhost:8080/get/KEY`

#### Dump saved file

`http://localhost:8080/file`

#### Dump hashmap

`http://localhost:8080/hashMap`


### Get up and running

_requires docker_

run it from dockerhub

`sudo docker run -it --rm -p 8080:8080 bslcphbussiness/db-simple-db`

run it with your local database file in "/data/database.txt"

`sudo docker run -it --rm -p 8080:8080 -v $(pwd)/data:/usr/src/app/data bslcphbussiness/db-simple-db`

#### Clean up

`sudo docker rmi bslcphbussiness/db-simple-db`


#### Build it your self

`sudo docker build -t bslcphbussiness/db-simple-db .`
