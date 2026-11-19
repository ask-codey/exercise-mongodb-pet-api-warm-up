// Starts the Maple Street Pet Adoption Center's API at http://localhost:3100.
// Run it with: npm start (or npm run dev, which restarts it each time you save a file). Stop it with Ctrl+C.
// Ready to use: you don't need to change this file.
import { createApp } from "./app.js";

const port = 3100;
const app = createApp();

app.listen(port, () => {
  console.log(`Maple Street's pet API is listening on http://localhost:${port}`);
});
