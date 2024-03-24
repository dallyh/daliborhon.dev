import yaml from "js-yaml";
import fs from "node:fs";
import path from "node:path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const folderName = path.resolve(__dirname, "../messages/en");
const outputFileName = "en.json";
const jsonFiles = fs.readdirSync(folderName).filter((file) => file.endsWith(".json"));

let bundledData: any = {};

jsonFiles.forEach((file) => {
    const filePath = path.join(folderName, file);
    console.log("Working on file: " + filePath);

    const jsonData = fs.readFileSync(filePath, "utf8");
    const parsedData = JSON.parse(jsonData);

    const prefix = path.parse(file).name + "__";

    Object.keys(parsedData).forEach((key) => {
        const prefixedKey = prefix + key;
        bundledData[prefixedKey] = parsedData[key];
    });
});

console.log(bundledData);

const outputFilePath = path.join(folderName, outputFileName);
console.log("Saving bundled file to: " + outputFilePath);
fs.writeFileSync(outputFilePath, JSON.stringify(bundledData, null, 2), "utf8");

console.log("Bundle created successfully!");
