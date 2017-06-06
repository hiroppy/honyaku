#!/usr/bin/env node

'use strict';

const translate = require('google-translate-api-extended');

const commands = process.argv.slice(2);

if (commands[0] === '-v' || commands[0] === '--version') {
  console.log(`Version: ${require('../package.json').version}`);
  process.exit(0);
}

if (commands[0] === undefined) {
  console.log('<honyaku | hyk> text');
  process.exit(0);
}

const str = commands[0];
let isJapanese = false;

for (let i = 0; i < str.length; i++) {
  const code = commands[0].charCodeAt(i);

  if (code >= 256) {
    isJapanese = true;
    break;
  }
}

Promise.resolve().then(() => {
  const to = isJapanese ? 'en' : 'ja';

  return translateByGoogle(str, to);
}).then((res) => {
  console.log(res.text);
}).catch((err) => {
  console.error(err);
});

/**
 * @param {string} str
 * @param {string} to - ja or en
 */
function translateByGoogle(str, to) {
  return translate(str, {to: to});
}
