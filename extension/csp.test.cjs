const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

test('extension markup does not use inline event handlers blocked by CSP', () => {
  const extensionDir = __dirname;
  const files = ['index.html', 'app.js'];
  const inlineHandlerPattern = /\son[a-z]+\s*=/i;

  const offenders = files.flatMap(file => {
    const source = fs.readFileSync(path.join(extensionDir, file), 'utf8');
    return source
      .split('\n')
      .map((line, index) => ({ file, line: index + 1, text: line.trim() }))
      .filter(({ text }) => inlineHandlerPattern.test(text));
  });

  assert.deepEqual(offenders, []);
});
