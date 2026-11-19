// Tests for the pet API. Run them with: npm test (run npm install once first).
// Before every test, resetPets() puts the center's six pets back, so every test starts from the same pets:
//   "1" Biscuit (dog), "2" Mochi (cat), "3" Pepper (dog), "4" Clover (rabbit), "5" Juniper (cat), "6" Rocket (dog).
// Each test sends a request to createApp() with Supertest and checks the answer. No server needs to be running.
// You don't need to change this file.
import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import { createApp } from "../app.js";
import { resetPets } from "../data/pets.js";

beforeEach(() => {
  resetPets();
});

const mochi = {
  id: "2", name: "Mochi", species: "cat", age: 2, traits: ["calm", "indoor only"], status: "available",
};
const waffles = { name: "Waffles", species: "dog", age: 4, traits: ["good with kids"] };

// The names of the pets in an answer, in order, such as ["Mochi", "Juniper"].
function names(body) {
  return Array.isArray(body) ? body.map((pet) => pet.name) : body;
}

// What a list answer held, for a failing test's message: "It gave back ["Biscuit","Mochi"]."
function gave(response) {
  return ` It gave back ${JSON.stringify(names(response.body))}.`;
}

// Checks an answer's status code, and that it is JSON.
function assertJson(response, status, what) {
  assert.equal(response.status, status,
    `${what} should answer ${status}, but it answered ${response.status} with ${JSON.stringify(response.body)}.`);
  assert.match(response.headers["content-type"] ?? "(none)", /application\/json/, `${what} should answer with JSON.`);
}

test("1) GET /pets answers 200 with all 6 pets, Biscuit to Rocket", async () => {
  const response = await request(createApp()).get("/pets");
  assertJson(response, 200, "GET /pets");
  assert.deepEqual(names(response.body), ["Biscuit", "Mochi", "Pepper", "Clover", "Juniper", "Rocket"],
    "listPets(undefined) should give back every pet, in the order they're kept." + gave(response));
});

test("2) GET /pets?species=cat answers 200 with the 2 cats, Mochi and Juniper", async () => {
  const response = await request(createApp()).get("/pets?species=cat");
  assertJson(response, 200, "GET /pets?species=cat");
  assert.deepEqual(names(response.body), ["Mochi", "Juniper"],
    "listPets(\"cat\") should give back only the cats. Juniper is adopted, and still a cat." + gave(response));
});

test("3) GET /pets?species=dog answers 200 with the 3 dogs, Biscuit, Pepper and Rocket", async () => {
  const response = await request(createApp()).get("/pets?species=dog");
  assertJson(response, 200, "GET /pets?species=dog");
  assert.deepEqual(names(response.body), ["Biscuit", "Pepper", "Rocket"],
    "listPets(\"dog\") should give back only the dogs." + gave(response));
});

test("4) GET /pets?species=parrot answers 200 with an empty list, []", async () => {
  const response = await request(createApp()).get("/pets?species=parrot");
  assertJson(response, 200, "GET /pets?species=parrot");
  assert.deepEqual(names(response.body), [],
    "listPets(\"parrot\") should give back an empty list: no pet is a parrot." + gave(response));
});

test("5) GET /pets/2 answers 200 with Mochi", async () => {
  const response = await request(createApp()).get("/pets/2");
  assertJson(response, 200, "GET /pets/2");
  assert.deepEqual(response.body, mochi,
    `getPet("2") should give back Mochi's whole pet object. It gave back ${JSON.stringify(response.body)}.`);
});

test("6) GET /pets/99 answers 404 with \"There's no pet 99.\"", async () => {
  const response = await request(createApp()).get("/pets/99");
  assertJson(response, 404, "GET /pets/99");
  assert.deepEqual(response.body, { status: 404, title: "Not Found", detail: "There's no pet 99." },
    "getPet(\"99\") should give back null, so the route answers 404.");
});

test("7) POST /pets with Waffles answers 201 with Waffles, id \"7\" and status \"available\"", async () => {
  const response = await request(createApp()).post("/pets").send(waffles);
  assertJson(response, 201, "POST /pets");
  assert.deepEqual(response.body, { id: "7", ...waffles, status: "available" },
    "addPet should give back the new pet: the id \"7\" (as text), the four fields it was given, and status \"available\". " +
    `It gave back ${JSON.stringify(response.body)}.`);
});

test("8) after POST /pets with Waffles, GET /pets/7 answers 200 with Waffles and GET /pets lists 7 pets", async () => {
  const app = createApp();
  await request(app).post("/pets").send(waffles);
  const one = await request(app).get("/pets/7");
  assertJson(one, 200, "GET /pets/7 after adding Waffles");
  assert.equal(one.body.name, "Waffles", "addPet should keep Waffles, so getPet(\"7\") finds him.");
  const all = await request(app).get("/pets");
  assert.deepEqual(names(all.body), ["Biscuit", "Mochi", "Pepper", "Clover", "Juniper", "Rocket", "Waffles"],
    "addPet should put Waffles at the end of the pets, so listPets gives back 7." + gave(all));
});
