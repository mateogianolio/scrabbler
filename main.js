var fs = require('fs');

var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
               'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

exports.get = function(string, callback) {
  var time = process.hrtime();
  var start = time.pop() / 1000000000 + time.pop();
  
  var count = 0;
  var output = {
    words: [],
    score_total: 0
  };
  
  var words = uniq_fast(combinations(string));
  
  letters.forEach(function(letter) {
    if(string.indexOf(letter) !== -1) {
      var data = fs.readFileSync('words/' + letter + '.json');
      data = JSON.parse(data);
      
      if(data === null)
        callback('failed to read words/' + letter + '.json', null);
      
      words.forEach(function(word) {
        word = word.toLowerCase();
        if(word[0] === letter) {
          data.forEach(function(object) {
            if(word === object.word) {
              output.words.push({
                word: word,
                score: object.points
              });
              output.score_total += object.points;
              count++;
            }
          });
        }
      });
    }
  });
  
  // fraction of combinations being valid words
  output.fraction = count / words.length;
  
  // execution time
  time = process.hrtime();
  output.time = (time.pop() / 1000000000 + time.pop()) - start;
  
  // sort by word length, then alphabetically
  output.words.sort(function(a, b) {
    if(a.word.length < b.word.length) return -1;
    if(a.word.length > b.word.length) return 1;
    if(a.word < b.word) return -1;
    if(a.word > b.word) return 1;
    
    return 0;
  });
  
  callback(null, output);
};

// helper to remove duplicates from array
function uniq_fast(a) {
  var seen = {};
  var out = [];
  var len = a.length;
  var j = 0;
  for(var i = 0; i < len; i++) {
     var item = a[i];
     if(seen[item] !== 1) {
       seen[item] = 1;
       out[j++] = item;
     }
  }
  return out;
}

// helper to find all combinations of letters from a string
function combinations(str) {
  var fn = function(active, rest, a) {
    if(!active && !rest)
      return;
    if(!rest) {
      a.push(active);
    } else {
      fn(active + rest[0], rest.slice(1), a);
      fn(active, rest.slice(1), a);
    }
    return a;
  }
  return fn("", str, []).concat(fn("", str.split('').reverse().join(''), []));
}