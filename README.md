# Scrabbler

Generates all valid english words from a given combination of letters and scores them according to scrabble rules.

## Installation

Clone or install via ```npm```

```bash
$ npm install scrabbler [-g]
```

Test with (scroll down to see example test output)

```bash
$ npm test
```

## Usage

If installed with ```npm install -g```, run with

```bash
$ scrabbler <string>
```

Include in your project with

```javascript
var scrabbler = require('scrabbler');
```

## Methods

```javascript
scrabbler.get = function(string, callback)
```

* **```string```**
    * Any alphabetical string.
* **```callback(error, data)```**
    * ```error```
      * Error message or ```null```.
    * ```data```
      * A ```JSON``` object containing the generated words.

## Output format

* **```words```**
    * A list of generated words.
    * ```word```
      * A string with the generated word.
    * ```score```
      * The score of the generated word.
* **```score_total```**
    * Total score of generated words.
* **```fraction```**
    * Fraction of the total unique letter combinations that resulted in valid words. The total unique letter combinations found can be calculated with ```words.length / fraction```.
* **```time```**
    * Execution time.

## Example

See test output below.

```bash
$ npm test

> scrabbler@1.0.0 test /path/to/scrabbler
> node test.js testing

{ words: 
   [ { word: 'en', score: 2 },
     { word: 'es', score: 2 },
     { word: 'et', score: 2 },
     { word: 'gi', score: 3 },
     { word: 'in', score: 2 },
     { word: 'is', score: 2 },
     { word: 'it', score: 2 },
     { word: 'ne', score: 2 },
     { word: 'si', score: 2 },
     { word: 'st', score: 2 },
     { word: 'te', score: 2 },
     { word: 'ti', score: 2 },
     { word: 'eng', score: 4 },
     { word: 'est', score: 3 },
     { word: 'get', score: 4 },
     { word: 'gie', score: 4 },
     { word: 'gis', score: 4 },
     { word: 'git', score: 4 },
     { word: 'its', score: 3 },
     { word: 'net', score: 3 },
     { word: 'nie', score: 3 },
     { word: 'nis', score: 3 },
     { word: 'nit', score: 3 },
     { word: 'set', score: 3 },
     { word: 'sin', score: 3 },
     { word: 'teg', score: 4 },
     { word: 'ten', score: 3 },
     { word: 'tes', score: 3 },
     { word: 'tet', score: 3 },
     { word: 'tig', score: 4 },
     { word: 'tin', score: 3 },
     { word: 'gist', score: 5 },
     { word: 'gite', score: 5 },
     { word: 'gits', score: 5 },
     { word: 'nite', score: 4 },
     { word: 'nits', score: 4 },
     { word: 'sing', score: 5 },
     { word: 'test', score: 4 },
     { word: 'ting', score: 5 },
     { word: 'sting', score: 6 },
     { word: 'testing', score: 8 } ],
  score_total: 140,
  fraction: 0.18222222222222223,
  time: 0.20501972798956558 }
```