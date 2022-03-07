const AWS = require('aws-sdk');
const credentials = {
  accessKeyId: 'AKIAR4FFMQNOWPPYP2OE',
  secretAccessKey: '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'
}
AWS.config.update({region: 'us-east-2', credentials});

const sqs = new AWS.SQS({apiVersion: '2022-03-07'});

function sendMessage(event) {
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
    QueueUrl: 'https://sqs.us-east-2.amazonaws.com/129195869021/videogamesInventoryQueue.fifo'
  };

  sqs.sendMessage(params, function(err, data){
    if(err) {
      console.log(err)
      return err
    } else {
      console.log('message sent!')
      return 'Message sent to queue!'
    }
  })
}

module.exports = sendMessage;