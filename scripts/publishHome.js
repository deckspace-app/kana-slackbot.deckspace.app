const fs = require('fs');
const request = require('request');

const homeLayout = {
  user_id: 'U015XHZHPFE',
  view: {
    type: 'home',
    blocks: [
      {
        type: 'image',
        title: {
          type: 'plain_text',
          text: 'Source: tofugu.com',
          emoji: true,
        },
        image_url:
          'https://www.tofugu.com/images/learn-japanese/typing-hiragana-bfaa6da5.jpg',
        alt_text: 'hiragana keyboard',
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*Choose a syllabary to study:*',
        },
      },
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'ひらがな Hiragana',
              emoji: true,
            },
            style: 'primary',
            action_id: 'study_hiragana',
          },
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'カタカナ Katakana',
              emoji: true,
            },
            action_id: 'study_katakana',
          },
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: '双方 Both',
              emoji: true,
            },
            action_id: 'study_both',
          },
        ],
      },
    ],
  },
};

const publishHome = () => {
  const options = {
    method: 'POST',
    url: 'https://slack.com/api/views.publish',
    headers: {
      Authorization: `Bearer xoxb-1195640114003-1219380455728-hQ4PhmFYcEJdjCw9c8vx5qK3`,
    },
    json: true,
    body: homeLayout,
  };
  request(options, (err, res) => console.log(res.body));
};

publishHome();
