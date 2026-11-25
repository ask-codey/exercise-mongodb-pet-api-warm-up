# Exercise: Pet API Warm-Up

Exercise code for the lesson **Exercise: Pet API Warm-Up** in the MongoDB in Depth course on [ask-codey.com](https://www.ask-codey.com).

The Maple Street Pet Adoption Center has an API for its pets, built with Express. It runs, but its data file isn't finished: asking for the cats brings back every pet, no pet can be found by its id, and adding a pet stops with an error. You'll finish the three functions in `data/pets.js` that the routes call, and tests send requests to the API and check every answer.

## What's here

- `data/pets.js`: the data layer, the one file that keeps the pets. The six pets live in an array for now, and three functions, `listPets`, `getPet` and `addPet`, are for you to finish. The comment above each one says what it should give back, with examples. `resetPets` is ready to use.
- `routes/pets.js`: the three routes, `GET /pets`, `GET /pets/:id` and `POST /pets`. Each one reads the request, awaits a function from `data/pets.js`, and answers. Ready to use.
- `app.js`: `createApp()`, which builds the Express app: it reads JSON bodies, sends every `/pets` address to the routes, and answers 404 for any other address and 500 for an error. The comment at its top lists every request and its answer. Ready to use.
- `problems.js`: `sendProblem`, which sends every error in one shape, `{ status, title, detail }`. Ready to use.
- `server.js`: starts the API at `http://localhost:3100`. Ready to use.
- `pets.insomnia.json`: the requests to try, as an Insomnia collection. Ready to use.
- `test/app.test.js`: the tests, which send requests to `createApp()` with Supertest. You don't need to change this file.
- `package.json`: the project's settings, its scripts (`start`, `dev` and `test`), and the packages it uses at exact versions: Express, and Supertest for the tests. Ready to use.

## Before you start

In VS Code's terminal, in this folder, install the packages (once):

```bash
npm install
```

It makes a `node_modules` folder. That folder is in `.gitignore`, so Git leaves it out: `npm install` makes it again on any computer.

## Run it

```bash
npm start
```

The terminal says `Maple Street's pet API is listening on http://localhost:3100` and keeps running. Open `http://localhost:3100/pets` in your browser, or, in Insomnia (the course's lesson *Setup: Insomnia* installs it), click **Import** in your `MongoDB in Depth` project, choose `pets.insomnia.json`, and send any request; its description says what to expect. Stop the server with **Ctrl+C**. Every start begins again from the same six pets, because they're kept in memory.

`npm run dev` starts it with `node --watch`, so it restarts each time you save a file.

## Check your work

```bash
npm test
```

No server needs to be running: each test hands its request straight to `createApp()`, and the six pets are put back before every test. At first 6 of the 8 tests fail: that is expected. The other two already pass, because the placeholders happen to get them right, and they must still pass when you're done. Each function you finish turns its tests green. A failing test's message says what it expected and what came back, for example *listPets("cat") should give back only the cats. Juniper is adopted, and still a cat. It gave back ["Biscuit","Mochi","Pepper","Clover","Juniper","Rocket"].*

## The rules

- Change only `data/pets.js`. The routes, `app.js` and the tests stay as they are.
- Keep every function `async`: the routes await them, and the next chapter's database code needs it.
- Every pet's `id` is text, such as `"2"`. A new pet's `id` is `nextId` as text (`"7"` for the first one), and its `status` is `"available"`.
- `getPet` gives back `null`, not `undefined`, when no pet has the id.

## Tips

- `filter` keeps every pet your arrow function says yes to, and `find` gives back the first one, or `undefined` when none matches.
- With no `?species=` in the address, `species` is `undefined`: give back every pet before you filter.
- A template literal turns a number into text: `` `${nextId}` `` is `"7"`.
- `push` puts the new pet at the end of `pets`, so `listPets` and `getPet` find it from then on.

## Hand it in

When it works, push your solution to a public repo of your own on GitHub, then paste that repo's address into **Submit your exercise** on the lesson page at [ask-codey.com](https://www.ask-codey.com). That's what completes the lesson. The lesson page shows the Git commands, step by step.
