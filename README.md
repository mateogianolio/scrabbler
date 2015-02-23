# Scrabbler

Generates all valid english words from a given combination of letters and scores them according to scrabble rules.

```bash
$ scrabbler cool
{ words: 
   [ { word: 'lo', score: 2 },
     { word: 'oo', score: 2 },
     { word: 'col', score: 5 },
     { word: 'coo', score: 5 },
     { word: 'loo', score: 3 },
     { word: 'cool', score: 6 } ],
  score_total: 23,
  fraction: 0.3333333333333333,
  time: 0.06150672404328361 }
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

```
{
```

**```words: [```**
  * ```word:```
    * A string with the generated word.
  * ```score:```
    * The score of the generated word.

**```], score_total:```**
  * Total score of generated words.

**```, fraction:```**
  * Fraction of the total unique letter combinations that resulted in valid words. The total unique letter combinations found can be calculated with ```words.length / fraction```.

**```, time:```**
  * Execution time.

```
}
```

## Example

See test output below.

```bash
$ npm test

> scrabbler@1.0.0 test /Users/mateogianolio/Desktop/projects/scrabbler
> node test.js scrabbler

{ words: 
   [ { word: 'ab', score: 4 },
     { word: 'ae', score: 2 },
     { word: 'al', score: 2 },
     { word: 'ar', score: 2 },
     { word: 'as', score: 2 },
     { word: 'ba', score: 4 },
     { word: 'be', score: 4 },
     { word: 'ea', score: 2 },
     { word: 'el', score: 2 },
     { word: 'er', score: 2 },
     { word: 'es', score: 2 },
     { word: 'la', score: 2 },
     { word: 're', score: 2 },
     { word: 'abb', score: 7 },
     { word: 'ale', score: 3 },
     { word: 'arc', score: 5 },
     { word: 'ars', score: 3 },
     { word: 'bac', score: 7 },
     { word: 'bar', score: 5 },
     { word: 'bas', score: 5 },
     { word: 'cab', score: 7 },
     { word: 'car', score: 5 },
     { word: 'ear', score: 3 },
     { word: 'eas', score: 3 },
     { word: 'ebb', score: 7 },
     { word: 'els', score: 3 },
     { word: 'ers', score: 3 },
     { word: 'lac', score: 5 },
     { word: 'lar', score: 3 },
     { word: 'las', score: 3 },
     { word: 'ras', score: 3 },
     { word: 'reb', score: 5 },
     { word: 'rec', score: 5 },
     { word: 'res', score: 3 },
     { word: 'sab', score: 5 },
     { word: 'sae', score: 3 },
     { word: 'sal', score: 3 },
     { word: 'sar', score: 3 },
     { word: 'ser', score: 3 },
     { word: 'abbe', score: 8 },
     { word: 'able', score: 6 },
     { word: 'arcs', score: 6 },
     { word: 'bacs', score: 8 },
     { word: 'bars', score: 6 },
     { word: 'crab', score: 8 },
     { word: 'ears', score: 4 },
     { word: 'ebbs', score: 8 },
     { word: 'lacs', score: 6 },
     { word: 'lars', score: 4 },
     { word: 'rale', score: 4 },
     { word: 'rear', score: 4 },
     { word: 'rebs', score: 6 },
     { word: 'recs', score: 6 },
     { word: 'sabe', score: 6 },
     { word: 'sale', score: 4 },
     { word: 'scab', score: 8 },
     { word: 'scar', score: 6 },
     { word: 'abler', score: 7 },
     { word: 'caber', score: 9 },
     { word: 'cable', score: 9 },
     { word: 'rears', score: 5 },
     { word: 'rebar', score: 7 },
     { word: 'saber', score: 7 },
     { word: 'sable', score: 7 },
     { word: 'scale', score: 7 },
     { word: 'scrab', score: 9 },
     { word: 'scrae', score: 7 },
     { word: 'cabler', score: 10 },
     { word: 'rabble', score: 10 },
     { word: 'rebars', score: 8 },
     { word: 'scaler', score: 8 },
     { word: 'crabber', score: 13 },
     { word: 'rabbler', score: 11 },
     { word: 'scabble', score: 13 },
     { word: 'scrabble', score: 14 },
     { word: 'scrabbler', score: 15 } ],
  score_total: 426,
  fraction: 0.10354223433242507,
  time: 0.8332852700259537 }
```