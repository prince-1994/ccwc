#!/usr/bin/env bun
import { parseArgs } from "util";
import { printResult, wc } from "./wc";

export async function main() {
    const { values, positionals } = parseArgs({
        args: Bun.argv,
        options: {
            c: {
                type: "boolean",
                default: false,
            },
            l: {
                type: "boolean",
                default: false,
            },
            w: {
                type: "boolean",
                default: false,
            },
            m: {
                type: "boolean",
                default: false,
            },
        },
        strict: false,
        allowPositionals: true,
    });
    const results = await wc(values, positionals.slice(2));
    for (const result of results) {
        printResult(result.result, result.path);
    }
}

await main();
