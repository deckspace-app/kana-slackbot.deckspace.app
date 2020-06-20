const hiraganaModal = {
  type: 'modal',
  title: {
    type: 'plain_text',
    text: 'Practicing: Hiragana'
  },
  blocks: [
    {
      type: 'image',
      image_url:
        'https://1jp.tokyo/hiragana/gyousyo/27-4-hi-mouhitu-hiragana-mihon.jpg',
      alt_text: 'inspiration',
    },
    {
      type: 'actions',
      elements: [
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'hi',
            emoji: true,
          },
          value: 'answer_hi',
        },
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'ra',
            emoji: true,
          },
          value: 'answer_ra',
        },
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'ga',
            emoji: true,
          },
          value: 'answer_ga',
        },
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'na',
            emoji: true,
          },
          value: 'answer_na',
        },
      ],
    },
  ],
}


const katakanaModal = {
  type: 'modal',
  title: {
    type: 'plain_text',
    text: 'Practicing: Katakana'
  },
  blocks: [
    {
      type: 'image',
      image_url:
        'https://1jp.tokyo/hiragana/gyousyo/27-4-hi-mouhitu-hiragana-mihon.jpg',
      alt_text: 'inspiration',
    },
    {
      type: 'actions',
      elements: [
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'hi',
            emoji: true,
          },
          value: 'answer_hi',
        },
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'ra',
            emoji: true,
          },
          value: 'answer_ra',
        },
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'ga',
            emoji: true,
          },
          value: 'answer_ga',
        },
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'na',
            emoji: true,
          },
          value: 'answer_na',
        },
      ],
    },
  ],
}

const bothModal = katakanaModal;

module.exports = {
  hiraganaModal,
  katakanaModal,
  bothModal,
};
