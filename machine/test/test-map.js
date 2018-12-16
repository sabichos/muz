var map = {
    one: {
        transit2Two: function (dispatch,payload) {
            dispatch("two",payload)
        }
    },
    two: {
        transit2Three: function (dispatch, payload) {
            dispatch("three", payload)
        }
    },
    three: {
        transit2One: function (dispatch,payload) {
            dispatch("one",payload);
        }
    }
}

module.exports = map;