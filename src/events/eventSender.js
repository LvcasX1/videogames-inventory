const sendMessage = require('./sqs');

async function sendCreateEvent(data) {
  const messageParams = {
    title: 'Create',
    group: 'Create',
    message: JSON.stringify(data),
  };

  await sendMessage(messageParams);
}

async function sendUpdateEvent(data) {
  const messageParams = {
    title: 'Update',
    group: 'Update',
    message: JSON.stringify(data),
  };

  await sendMessage(messageParams);
}

async function sendDeleteEvent(data) {
  const messageParams = {
    title: 'Delete',
    group: 'Delete',
    message: JSON.stringify(data),
  };

  await sendMessage(messageParams);
}

module.exports = { sendCreateEvent, sendUpdateEvent, sendDeleteEvent };
