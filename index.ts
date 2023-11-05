import title from "./title.js";
import { thankYou } from "./endgraphic.js";
import gameMasterHead from "./useroperation.js";

async function adventureGame(): Promise<void> {
  console.clear();
  await title();
  await gameMasterHead();
  console.log(thankYou);
}

adventureGame();

