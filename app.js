require('dotenv').config();

const {App} = require('@slack/bolt');
const {
  hiraganaModal,
  katakanaModal,
  bothModal,
  updateModal,
} = require('./views.js');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

app.action(/^correct_answer_.*$/, async ({context, body, ack}) => {
  await ack();

  try {
    const result = await app.client.views.update({
      token: context.botToken,
      view_id: body.view.id,
      view: updateModal('correct', body, context),
    });
    console.log(result);
  } catch (error) {
    console.error(error);
  }
});

app.action(/^incorrect_answer_.*$/, async ({context, body, ack}) => {
  await ack();

  try {
    const result = await app.client.views.update({
      token: context.botToken,
      view_id: body.view.id,
      view: updateModal('incorrect', body, context),
    });
    console.log(result);
  } catch (error) {
    console.error(error);
  }
});

app.action('study_hiragana', async ({context, body, ack, say}) => {
  console.log('study_hiragana fired');
  await ack();

  try {
    const result = await app.client.views.open({
      token: context.botToken,
      trigger_id: body.trigger_id,
      view: hiraganaModal(),
    });
    console.log(result);
  } catch (error) {
    console.error(error);
  }
});

app.action('study_katakana', async ({context, body, ack, say}) => {
  console.log('study_katakana fired');
  await ack();
  try {
    const result = await app.client.views.open({
      token: context.botToken,
      trigger_id: body.trigger_id,
      view: katakanaModal(),
    });
    console.log(result);
  } catch (error) {
    console.error(error);
  }
});

app.action('study_both', async ({context, body, ack, say}) => {
  console.log('study_both fired');
  await ack();
  try {
    const result = await app.client.views.open({
      token: context.botToken,
      trigger_id: body.trigger_id,
      view: bothModal(),
    });
    console.log(result);
  } catch (error) {
    console.error(error);
  }
});

(async () => {
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();
