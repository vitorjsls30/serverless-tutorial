import dynalite from 'dynalite';
import AWS from 'aws-sdk';

var dynaliteServer = dynalite({createTableMs: 50});

module.exports.mockDB = () => {
  AWS.config.update({
    region: 'us-west-2',
    endpoint: 'http://localhost:4567'
  });

  var dynamodb = new AWS.DynamoDB();

  return new Promise((resolve, reject) => {
    dynaliteServer.listen(4567, (err)=> {
      dynamodb.listTables({}, (err, data) => {
        if(err) {
          console.log(err, err.stack);
        }
        else if(data.TableNames.length <= 0) {
            console.log('creating table...');
            console.log('data.TableNames.length:', data.TableNames.length);
            dynamodb.createTable({
              TableName: 'TacoGallery',
              KeySchema: [
                {AttributeName: 'id', KeyType: 'HASH'},//Partition Key
                {AttributeName: 'name', KeyType: 'RANGE'}//Sort kEY
              ],
              AttributeDefinitions: [
                {AttributeName: 'id', AttributeType: 'S'},
                {AttributeName: 'name', AttributeType: 'S'}
              ],
              ProvisionedThroughput: {
                ReadCapacityUnits: 10,
                WriteCapacityUnits: 10
              }
            },
              (err, data) => {
                if(err) {
                  reject(err);
                  console.log('Unable to create table. Error JSON: ', JSON.stringify(err));
                } else {
                  setTimeout(() => {
                    resolve(data);
                  }, 1000);
                }
            });
          } else {
          resolve();
        }
      });
    });
  });
};
