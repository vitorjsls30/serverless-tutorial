'use strict';

import TacoGallery from './TacoGallery';

module.exports.hello = (event, context, callback) => {
  var tacoGallery = new TacoGallery();

  const response = {
    statusCode: 200,
    body: JSON.stringify(tacoGallery.hello(event)),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};

module.exports.saveTaco = (event, context, callback) => {
    var tacoGallery = new TacoGallery();
    var params = JSON.parse(event.body);

    tacoGallery.saveTaco(params.name, params.description)
      .then( data => {
        const response = {
          statusCode : 200,
          body: JSON.stringify(data)
        };
        callback(null, response);
      })
      .catch(err => {
        const response = {
          statusCode: 409,
          body: JSON.stringify({
            message: 'Could not save the taco',
            stack: err
          })
        };
        callback(null, response);
      });
};
