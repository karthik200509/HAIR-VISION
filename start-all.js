const { spawn } = require('child_process');
const path = require('path');

console.log('====================================================');
console.log('   🚀 Launching HairVision Full-Stack Application   ');
console.log('====================================================');

const isWin = process.platform === 'win32';
const npmCmd = isWin ? 'npm.cmd' : 'npm';
const npxCmd = isWin ? 'npx.cmd' : 'npx';

// Start Backend on Port 5000
const backend = spawn('node', ['backend/server.js'], {
  stdio: 'pipe',
  shell: isWin,
});

backend.stdout.on('data', (data) => {
  process.stdout.write(`\x1b[32m[Backend]\x1b[0m ${data.toString()}`);
});

backend.stderr.on('data', (data) => {
  process.stderr.write(`\x1b[31m[Backend Error]\x1b[0m ${data.toString()}`);
});

// Start Frontend on Port 5173
const frontend = spawn(npmCmd, ['--prefix', 'frontend', 'run', 'dev', '--', '--host', '0.0.0.0'], {
  stdio: 'pipe',
  shell: isWin,
});

frontend.stdout.on('data', (data) => {
  process.stdout.write(`\x1b[36m[Frontend]\x1b[0m ${data.toString()}`);
});

frontend.stderr.on('data', (data) => {
  process.stderr.write(`\x1b[33m[Frontend Info]\x1b[0m ${data.toString()}`);
});

const cleanup = () => {
  console.log('\nShutting down HairVision processes...');
  try {
    backend.kill();
  } catch (e) {}
  try {
    frontend.kill();
  } catch (e) {}
  process.exit();
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
process.on('exit', cleanup);
