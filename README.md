**Note**: I turned this project into a [static web app](https://github.com/ggiuffre/timelangs).

# timelines

A web app about the history of programming languages: relevant languages are displayed on a timeline and can be filtered by tag. Example tags are `#OOP`, `#web`, `#Python`, and `#zero-indexed`.



## Hosting this web app locally

Assuming you have installed Git and Docker Compose on your machine, you can serve this web app locally by just cloning the repo and using Docker Compose:

```
git clone https://github.com/ggiuffre/timelines.git
cd timelines
docker-compose up
```

Shut down the app by hitting `Ctrl-C` and calling `docker-compose down`.
