require('dotenv').config();

const {App} = require('@slack/bolt');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

app.action('study_hiragana', async ({ ack, say }) => {
  console.log('study_hiragana fired');
  await ack();
});

app.action('study_katakana', async ({ body, ack, say }) => {
  console.log('study_katakana fired');
  await ack();
});

app.action('study_both', async ({ body, ack, say }) => {
  console.log('study_both fired');
  await ack();
});

(async () => {
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();
