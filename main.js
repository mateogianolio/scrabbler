var sqlite3 = require('sqlite3');
var db = new sqlite3.Database(__dirname + '/db/words.db');

exports.get = function(string, callback) {
  var output = {
    words: [],
    score_total: 0
  };
  
  var words = [],
      set = [];
  
  // start timing
  var start = process.hrtime();
  
  // generate power set with permutations
  power(string).forEach(function(element) {
    if(element.length > 1)
      set.push(permute(element.join('')));
  });
  
  // flatten set
  for(var i = 0; i < set.length; i++)
    for(var j = 0; j < set[i].length; j++)
      words.push(set[i][j]);
  
  // remove duplicates
  words = unique(words);
  
  // logic exec time
  end = process.hrtime(start);
  var logic_time = end.pop() / 1000000000 + end.pop();

  var query = 'SELECT word, score FROM words WHERE word IN ("' + words.join('", "') + '")';
  db.each(query, function(error, row) {
    if(error)
      throw error;
    
    // not found
    if(!row)
      return;
    
    output.words.push({
      word: row.word,
      score: row.score
    });
    
    output.score_total += row.score;
  }, function(error, num_rows) {
    if(error)
      throw error;
    
    // fraction of combinations being valid words
    output.fraction = num_rows / words.length;

    // total exec time
    end = process.hrtime(start);
    var total_time = end.pop() / 1000000000 + end.pop();
    
    output.query_time = total_time - logic_time;
    output.logic_time = logic_time;

    callback(null, output);
    
    db.close();
  });
};

// helper to remove duplicates from array
function unique(array) {
  var seen = {},
      out = [],
      len = array.length,
      j = 0;
  
  for(var i = 0; i < len; i++) {
    var item = array[i];
    if(seen[item] !== 1) {
      seen[item] = 1;
      out[j++] = item;
    }
  }
  
  return out;
}

// helper to generate a power set
function power(string) {
  var copy,
      deep_copy;
  
  return [].slice.call(string).reduce( function(previous, current) {
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