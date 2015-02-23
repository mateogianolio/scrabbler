#! /usr/bin/env node

var scrabbler = require('scrabbler');

var argv = process.argv;
if(argv.length !== 3) {
  console.log('wrong number of args');
  return;
}

scrabbler.get(argv.pop(), function(error, data) {
  if(error)
    throw error;
  
  console.log(data);
});