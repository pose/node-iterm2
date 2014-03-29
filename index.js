var $ = require('NodObjC');

$.framework('Foundation');
$.framework('ScriptingBridge');
$.framework('AppKit');

var pool = $.NSAutoreleasePool('alloc')('init');

var iTerm = $.SBApplication('applicationWithBundleIdentifier', $('com.googlecode.iterm2'));

function wrapArray(nsArray) {
  var count = nsArray('count');
  var a = [];

  for (var i = 0; i < count; i++) {
    a.push(nsArray('objectAtIndex', i));
  }

  return a;
}

function wrapSession (session) {
  return {
    write: function (text) {
      session('writeContentsOfFile', null, 'text', $(text));
    }
  }
}

function wrapTerminal (terminal) {
  return {
    currentSession: function () {
      return currentSession = wrapSession(terminal('currentSession'));
    },
    sessions: function () {
      return wrapArray(terminal('sessions')).map(wrapSession);
    },
    split: function (direction, profile) {
      profile = profile || 'Default';
      if (direction === 'vertical' || direction === 'horizontal') {
        terminal('splitDirection', $(direction), 'profile', $(profile));
      } else {
        throw new Error('Invalid direction: it should be either \'horizontal\' or \'vertical\'');
      }
    }
  };
}

module.exports = {
  iTerm: {
    currentTerminal: function () {
      var currentTerminal = iTerm('currentTerminal');
      return wrapTerminal(currentTerminal);
    },
    terminals: function () {
      return wrapArray(iTerm('terminals')).map(wrapTerminal);
    }
  }
};

