function normalizeName(label) {

    if (label.length === 0)
        return label;

    var n, result, words = label.split(/[_-]/);

    if ((words.length === 1) && (words[0][0].toLowerCase() === words[0][0]))
        return label;

    result = words[0].toLowerCase();
    for (n = 1; n < words.length; n++) {
        result = result + words[n].charAt(0).toUpperCase() + words[n].substring(1).toLowerCase();
    }

    return result;
}

normalizeName.prepended = function (prepend, label) {
    label = normalizeName(label);
    return prepend + label[0].toUpperCase() + label.substring(1);
}


const stateMachine = function machine(initialStateName, transitions) {
    let self = {};
    self.transitions = transitions;
    self.stateName = initialStateName;
    self.state = transitions[initialStateName];
    self.data = null;
    self.subscrptions = [];
    if (!self.state) throw new Error("initial state name was not found inside the transitions map");

    self.setState = function (stateName) {
        self.stateName = stateName;
        self.state = self.transitions[stateName];
        let subs = self.subscrptions.filter(function (s) { return s.name === stateName || s.name === null });
        for (const sub of subs) {
            sub.callback(self.data);
        }
    }

    self.subscribe = function (stateName, callback) {
        let subscription = { name: stateName, callback: callback };
        self.subscrptions.push(subscription);
        return subscription;
    }
    self.unsubscribe = function (subscription) {
        let index = self.subscrptions.indexOf(subscription);
        if (index > -1) self.subscrptions.splice(index, 1);
    }

    self.dispatch = function (transition, payload) {
        if (self.state[transition] !== undefined) {
            self.data = payload;
            self.state[transition](self.setState);
        }
    }

    self.is = {};
    for (const key in self.transitions) {
        if (self.transitions.hasOwnProperty(key)) {
            self.is[normalizeName(key)] = function () {
                return self.state === self.transitions[key];
            }
        }
    }

    return self;
}


module.exports = stateMachine;