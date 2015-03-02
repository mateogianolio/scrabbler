var levelup = require('level');
var db = levelup(__dirname + '/db');

exports.get = function(string, callback) {
  var output = {
    words: [],
    score_total: 0
  };
  
  var logic_time,
      query_time,
      start,
      end;
  
  // start timing
  start = process.hrtime();
  
  // generate power set
  var set = power(string);
  
  // cache length for performance
  var set_length = set.length,
      element;
  
  // permute power set
  for(i = 0; i < set_length; i++) {
    element = set[i].join('');
    set[i] = permute(element);
  }
  
  var words = [];
  set_length = set.length;
  
  // flatten and deduplicate
  for(i = 0; i < set_length; i++) {
    for(j = 0; j < set[i].length; j++) {
      element = set[i][j];

      if(element.length > 1 && words.indexOf(element) === -1)
        words.push(element);
    }
  }
  
  // logic exec time
  end = process.hrtime(start);
  logic_time = end.pop() / 1000000000 + end.pop();

  var words_length = words.length;
  
  // start looking up words
  for(i = 0; i < words_length; i++)
    find(words[i]);
  
  var count = 0,
      fail_count = 0;
  
  function find(word) {
    db.get(word, function(error, score) {
      if(error) {
        if(!error.notFound)
          callback(error, null);

        ++fail_count;
      } else {
        output.words.push({
          word: word,
          score: parseInt(score)
        });

        output.score_total += parseInt(score);
      }

      // use counter because call order may not remain constant
      if((++count) === words_length)
        done();
    });
  }
  
  function done() {
    // fraction of combinations being valid words
    output.fraction = (words_length - fail_count) / words_length;

    // total exec time
    end = process.hrtime(start);
    total_time = end.pop() / 1000000000 + end.pop();

    output.query_time = total_time - logic_time;
    output.logic_time = logic_time;

    callback(null, output);
  }
};

// helper to generate a power set
function power(string) {
  var copy,
      deep_copy;
  
  return [].slice.call(string).reduce(function(previous, current) {
    copy = previous.slice(0);
    copy.forEach(function(element) {
      deep_copy = element.slice(0);
      deep_copy.push(current);
      previous.push(deep_copy);
    });

    return previous;
  }, [[]]);
}

// helper to generate string permutations
function permute(string){
  var words = [];
  
  function permute(string, prefix) {
    var balance,
        word,
        i,
        c;
    
    prefix = prefix || '';
    
    // loop over str to separate each single character
    for(i = 0; i < string.length; i++) {
      c = string[i];
      balance = string.slice(0, i) + string.slice(i + 1);
      
      // join the prefix with each of the combinations
      word = prefix + c + balance;
 
      // inject this word only if it does not exist
      if(words.indexOf(word) < 0)
        words.push(word);
      
      // recursively call this function in case there are balance characters
      if(balance.length > 1)
        permute(balance, prefix + c);
    }
  }
  
  permute(string);
  return words;
}