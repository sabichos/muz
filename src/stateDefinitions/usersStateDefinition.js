const usersState = {
    idle: {
        getUsers: function (setState) {
            setState("fetching");
        }
    },
    fetching: {
        idle: function (setState,payload) {
            setState("idle",payload)
        },
        failure: function (setState,payload) {
            setState("error",payload)
        }
    },
    error: {
        retry: function (setState) {
            setState("fetching");
        }
    }
}

export default usersState;