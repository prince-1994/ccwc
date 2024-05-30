import { wc } from "../src/wc";
import { expect, test } from "bun:test";

test("wc for small text", async () => {
    const file = "tests/test-small.txt";
    const results = await wc({ c: true, w: true, l: true, m: true }, [file]);
    expect(results).toEqual([{ result: [11, 58, 345, 345], path: file }]);
});

test("wc for big text", async () => {
    const file = "tests/test-big.txt";
    const results = await wc({ c: true, w: true, l: true, m: true }, [file]);
    expect(results).toEqual([
        { result: [7145, 58164, 339292, 342190], path: file },
    ]);
});

test("wc for empty text", async () => {
    const file = "tests/test-empty.txt";
    const results = await wc({ c: true, w: true, l: true, m: true }, [file]);
    expect(results).toEqual([{ result: [0, 0, 0, 0], path: file }]);
});

test("wc for all texts", async () => {
    const file = "tests/test-small.txt tests/test-big.txt tests/test-empty.txt";
    const results = await wc(
        { c: true, w: true, l: true, m: true },
        file.split(" ")
    );
    expect(results).toEqual([
        { result: [7145, 58164, 339292, 342190], path: "tests/test-big.txt" },
        { result: [0, 0, 0, 0], path: "tests/test-empty.txt" },
        { result: [11, 58, 345, 345], path: "tests/test-small.txt" },
        { result: [7156, 58222, 339637, 342535], path: "total" },
    ]);
});
