# timelines

A web app about the history of software: relevant languages, libraries, and softwares are displayed on a timeline and can be filtered by tag. Example tags are `#languages`, `#web`, `#Python`, and `#libraries`.



## Hosting this web app locally

Assuming you have installed Git, Docker, and Docker Compose on your computer, you can serve this web app yourself by just cloning the repo and using Docker:

```
git clone https://github.com/ggiuffre/timelines.git
cd timelines
docker-compose up
```

Shut down the app by hitting `Ctrl-C` and calling `docker-compose down`.
