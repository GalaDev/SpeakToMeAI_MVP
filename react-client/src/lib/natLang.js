const language = require('@google-cloud/language');

const client = new language.LanguageServiceClient();

const text = 'This is so coool! I love it!!!!';

const document = {
  content: text,
  type: 'PLAIN_TEXT'
};

client.analyzeSentiment({ document: document })
  .then(result => {
    console.log(result)
  })
  .then(err => {
    console.log(err)
  })