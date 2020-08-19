const express = require("express");
const cors = require("cors");

const { uuid } = require('uuidv4')
// const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body
  console.log(title, url, techs)
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }
  repositories.push(repository)

  return response.json(repository)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const { title, url, techs } = request.body
  const repository = repositories.find( i => i.id == id)
  if(repository == undefined){
    return response.status(400).json({ message: "Repository not found."})
  }

  repository.title = title
  repository.techs = techs
  repository.url = url

  return response.json(repository)

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params
  
  const repositoryIndex = repositories.findIndex( i => i.id == id)

  if(repositoryIndex < 0){
    return response.status(400).json({ message: "Repository not found."})
  }

  repositories.splice(repositoryIndex,1)

  return response.status(204).send()

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params
  const repository = repositories.find( i => i.id == id)
  if(repository == undefined){
    return response.status(400).json({ message: "Repository not found."})
  }

  const sumLikes = repository.likes + 1
  repository.likes = sumLikes
  
  response.json(repository)

});

module.exports = app;
