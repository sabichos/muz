const playerState = {
    stopped: {
        start: function (setState) {
            setState("started");
        }
    },
    started: {
        stop: function (setState) {
            setState("stopped")
        },
        pause: function (setState) {
            setState("paused")
        }
    },
    paused: {
        stop: function (setState) {
            setState("stopped")
        },
        start: function (setState) {
            setState("started")
        }
    }
}

export default playerState;