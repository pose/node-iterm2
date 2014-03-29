var iTerm = require('./index').iTerm;

var term = iTerm.currentTerminal();

term.split('vertical');
term.split('horizontal');

term.sessions().slice(-2).forEach(function (session, i) {
  session.write('echo "hello world"');
});

