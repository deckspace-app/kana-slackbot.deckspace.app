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

const hiraganaModal = () => modal('hiragana');
const katakanaModal = () => modal('katakana');
const bothModal = () =>
  Math.round(Math.random()) ? modal('hiragana') : modal('katakana');

module.exports = {
  hiraganaModal,
  katakanaModal,
  bothModal,
};
