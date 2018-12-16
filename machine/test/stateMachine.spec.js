var chai = require('chai');
var assert = require('assert');
var stateMachine = require('../src/stateMachine');
var map = require('./test-map');


describe('when creating state machine', function () {

    it("should be created without error", function () {
        var machine = stateMachine("one", map);
    });
});

describe('when using state machine', function () {

    var machine = null;

    beforeEach(function () {
        machine = stateMachine("one", map);
    });

    afterEach(function () {
        machine = stateMachine("one", map);
    });


    it("should change the state", function () {
        machine.setState("two");
        assert.equal(machine.stateName, "two");
    });
    it("should dispatch a transition", function () {
        machine.dispatch("transit2Two")
        assert.equal(machine.stateName, "two");
    });
    it("should dispatch a transition with payload", function () {
        machine.dispatch("transit2Two", { test: 1 })
        assert.equal(machine.data.test, 1);
    });
    it("should not be transitioned to not allowed state", function () {
        machine.dispatch("transit2Three")
        assert.equal(machine.stateName, "one");
    });
    it("should subscribe to state change", function (done) {
        machine.subscribe(null, function () {
            done();
        })
        machine.setState("two");
    });
});

describe('when using subscription', function () {
    var machine = null;
    var subscription = null;
    var subscribed = false;
    before(function () {
        machine = stateMachine("one", map);
        subscription = machine.subscribe(null, function () { subscribed = true; })
        console.log(subscription);
    });

    it("should unsubscribe from state change", function () {
        machine.unsubscribe(subscription);
        console.log(machine.subscriptions);
        machine.setState("two");
        assert.equal(subscribed, false);
    });
});


