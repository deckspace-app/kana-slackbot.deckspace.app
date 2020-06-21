require('dotenv').config();

const {App} = require('@slack/bolt');
const {hiraganaModal, katakanaModal, bothModal} = require('./views.js');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

app.action(/^correct_answer_.*$/, async ({context, body, ack}) => {
  await ack();
  console.log(body.view.blocks.find(block => block.type == 'actions'));
});

app.action(/^incorrect_answer_.*$/, async ({context, body, ack}) => {
  await ack();

  const buttonsIndex = body.view.blocks.findIndex(
    block => block.type == 'actions',
  );
  const buttons = body.view.blocks.find(block => block.type == 'actions');
  const clickedButton = buttons.elements.findIndex(
    button => button.action_id == context.actionIdMatches[0],
  );
  const newViewBlocks = body.view.blocks;
  newViewBlocks[0] = {
    type: 'image',
    image_url: body.view.blocks[0].image_url,
    alt_text: body.view.blocks[0].alt_text,
  };
  const text = body.view.blocks[buttonsIndex].elements[clickedButton].text.text
  newViewBlocks[buttonsIndex].elements[clickedButton].style = 'danger';
  newViewBlocks[buttonsIndex].elements[clickedButton].text.text = `❌ ${text}`;
  try {
    const result = await app.client.views.update({
      token: context.botToken,
      view_id: body.view.id,
      view: {
        type: 'modal',
        title: body.view.title,
        blocks: newViewBlocks,
      },
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
