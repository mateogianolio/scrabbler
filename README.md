# Scrabbler

Generates all valid english words from a given combination of letters and scores them according to the [scrabble tile distribution](http://boardgames.about.com/od/scrabble/a/tile_distribute.htm). Uses the [SOWPODS dictionary](http://en.wikipedia.org/wiki/SOWPODS).

```bash
$ scrabbler cool
{ words: 
   [ { word: 'oo', score: 2 },
     { word: 'coo', score: 5 },
     { word: 'cool', score: 6 },
     { word: 'col', score: 5 },
     { word: 'loco', score: 6 },
     { word: 'lo', score: 2 },
     { word: 'loo', score: 3 } ],
  score_total: 29,
  fraction: 0.22580645161290322,
  query_time: 0.010557988,
  logic_time: 0.001067015 }
```

## Installation

Clone or install via ```npm```

```bash
$ npm install scrabbler [-g]
```

Test (see example test output below) with

```bash
$ npm test
```

## Usage

If globally installed, run with

```bash
$ scrabbler <string>
```

## Methods

```javascript
var scrabbler = require('scrabbler');
```

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
    * ```word```
      * A string with the generated word.
    * ```score```
      * The score of the generated word.
* **```score_total```**
    * Total score of generated words.
* **```fraction```**
    * Fraction of the total unique letter combinations that resulted in valid words. The total unique letter combinations found can be calculated with ```words.length / fraction```.
* **```query_time```**
    * SQLite query execution time.
* **```logic_time```**
    * Logic execution time (power set and permutation).

## Example

See test output below.

```bash
$ npm test

> scrabbler@1.1.1 test /path/to/scrabbler
> node test/test.js testing

{ words: 
   [ { word: 'et', score: 2 },
     { word: 'te', score: 2 },
     { word: 'es', score: 2 },
     { word: 'tes', score: 3 },
     { word: 'est', score: 3 },
     { word: 'st', score: 2 },
     { word: 'set', score: 3 },
     { word: 'tet', score: 3 },
     { word: 'test', score: 4 },
     { word: 'tets', score: 4 },
     { word: 'stet', score: 4 },
     { word: 'sett', score: 4 },
     { word: 'ti', score: 2 },
     { word: 'it', score: 2 },
     { word: 'tie', score: 3 },
     { word: 'si', score: 2 },
     { word: 'is', score: 2 },
     { word: 'tis', score: 3 },
     { word: 'sit', score: 3 },
     { word: 'its', score: 3 },
     { word: 'sei', score: 3 },
     { word: 'ties', score: 4 },
     { word: 'stie', score: 4 },
     { word: 'site', score: 4 },
     { word: 'tit', score: 3 },
     { word: 'tite', score: 4 },
     { word: 'tits', score: 4 },
     { word: 'en', score: 2 },
     { word: 'ne', score: 2 },
     { word: 'ten', score: 3 },
     { word: 'net', score: 3 },
     { word: 'ens', score: 3 },
     { word: 'sen', score: 3 },
     { word: 'tens', score: 4 },
     { word: 'sten', score: 4 },
     { word: 'sent', score: 4 },
     { word: 'nets', score: 4 },
     { word: 'nest', score: 4 },
     { word: 'tent', score: 4 },
     { word: 'nett', score: 4 },
     { word: 'tents', score: 5 },
     { word: 'stent', score: 5 },
     { word: 'netts', score: 5 },
     { word: 'in', score: 2 },
     { word: 'tin', score: 3 },
     { word: 'nit', score: 3 },
     { word: 'nie', score: 3 },
     { word: 'tine', score: 4 },
     { word: 'nite', score: 4 },
     { word: 'sin', score: 3 },
     { word: 'ins', score: 3 },
     { word: 'nis', score: 3 },
     { word: 'tins', score: 4 },
     { word: 'snit', score: 4 },
     { word: 'nits', score: 4 },
     { word: 'sien', score: 4 },
     { word: 'sine', score: 4 },
     { word: 'nies', score: 4 },
     { word: 'tines', score: 5 },
     { word: 'stein', score: 5 },
     { word: 'senti', score: 5 },
     { word: 'sient', score: 5 },
     { word: 'inset', score: 5 },
     { word: 'neist', score: 5 },
     { word: 'nites', score: 5 },
     { word: 'tint', score: 4 },
     { word: 'ettin', score: 5 },
     { word: 'tints', score: 5 },
     { word: 'stint', score: 5 },
     { word: 'ettins', score: 6 },
     { word: 'sitten', score: 6 },
     { word: 'teg', score: 4 },
     { word: 'get', score: 4 },
     { word: 'seg', score: 4 },
     { word: 'tegs', score: 5 },
     { word: 'gets', score: 5 },
     { word: 'gest', score: 5 },
     { word: 'tig', score: 4 },
     { word: 'gi', score: 3 },
     { word: 'git', score: 4 },
     { word: 'gie', score: 4 },
     { word: 'tige', score: 5 },
     { word: 'gite', score: 5 },
     { word: 'geit', score: 5 },
     { word: 'gis', score: 4 },
     { word: 'tigs', score: 5 },
     { word: 'gits', score: 5 },
     { word: 'gist', score: 5 },
     { word: 'egis', score: 5 },
     { word: 'gies', score: 5 },
     { word: 'tiges', score: 6 },
     { word: 'geits', score: 6 },
     { word: 'geist', score: 6 },
     { word: 'gites', score: 6 },
     { word: 'eng', score: 4 },
     { word: 'neg', score: 4 },
     { word: 'gen', score: 4 },
     { word: 'gent', score: 5 },
     { word: 'engs', score: 5 },
     { word: 'negs', score: 5 },
     { word: 'gens', score: 5 },
     { word: 'gents', score: 6 },
     { word: 'gin', score: 4 },
     { word: 'ting', score: 5 },
     { word: 'gien', score: 5 },
     { word: 'tinge', score: 6 },
     { word: 'sing', score: 5 },
     { word: 'sign', score: 5 },
     { word: 'snig', score: 5 },
     { word: 'gins', score: 5 },
     { word: 'tings', score: 6 },
     { word: 'sting', score: 6 },
     { word: 'sengi', score: 6 },
     { word: 'segni', score: 6 },
     { word: 'singe', score: 6 },
     { word: 'tinges', score: 7 },
     { word: 'signet', score: 7 },
     { word: 'ingest', score: 7 },
     { word: 'testing', score: 8 },
     { word: 'setting', score: 8 } ],
  score_total: 514,
  fraction: 0.01712817584927205,
  query_time: 0.49454238,
  logic_time: 0.416473095 }
```

## Contribute

Tips on how to improve performance are highly appreciated. Feel free to fork and submit pull requests.