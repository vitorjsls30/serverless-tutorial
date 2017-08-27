import dynamodb from 'serverless-dynamodb-client';
import uuid from 'uuid';

class TacoGallery {
  constructor() {
      this.db = dynamodb.doc;
  }

  hello(event) {
    return {
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event
    };
  }

  saveTaco(tacoName, tacoDescription) {
    let id = uuid.v4();
    var params = {
      TableName: 'TacoGallery',
      Item: {
        id: id,
        name: tacoName,
        description: tacoDescription
      }
    }

    return this.db.put(params).promise().then(data => {
      data = Object.assign({id: id}, data);
      return data;
    });
  }
}

module.exports = TacoGallery;
