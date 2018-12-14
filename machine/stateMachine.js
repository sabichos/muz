function camelize(label) {

    if (label.length === 0)
        return label;

    var n, result, word, words = label.split(/[_-]/);

    // single word with first character already lowercase, return untouched
    if ((words.length === 1) && (words[0][0].toLowerCase() === words[0][0]))
        return label;

    result = words[0].toLowerCase();
    for (n = 1; n < words.length; n++) {
        result = result + words[n].charAt(0).toUpperCase() + words[n].substring(1).toLowerCase();
    }

    return result;
}

camelize.prepended = function (prepend, label) {
    label = camelize(label);
    return prepend + label[0].toUpperCase() + label.substring(1);
}


const stateMachine = {
    init: function (initialStateName, transitions) {
        let self = this;
        self.transitions = transitions;
        self.stateName = initialStateName;
        self.state = transitions[initialStateName];
        self.data = {};
        self.subscrptions = [];
        if (!self.state) throw "initial state name was not found inside the transitions map";

        self.setState = function (stateName, payload) {
            self.stateName = stateName;
            self.state = self.transitions[stateName];
            self.data = payload;
            let subs = self.subscrptions.filter(function (s) { return s.name === stateName });
            for (const sub of subs) {
                sub.callback(payload);
            }
        }

        self.subscribe = function (stateName, callback) {
            this.subscrptions.push({ name: stateName, callback: callback });
        }
        self.unsubscribe = function (subscription) {
            let index = this.subscrptions.indexOf(subscription);
            if (index > -1) this.subscrptions.splice(index, 1);
        }

        self.dispatch = function (transition, payload) {
            if (self.state[transition] !== undefined) {
                self.state[transition](self.setState, payload);
            }
        }

        let result = {
            dispatch: self.dispatch,
            data: self.data,
            subscribe: self.subscribe,
            unsubscribe: self.unsubscribe
        };
        for (const key in self.transitions) {
            if (self.transitions.hasOwnProperty(key)) {
                result[camelize.prepended("is", key)] = function () {
                    return self.state === self.transitions[key];
                }
            }
        }

        return result;
    }
}


module.exports = stateMachine;