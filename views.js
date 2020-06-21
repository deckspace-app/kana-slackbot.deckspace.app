const characters = require('./syllabary');
const _ = require('lodash');

const modal = syllabary => {
  const character = characters[Math.floor(Math.random() * characters.length)];
  const wrongCharacters = characters.filter(c => c !== character);
  const buttons = _.shuffle([character, ..._.sampleSize(wrongCharacters, 3)]);
  console.log(buttons);

  return {
    type: 'modal',
    title: {
      type: 'plain_text',
      text: `Practicing: ${syllabary}`,
    },
    blocks: [
      {
        type: 'image',
        image_url: `https://kana-slackbot.deckspace.vercel.app/${syllabary}/${character}.png`,
        alt_text: character,
      },
      {
        type: 'actions',
        elements: buttons.map(button => {
          return {
            type: 'button',
            text: {
              type: 'plain_text',
              text: button,
              emoji: true,
            },
            action_id: `answer_${button}`,
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
