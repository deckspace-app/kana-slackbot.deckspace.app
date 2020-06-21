const characters = require('./syllabary');
const _ = require('lodash');

const modal = syllabary => {
  const character = {
    label: characters[Math.floor(Math.random() * characters.length)],
    correct: true,
  };
  const wrongCharacters = characters
    .filter(c => c !== character.label)
    .map(c => {
      return {label: c, correct: false};
    });
  const buttons = _.shuffle([character, ..._.sampleSize(wrongCharacters, 3)]);

  return {
    type: 'modal',
    title: {
      type: 'plain_text',
      text: `Practicing: ${_.capitalize(syllabary)}`,
    },
    blocks: [
      {
        type: 'image',
        image_url: `https://kana-slackbot.deckspace.vercel.app/${syllabary}/${character.label}.png`,
        alt_text: character.label,
      },
      {
        type: 'actions',
        elements: buttons.map((button, index) => {
          return {
            type: 'button',
            text: {
              type: 'plain_text',
              text: button.label,
              emoji: true,
            },
            action_id: button.correct
              ? `correct_answer_${character.label}`
              : `incorrect_answer_${index}_${character.label}`,
          };
        }),
      },
    ],
  };
};

const updateIncorrect = (body, context) => {
  const {blocks, title} = body.view;
  const buttonsIndex = blocks.findIndex(block => block.type == 'actions');
  const buttons = blocks[buttonsIndex];
  const clickedButton = buttons.elements.findIndex(
    button => button.action_id == context.actionIdMatches[0],
  );
  const {text} = buttons.elements[clickedButton].text;

  blocks[0] = {
    type: 'image',
    image_url: body.view.blocks[0].image_url,
    alt_text: body.view.blocks[0].alt_text,
  };
  blocks[buttonsIndex].elements[clickedButton].style = 'danger';
  blocks[buttonsIndex].elements[clickedButton].text.text = `❌ ${text}`;

  return {
    type: 'modal',
    title,
    blocks,
  };
};

const updateCorrect = (body, context) => {
  const {blocks, title} = body.view;
  const buttonsIndex = blocks.findIndex(block => block.type == 'actions');
  const buttons = blocks[buttonsIndex];
  const clickedButton = buttons.elements.findIndex(
    button => button.action_id == context.actionIdMatches[0],
  );
  const {text} = buttons.elements[clickedButton].text;

  blocks[0] = {
    type: 'image',
    image_url: body.view.blocks[0].image_url,
    alt_text: body.view.blocks[0].alt_text,
  };
  blocks[buttonsIndex].elements[clickedButton].style = 'primary';
  blocks[buttonsIndex].elements[clickedButton].text.text = `✅ ${text}`;

  return {
    type: 'modal',
    title,
    blocks,
  };
};

const updateModal = (action, body, context) => {
  switch (action) {
    case 'incorrect':
      return updateIncorrect(body, context);
      break;
    case 'correct':
      return updateCorrect(body, context);
      break;
    case 'nextCharacter':
      return {}; // TODO
      break;
    default:
      console.log('no action defined in updateModal');
  }
};

const hiraganaModal = () => modal('hiragana');
const katakanaModal = () => modal('katakana');
const bothModal = () =>
  Math.round(Math.random()) ? modal('hiragana') : modal('katakana');

module.exports = {
  hiraganaModal,
  katakanaModal,
  bothModal,
  updateModal,
};
