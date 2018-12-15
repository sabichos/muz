"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var React = require('react');

var machine = require('./stateMachine');

var withMachine = function withMachine(state, map, actions) {
  return function (Component) {
    var sm = machine(state, map);
    return (
      /*#__PURE__*/
      function (_React$Component) {
        _inherits(MachineComponent, _React$Component);

        function MachineComponent(props) {
          var _this;

          _classCallCheck(this, MachineComponent);

          _this = _possibleConstructorReturn(this, _getPrototypeOf(MachineComponent).call(this, props));
          _this.attached = null;
          _this.subscriptions = [];
          return _this;
        }

        _createClass(MachineComponent, [{
          key: "componentWillMount",
          value: function componentWillMount() {
            var _this2 = this;

            this.setMachineState();

            for (var key in map) {
              if (map.hasOwnProperty(key)) {
                this.subscriptions.push(sm.subscribe(key, function () {
                  return _this2.setMachineState();
                }));
              }
            }
          }
        }, {
          key: "setMachineState",
          value: function setMachineState() {
            this.setState({
              data: sm.data,
              dispatch: sm.dispatch,
              stateName: sm.stateName
            });
          }
        }, {
          key: "componentWillUnmount",
          value: function componentWillUnmount() {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = this.subscriptions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var subscription = _step.value;
                sm.unsubscribe(subscription);
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
          }
        }, {
          key: "render",
          value: function render() {
            return React.createElement(Component, _extends({}, this.state, this.props, actions(sm.dispatch)));
          }
        }]);

        return MachineComponent;
      }(React.Component)
    );
  };
};

module.exports = withMachine;