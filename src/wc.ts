export function getCounts(
    input: Buffer,
    countBytes: boolean,
    countChars: boolean,
    countWords: boolean,
    countLines: boolean
) {
    const text = input.toString();
    var bytes = null;
    var chars = null;
    var lines = null;
    var words = null;

    if (countChars) {
        chars = text.length;
    }
    if (countBytes) {
        bytes = input.length;
    }
    if (countWords) {
        words = text ? text.trim().split(/\s+/).length : 0;
    }
    if (countLines) {
        lines = text.split(/\r\n|\r|\n/).length - 1;
    }
    return [bytes, chars, words, lines].reverse();
}

export function printResult(result: (number | null)[], path: string = "") {
    console.log(
        result
            .map((x) => x!.toString().padStart(7))
            .join("\t")
            .padStart(10) +
            "\t" +
            path
    );
}

export async function wc(values: any, positionals: string[]) {
    const finalresults: { path: string; result: (number | null)[] }[] = [];
    const results = [];
    if (!values.c && !values.m && !values.w && !values.l) {
        values.c = true;
        values.w = true;
        values.l = true;
    }
    for (const path of positionals) {
        const file = Bun.file(path);
        const input = Buffer.from(await file.arrayBuffer());
        const result = getCounts(
            input,
            values.c as boolean,
            values.m as boolean,
            values.w as boolean,
            values.l as boolean
        ).filter((x) => x != null && x != undefined);
        results.push(result);
        finalresults.push({ path, result });
    }
    if (results.length > 1) {
        const values = results.reduce((a, b) => a.map((x, i) => x! + b[i]!));
        finalresults.push({ path: "total", result: values });
    }

    if (positionals.length == 0) {
        const chunks = [];
        // @ts-ignore: Type 'ReadableStream<Uint8Array>' must have a '[Symbol.asyncIterator]()'
        //method that returns an async iterator.ts(2504)
        for await (const chunk of Bun.stdin.stream()) {
            chunks.push(Buffer.from(chunk));
        }
        const input = Buffer.concat(chunks);
        const result = getCounts(
            input,
            values.c as boolean,
            values.m as boolean,
            values.w as boolean,
            values.l as boolean
        ).filter((x) => x != null && x != undefined);
        finalresults.push({ path: "", result });
    }
    return finalresults.sort((a, b) => a.path.localeCompare(b.path));
}
