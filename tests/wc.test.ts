import { getCounts, wc } from "../src/wc";
import { expect, test } from "bun:test";

test("getCounts for small text",async () => {
    const input = Buffer.from(await Bun.file("tests/test-small.txt").arrayBuffer());
    const result = getCounts(input, true, true, true, true);
    expect(result).toEqual([345, 345, 58, 11]);
})

test("getCounts for big text",async () => {
    const input = Buffer.from(await Bun.file("tests/test-big.txt").arrayBuffer());
    const result = getCounts(input, true, true, true, true);
    expect(result).toEqual([342190,339292, 58164, 7145]);
})

test("getCounts for empty text",async () => {
    const input = Buffer.from(await Bun.file("tests/test-empty.txt").arrayBuffer());
    const result = getCounts(input, true, true, true, true);
    expect(result).toEqual([0,0,0,0]);
})

test("wc",async () => {
    wc({}, ["tests/test-big.txt"]);
    wc({}, ["tests/test-small.txt"]);
    wc({}, ["tests/test-empty.txt"]);
    wc({}, ["tests/test-not-exist.txt"]);
})