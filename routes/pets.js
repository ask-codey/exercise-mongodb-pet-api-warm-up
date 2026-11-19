// The routes for /pets. Ready to use: the exercise is in data/pets.js.
//
// app.js sends every address that starts with /pets here, so these paths leave /pets out: "/" is /pets, and "/:id"
// is /pets/2, /pets/99 and so on. Each route reads the request, awaits a function from data/pets.js, and answers.
// The routes never touch the pets themselves: that's the data layer's job.
import express from "express";
import { listPets, getPet, addPet } from "../data/pets.js";
import { sendProblem } from "../problems.js";

export const petsRouter = express.Router();

// GET /pets, and GET /pets?species=cat
// req.query.species is the text after ?species=, or undefined when the address has none.
petsRouter.get("/", async (req, res) => {
  const pets = await listPets(req.query.species);
  res.json(pets);
});

// GET /pets/2
// req.params.id is the text in the :id part of the address: "2" here.
petsRouter.get("/:id", async (req, res) => {
  const pet = await getPet(req.params.id);
  if (pet === null) {
    sendProblem(res, 404, `There's no pet ${req.params.id}.`);
    return;
  }
  res.json(pet);
});

// POST /pets, with a JSON body such as
//   { "name": "Waffles", "species": "dog", "age": 4, "traits": ["good with kids"] }
// req.body is that body. A new pet needs at least a name and a species, or the answer is 400.
petsRouter.post("/", async (req, res) => {
  const body = req.body;
  // ! is read "not": !body.name is true when the name is missing or empty.
  if (body === undefined || !body.name || !body.species) {
    sendProblem(res, 400, "A new pet needs a name and a species.");
    return;
  }
  const pet = await addPet({ name: body.name, species: body.species, age: body.age, traits: body.traits });
  res.status(201).json(pet);
});
