"use strict";

function normalizeName(label) {
  if (label.length === 0) return label;
  var n,
      result,
      words = label.split(/[_-]/);
  if (words.length === 1 && words[0][0].toLowerCase() === words[0][0]) return label;
  result = words[0].toLowerCase();

  for (n = 1; n < words.length; n++) {
    result = result + words[n].charAt(0).toUpperCase() + words[n].substring(1).toLowerCase();
  }

  return result;
}

normalizeName.prepended = function (prepend, label) {
  label = normalizeName(label);
  return prepend + label[0].toUpperCase() + label.substring(1);
};

var stateMachine = function machine(initialStateName, transitions) {
  var self = {};
  self.transitions = transitions;
  self.stateName = initialStateName;
  self.state = transitions[initialStateName];
  self.data = null;
  self.subscrptions = [];
  if (!self.state) throw new Error("initial state name was not found inside the transitions map");

  self.setState = function (stateName) {
    self.stateName = stateName;
    self.state = self.transitions[stateName];
    var subs = self.subscrptions.filter(function (s) {
      return s.name === stateName || s.name === null;
    });
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = subs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var sub = _step.value;
        sub.callback(self.data);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  };

  self.subscribe = function (stateName, callback) {
    var subscription = {
      name: stateName,
      callback: callback
    };
    self.subscrptions.push(subscription);
    return subscription;
  };

  self.unsubscribe = function (subscription) {
    var index = self.subscrptions.indexOf(subscription);
    if (index > -1) self.subscrptions.splice(index, 1);
  };

  self.dispatch = function (transition, payload) {
    if (self.state[transition] !== undefined) {
      self.data = payload;
      self.state[transition](self.setState);
    }
  };

  self.is = {};

  var _loop = function _loop(key) {
    if (self.transitions.hasOwnProperty(key)) {
      self.is[normalizeName(key)] = function () {
        return self.state === self.transitions[key];
      };
    }
  };

  for (var key in self.transitions) {
    _loop(key);
  }

  return self;
};

module.exports = stateMachine;