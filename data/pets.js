// The data layer: the one file that keeps the Maple Street Pet Adoption Center's pets. For you to finish.
//
// For now the pets live in memory, in the array below, so every restart of the server starts again from the same
// six pets. The next chapter moves them into MongoDB: the functions here change, and routes/pets.js, which only calls
// them, stays as it is. That's why every function is async already: a database takes a moment to answer, and the
// routes await each one.
//
// Every pet is { id, name, species, age, traits, status }. Its id is text, such as "2".
//
//   listPets(species)   every pet, or only the pets of one species, such as "cat"
//   getPet(id)          the pet with that id, or null when there's none
//   addPet(pet)         saves a new pet and gives it back with its id and its status
//   resetPets()         puts the six starting pets back; the tests call it before each test. Ready to use.

// The six pets the center starts with. resetPets() copies them into pets.
const startingPets = [
  { id: "1", name: "Biscuit", species: "dog", age: 3, traits: ["good with kids", "house-trained"], status: "available" },
  { id: "2", name: "Mochi", species: "cat", age: 2, traits: ["calm", "indoor only"], status: "available" },
  { id: "3", name: "Pepper", species: "dog", age: 7, traits: ["calm", "good with cats"], status: "available" },
  { id: "4", name: "Clover", species: "rabbit", age: 1, traits: ["shy"], status: "available" },
  { id: "5", name: "Juniper", species: "cat", age: 5, traits: ["good with kids", "playful"], status: "adopted" },
  { id: "6", name: "Rocket", species: "dog", age: 1, traits: ["playful", "needs a yard"], status: "available" },
];

let pets = [];
let nextId = 7;

// Puts the six starting pets back, and the next new pet's id back to 7. Ready to use.
export function resetPets() {
  pets = structuredClone(startingPets); // a full copy, so changes never touch startingPets
  nextId = 7;
}

resetPets();

/*
 * 1. Give back the pets of one species, or every pet when no species is given.
 *
 *    species is the text from the address, such as "cat" from /pets?species=cat, or undefined for /pets.
 *
 *    listPets("cat")      -> Mochi and Juniper, in that order (Juniper is adopted, and still a cat)
 *    listPets("dog")      -> Biscuit, Pepper and Rocket
 *    listPets("parrot")   -> [] (an empty list: no pet is a parrot)
 *    listPets(undefined)  -> all six pets, Biscuit to Rocket
 *
 *    For now it gives back every pet, whatever species was asked for.
 */
export async function listPets(species) {
  return pets;
}

/*
 * 2. Give back the pet whose id is id, or null when no pet has that id.
 *
 *    id is the text from the address, such as "2" from /pets/2.
 *
 *    getPet("2")    -> Mochi's whole pet object: { id: "2", name: "Mochi", species: "cat", age: 2, ... }
 *    getPet("99")   -> null
 *
 *    For now it never finds a pet.
 */
export async function getPet(id) {
  return null;
}

/*
 * 3. Save a new pet and give it back.
 *
 *    pet is { name, species, age, traits }, from the request's body. The pet you save and give back has those four,
 *    plus an id and a status:
 *      - id: nextId as text, such as "7". Then add 1 to nextId, so the next new pet gets "8".
 *      - status: "available", for every new pet.
 *    Add it to the end of pets, so listPets and getPet find it from now on.
 *
 *    addPet({ name: "Waffles", species: "dog", age: 4, traits: ["good with kids"] })
 *      -> { id: "7", name: "Waffles", species: "dog", age: 4, traits: ["good with kids"], status: "available" }
 *
 *    For now it stops with an error, so POST /pets answers 500.
 */
export async function addPet(pet) {
  throw new Error("addPet isn't built yet.");
}
