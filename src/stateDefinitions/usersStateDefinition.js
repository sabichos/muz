const usersState = {
    idle: {
        getUsers: function (setState) {
            setState("fetching");
        }
    },
    fetching: {
        success: function (setState,payload) {            
            setState("users",payload)
        },
        failure: function (setState,payload) {
            setState("error",payload)
        }
    },
    error: {
        retry: function (setState) {
            setState("fetching");
        }
    },
    users:{}
}

export default usersState;