/* eslint-disable no-console */
import fs from "fs";
import path from "path";

// @ts-ignore
import prettier from "prettier";
// @ts-ignore
import { Tools } from "@/config/config";

const configFolder = "config";

async function getSearchMeta() {
  try {
    let json: any = [];

    for (const tool of Tools) {
      try {
        json.push(
          ...[
            {
              content: tool.title,
              type: "lvl1",
              url: tool.href,
              hierarchy: {
                lvl1: tool.keywords.split(",").join(" "),
                lvl2: tool.description,
              },
            },
          ]
        );
      } catch (error) {}
    }

    // Uncomment this to see save json into a file
    json = prettier.format(JSON.stringify(json), { parser: "json" });

    // create a folder if it doesn't exist
    if (!fs.existsSync(`${configFolder}`)) {
      fs.mkdirSync(`${configFolder}`);
    }

    const outPath = path.join(
      process.cwd(),
      `${configFolder}`,
      "search-meta.json"
    );

    fs.writeFileSync(outPath, json);

    console.log("[NextUI] Search meta is ready ✅");

    return;
  } catch (error) {
    console.error(`[ERROR 🔥]:`, error);
  }
}

getSearchMeta();
