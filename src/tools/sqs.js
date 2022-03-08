const AWS = require('aws-sdk');
const credentials = {
  accessKeyId: process.env.AWS_SQS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SQS_SECRET_ACCESS_KEY
}
AWS.config.update({region: 'us-east-2', credentials});

const sqs = new AWS.SQS({apiVersion: '2022-03-07'});

async function sendMessage(event) {
  const params = {
    MessageAttributes: {
      Title: {
        DataType: "String",
        StringValue: event.title,
      }
    },
    MessageDeduplicationId: event.group,
    MessageGroupId: event.group,
    MessageBody: event.message,
    QueueUrl: process.env.AWS_SQS_URL
  };

  sqs.sendMessage(params, function(err, data){
    if(err) {
      return err
    } else {
      return 'Message sent to queue!'
    }
  })
}

module.exports = sendMessage;