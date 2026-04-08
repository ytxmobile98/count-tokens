import { countTokensForFiles } from "./count";
import fs from "fs";


function main() {
    const args = process.argv.slice(2);
    if (args.length === 0) {
        console.error(`Usage: node ${__filename} FILE_PATH [FILE_PATH...]`);
        console.error("Please provide one or more file paths as arguments.");
        process.exit(1);
    }

    const filePaths: string[] = args;
    for (const filePath of filePaths) {
        if (!fs.existsSync(filePath)) {
            console.error(`File not found: ${filePath}`);
            continue;
        }
    }

    const tokensCount = countTokensForFiles(filePaths);
    for (const { filePath, tokens: tokenCount } of tokensCount) {
        console.log(`"${filePath}": ${tokenCount} tokens`);
    }
}

main();