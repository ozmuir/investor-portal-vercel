import { promises as fs } from "node:fs";
import YAML from "yaml";

export async function* readInvestorUpdates(filePath) {
  let count = 0;
  for (const it of YAML.parse(await fs.readFile(filePath, "utf8"))) {
    it.visibility = "authenticated";
    yield it;
    count += 1;
  }
  console.log(`\nDONE: Investor Updates read. Count: ${count}.`);
}
