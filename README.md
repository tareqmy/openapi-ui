## openapi3-ui

---

### Run in local machine:

* Make sure that you have already installed node version `>=14`
* `npm install --save`
* `npm start` for local environment
* `npm run prod` for production environment
* Visit [http://localhost:3000](http://localhost:3000)

---

### Run by docker:

* Make sure that you have already installed `docker` and `docker compose`
* Run command: `docker compose up --build` or `docker compose up --build -d`
* Visit [http://localhost:3000](http://localhost:3000)
* It's always run as production environment if you are not change any config file

---

### Configuration:

* You can change environment by changing variable `REACT_APP_BASE_URL` from file `.env-cmdrc.json`
* `REACT_APP_BASE_URL` is only for where `gateway-server` service is running.
* Both can be changed prod and local from file `.env-cmdrc.json`
* `Swagger client base url` and `service url` can be changed from the `UI` level when the app is running.

---

### Integration to `POSTMAN`

* You can download `OpenAPI 3.0` specification `JSON` file from `UI`. There already has a download button to download
  it.
* You can import downloaded `OpenAPI 3.0` specification `JSON`  file into `postman`.
* `OpenAPI 3.0 JSON` to `POSTMAN JSON` conversion:
    * Please follow [openapi-to-postman](https://github.com/postmanlabs/openapi-to-postman)

---

### Swagger parser

* Please follow [swagger-parser](https://apitools.dev/swagger-parser/docs/)

