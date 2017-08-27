import {hello, saveTaco} from './handler';
import {mockDB} from './TestUtils.util';

import {assert} from 'chai';

describe('Taco Gallery Tests', ()=>{

  before(function(done) {
    this.timeout(50000);
    mockDB().then((data) => {
      done();
    })
    .catch((err) => {
      assert(false, 'Could not create the mock DB');
      done();
    });
  });

  it('The Hello Function Should Work', (done) => {
    var event = {};
    var context = {};
    var callback = function(ctx, data) {
      console.log(data);
      done();
    };
    hello(event, context, callback);
  });

  it('Should save a taco', function() {
    return new Promise((resolve, reject) => {
      var event = {
        body: '{"name": "Al pastor", "description": "Delicious taco!"}'
      };
      var context = {};
      var callback = (ctx, data) => {
        if(data.statusCode == 200) {
          resolve(data);
        }
        else {
          reject(data);
        }
      };
      saveTaco(event, context, callback);
    });
  });
});
