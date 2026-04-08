import cliProgress from "cli-progress";
import fs from "fs";
import { getEncoding, TiktokenModel } from "./encoding";

export const DEFAULT_MODEL: TiktokenModel = "gpt-4";

export function countTokens(message: string, model: TiktokenModel = DEFAULT_MODEL): number {
    const encoding = getEncoding(model);
    const tokens = encoding.encode(message);
    return tokens.length;
}

export function countTokensForFile(filePath: string, model: TiktokenModel = DEFAULT_MODEL): number {
    const content = fs.readFileSync(filePath, "utf-8");
    return countTokens(content, model);
}

export interface TokensCount {
    filePath: string;
    tokens: number;
}

export function countTokensForFiles(filePaths: string[], model: TiktokenModel = DEFAULT_MODEL): TokensCount[] {
    const uniqueFilePaths = Array.from(new Set(filePaths)).sort();

    const progressBar = new cliProgress.SingleBar({
        format: "Counting Tokens |{bar}| {percentage}% || {value}/{total} Files",
        barCompleteChar: "\u2588",
    });
    progressBar.start(uniqueFilePaths.length, 0);

    const counts: TokensCount[] = uniqueFilePaths.map((filePath) => {
        const tokens = countTokensForFile(filePath, model);
        progressBar.increment();
        return { filePath, tokens };
    });

    progressBar.stop();

    counts.sort((a, b) => b.tokens - a.tokens);
    return counts;
}