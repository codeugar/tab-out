const test = require('node:test');
const assert = require('node:assert/strict');

const { groupSavedTabsByDomain } = require('./saved-tabs-utils.js');

test('groups saved tabs by domain without mixing sources', () => {
  const tabs = [
    { url: 'https://mp.weixin.qq.com/s/a', title: 'WeChat 1', savedAt: '2026-05-21T01:00:00.000Z' },
    { url: 'https://mp.weixin.qq.com/s/b', title: 'WeChat 2', savedAt: '2026-05-21T02:00:00.000Z' },
    { url: 'https://www.tiktok.com/@creator/video/1', title: 'TikTok 1', savedAt: '2026-05-21T03:00:00.000Z' },
    { url: 'https://www.tiktok.com/@creator/video/2', title: 'TikTok 2', savedAt: '2026-05-21T04:00:00.000Z' },
  ];

  const groups = groupSavedTabsByDomain(tabs);

  assert.deepEqual(groups.map(group => group.domain), ['tiktok.com', 'mp.weixin.qq.com']);
  assert.deepEqual(groups.map(group => group.tabs.map(tab => tab.title)), [
    ['TikTok 2', 'TikTok 1'],
    ['WeChat 2', 'WeChat 1'],
  ]);
});
