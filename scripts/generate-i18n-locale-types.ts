// npx ts-node --esm file.ts

import { quicktype, InputData, jsonInputForTargetLanguage, TypeScriptTargetLanguage } from "quicktype-core";
import fs from "node:fs";
import path from "node:path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import jsyaml from "js-yaml";
import { Console } from "node:console";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Only generate types from EN folder
const folderName = path.resolve(__dirname, "../src/i18n/locales/en/");
const typeFile = path.resolve(__dirname, "../src/i18n/locales/types.ts");
console.log("Working on folder: " + folderName);

async function processFiles() {
    console.log("Truncatng file: " + typeFile);
    fs.truncateSync(typeFile);

    const files = fs.readdirSync(folderName);
    for (const file of files) {
        const filePath = path.resolve(folderName, file);
        const fileName = path.parse(filePath).name;

        console.log("Working on file: " + filePath);
        if (path.parse(filePath).ext !== ".yaml") {
            console.log("Skipping file...");
            continue;
        }

        console.log("Loading YAML...");
        const doc = jsyaml.load(fs.readFileSync(filePath, "utf8"));

        console.log("Parsing JSON...");
        const types = await quicktypeJSON(fileName, JSON.stringify(doc));
        const lines = types.lines;

        console.log("Writing types to file...");
        const newline = "\n";
        for (const line of lines) {
            let content = line;
            content += newline;
            fs.appendFileSync(typeFile, content);
        }

        console.log("File processing finished!");
    }

    console.log("All files processed.");
}

async function quicktypeJSON(typeName: string, json: string) {
    const jsonInput = jsonInputForTargetLanguage(new TypeScriptTargetLanguage());
    jsonInput.addSourceSync({
        name: `${typeName}Res`,
        samples: [json],
    });

    const inputData = new InputData();
    inputData.addInput(jsonInput);

    const types = await quicktype({
        inputData,
        lang: new TypeScriptTargetLanguage(),
        inferMaps: false,
        rendererOptions: { "just-types": "true", "prefer-types": "true" },
    });

    return types;
}

processFiles();
