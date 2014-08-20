var less = require('less');
var tree = less.tree;
var _ = require('lodash');
var util = require('util');

var env = new less.tree.parseEnv({});
var evalEnv = new less.tree.evalEnv({});
var parser = new(less.Parser)(env);

function lessVars(data, done) {
  parser.parse(data, function(err, root){
    if(exists(err)) return done(err);

    evalEnv.frames = [new(tree.Ruleset)(null, root.variables())];
    var evaldRoot = root.eval(evalEnv);
    evaldRoot.resetCache();
    
    var result = _.mapValues(evaldRoot.variables(), getVarValue);
    done(null, result);
  });
}

function getVarValue(variable){
  return variable.value.eval();
}

function exists(x){
  return !_.isNull(x) && !_.isUndefined(x);
}

module.exports = lessVars;
