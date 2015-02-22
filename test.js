var combinations = require('./main.js');

var argv = process.argv;
if(argv.length !== 3) {
  console.log('wrong number of args');
  return;
}

combinations.get(argv.pop(), function(error, data) {
  if(error)
    throw error;
  
  console.log(data);
});