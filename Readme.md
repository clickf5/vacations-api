### Vacations API

This is the backend of the vacation record service.

### What is done

**Auth API**

* POST /api/v1/signin
* POST /api/v1/signup
* GET /api/v1/signout

**Users API**

* GET /api/v1/users
* GET /api/v1/user/:id

### TODO

* Vacation API
* Production ready docker image

### How to use

When you clone the repository, run the command:

`npm install`

This backend uses mongodb as storage. Please start mongodb in docker before starting the server: 

`docker run -p 27017:27017 --name vacations-mongo --rm -d mongo`

After starting mongodb, use this command to start the development server: 

`npm run dev`