const AWS = require('aws-sdk');

const credentials = {
  accessKeyId: process.env.AWS_SQS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SQS_SECRET_ACCESS_KEY,
};
AWS.config.update({ region: 'us-east-2', credentials });

const sqs = new AWS.SQS({ apiVersion: '2022-03-07' });

async function sendMessage(event) {
  const params = {
    MessageAttributes: {
      Title: {
        DataType: 'String',
        StringValue: event.title,
      },
    },
    MessageBody: event.message,
    QueueUrl: process.env.AWS_SQS_URL,
  };

  sqs.sendMessage(params, (err, data) => {
    if (err) {
      return err;
    }
    return `Message sent to queue!: ${JSON.stringify(data)}`;
  });
}

module.exports = sendMessage;
