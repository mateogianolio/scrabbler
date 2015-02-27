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
  
  // generate power set
  power(string)
    .forEach(function(element) {
      if(element.length > 1)
        set.push(element.join(''));
    });
  
  // permutate
  set = set.map(permute);
  
  // flatten
  for(var i = 0; i < set.length; i++)
    for(var j = 0; j < set[i].length; j++)
      words.push(set[i][j]);
  
  // remove duplicates
  words = uniq_fast(words);
  
  // logic exec time
  end = process.hrtime(start);
  var logic_time = end.pop() / 1000000000 + end.pop();

  var query = 'SELECT word, score FROM words WHERE word IN ("' + words.join('", "') + '")';
  db.each(query, function(error, row) {
    if(error)
      throw error;
    
    if(!row)
      return;
    
    output.words.push({
      word: row.word,
      score: row.score
    });
    
    output.score_total += row.score;
  }, function(error, num_rows) {
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

// helper to generate a power set
function power(set) {
	return [].slice.call(set).reduce(
		function(previous, current) {
      var copy = previous.slice(0);
			copy.forEach(function(e) {
				var e2 = e.slice(0);
				e2.push(current);
				previous.push(e2);
			});
			return previous;
		},
		[[]]
	);
}

// helper to generate string permutations
function permute(str){
  var words = [];
  
  function rearrange(str, prefix) {
    var i, singleChar, balanceStr, word;
 
    //The first time round, prefix will be empty
    prefix = prefix || '';
    
    //Loop over the str to separate each single character
    //from the rest of it's characters
    for(i = 0; i < str.length; i++) {
      singleChar = str[i];
      balanceStr = str.slice(0, i) + str.slice(i+1);
      
      //join the prefix with each of the combinations
      word = prefix + singleChar + balanceStr;
 
      //Inject this word only if it does not exist
      if(words.indexOf(word) < 0)
        words.push(word);
      
      //Recursively call this function in case there are balance characters
      if(balanceStr.length > 1)
        rearrange(balanceStr, prefix + singleChar);
    }
  }
  
  //kick start recursion
  rearrange(str);
  return words;
}