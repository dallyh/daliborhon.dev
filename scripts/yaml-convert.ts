// npx ts-node --esm file.ts

import fs from "node:fs";
import path from "node:path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import yaml from "js-yaml";

const __dirname = dirname(fileURLToPath(import.meta.url));
const folderName = path.resolve(__dirname, "./src/content/categories/");
console.log("Working on folder: " + folderName);

const files = fs.readdirSync(folderName);
files.forEach((file) => {
    const filePath = `${folderName}\\${file}`;
    console.log("Working on file: " + filePath);

    if (path.parse(filePath).ext === ".yaml") {
        console.log("Skipping file...");
        return;
        
    }

    console.log("Loading and parsing file...");
    const jsonData = fs.readFileSync(filePath, "utf8");
    const parsedData = JSON.parse(jsonData);
    const yamlData = yaml.dump(parsedData);

    const output = path.parse(filePath);
    const outputFilePath = `${output.dir}\\${output.name}.yaml`;
    console.log("Saving file to: " + outputFilePath);
    fs.writeFileSync(outputFilePath, yamlData, "utf8");

});
