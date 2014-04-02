var iTerm = require('./index')();

if (!iTerm) {
  throw new Error('iTerm instance not found. Try again after launching it');
}

var term = iTerm.currentTerminal();

term.split('vertical');
term.split('horizontal');

term.sessions().slice(-2).forEach(function (session, i) {
  session.write('echo "hello world"');
});

