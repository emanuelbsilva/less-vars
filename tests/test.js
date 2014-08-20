var assert = require('chai').assert;
var fs = require('fs');
var _ = require('lodash');
var lessVars = require('../index.js');
var FIXTURES_PATH = 'tests/fixtures/';

describe('less-vars', function(){

  it('should return vars', function(done){
    getOutput('var-declaration.less', function(err, variables){
      assert.notOk(err);
      assert.ok(variables);
      assert.equal(variables['@seconds'].value, 0.2);
      assert.equal(variables['@pixel'].value, 10);
      assert.equal(variables['@em'].value, 10);
      done();
    });
  });

  it('should return computed vars', function(done){
    getOutput('computed-var.less', function(err, variables){
      assert.notOk(err);
      assert.ok(variables);
      assert.equal(variables['@var1'].value, 10);
      assert.equal(variables['@var2'].value, 20);
      assert.equal(variables['@var3'].value, 30);
      done();
    });
  });

  it('should only return global vars', function(done){
    getOutput('inner-vars.less', function(err, variables){
      assert.notOk(err);
      assert.ok(variables);
      assert.notOk(variables['@innerVar']);
      assert.equal(variables['@outterVar'].value, 20);
      done();
    });
  });

});


// Auxiliary functions
function getOutput(file, done){
  readFixture(file, function(err, data){
    if(exists(err)) return done(err);
    lessVars(data, done);
  });
}

function readFixture(file, done){
  fs.readFile(FIXTURES_PATH + file, { encoding: 'utf-8' }, function(err, data){
    done(err, data);
  });
}

function exists(x){
  return !_.isNull(x) && !_.isUndefined(x);
}
