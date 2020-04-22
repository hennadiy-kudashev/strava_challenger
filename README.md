##Environment variables:
 - MONGOLAB_URI
 - STRAVA_CLIENT_ID
 - STRAVA_CLIENT_SECRET
 - STRAVA_REDIRECT_URI
 - STRAVA_ACCESS_TOKEN
 - SECRET

##Build
The latest build can be tested [here](https://strava-challenger.herokuapp.com/)

The stage build can be tested [here](https://strava-challenger-stage.herokuapp.com/)


##Docker

- Create ./docker/.env_docker from template ./docker/.env_docker.example
- `cd docker`
- `docker-compose build`
- `docker-compose up`

