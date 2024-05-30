# CCWC

This is solution for the 1st challenge on CodingChallenges series by John Crickett.
https://codingchallenges.fyi/challenges/challenge-wc

Challenge - Write your own wc tool

## Description

This repo is an implementation of unix wc tool in Typescript using bun.js as runtime. The `src/wc.ts` implements the wc tool logic. The `index.ts` implements a wrapper to be used from command line.

The package.json has scripts which can be run to compile the src into in a single executable.

## Usage

To install dependencies:

```bash
bun i
```

To compile:

```bash
bun build-exe
```

To use:

```bash
$ echo 'hello' | ./exe/ccwc
    1       1       6
$ cat tests/test-big.txt | ./exe/ccwc
    7145   58164  342190
$ ./exe/ccwc tests/test-big.txt
    7145   58164  342190 tests/test-big.txt
$ ./exe/ccwc -c tests/test-big.txt
    342190      tests/test-big.txt
```

The following options are supported:

- `-w`: prints the number of words in the file
- `-l`: prints the number of lines in the file
- `-c`: prints the number of bytes in the file
- `-m`: prints the number of characters in the file

## Run Tests

```bash
bun test
```
