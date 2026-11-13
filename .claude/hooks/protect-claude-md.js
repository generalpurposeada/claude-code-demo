#!/usr/bin/env node
// PreToolUse hook: block Edit/Write on any file named CLAUDE.md.
const path = require('path');

let input = '';
process.stdin.on('data', (chunk) => (input += chunk));
process.stdin.on('end', () => {
  let filePath = '';
  try {
    filePath = JSON.parse(input).tool_input?.file_path || '';
  } catch {
    process.exit(0); // unreadable input: don't block
  }
  if (path.basename(filePath) === 'CLAUDE.md') {
    console.error('CLAUDE.md is protected by a project hook. Ask the user to edit it.');
    process.exit(2);
  }
  process.exit(0);
});
