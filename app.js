// The Maple Street Pet Adoption Center's API. createApp() builds the Express app. Ready to use.
//
// server.js calls createApp() and starts the app at http://localhost:3100. The tests call createApp() too, and send
// it requests with Supertest, with no server running. Every address that starts with /pets goes to routes/pets.js.
//
//   GET  /pets               200, every pet
//   GET  /pets?species=cat   200, only the cats (any species works the same way)
//   GET  /pets/2             200, the pet whose id is "2"
//   GET  /pets/99            404, { "status": 404, "title": "Not Found", "detail": "There's no pet 99." }
//   POST /pets               201, the new pet, for a JSON body such as
//                            { "name": "Waffles", "species": "dog", "age": 4, "traits": ["good with kids"] }
//                            400 when the body has no name or no species
//   any other address        404, { "status": 404, "title": "Not Found", "detail": "There's nothing at /snacks." }
//   an error in any route    500, { "status": 500, "title": "Internal Server Error",
//                                   "detail": "Something went wrong on our side." }
import express from "express";
import { petsRouter } from "./routes/pets.js";
import { sendProblem } from "./problems.js";

export function createApp() {
  const app = express();

  // Reads a request's JSON body into req.body.
  app.use(express.json());

  // Every address that starts with /pets goes to the routes in routes/pets.js.
  app.use("/pets", petsRouter);

  // Any other address: 404.
  app.use((req, res) => {
    sendProblem(res, 404, `There's nothing at ${req.path}.`);
  });

  // An error in any route ends up here.
  app.use((err, req, res, next) => {
    // A body that isn't valid JSON is the caller's mistake: 400.
    if (err.type === "entity.parse.failed") {
      sendProblem(res, 400, "The request body isn't valid JSON.");
      return;
    }
    // Anything else is the server's problem: the details go to the terminal, never to the caller.
    console.error(err);
    sendProblem(res, 500, "Something went wrong on our side.");
  });

  return app;
}
