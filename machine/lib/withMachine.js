"use strict";

var _react = _interopRequireDefault(require("react"));

var _stateMachine = _interopRequireDefault(require("./stateMachine"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var withMachine = function withMachine(state, map, actions) {
  return function (Component) {
    var sm = _stateMachine.default.create(state, map);

    return (
      /*#__PURE__*/
      function (_React$Component) {
        _inherits(MachineComponent, _React$Component);

        function MachineComponent(props) {
          var _this;

          _classCallCheck(this, MachineComponent);

          _this = _possibleConstructorReturn(this, _getPrototypeOf(MachineComponent).call(this, props));
          _this.attached = null;
          _this.subscription = null;
          return _this;
        }

        _createClass(MachineComponent, [{
          key: "componentWillMount",
          value: function componentWillMount() {
            var _this2 = this;

            this.setState({
              data: sm.data,
              dispatch: sm.dispatch,
              stateName: sm.stateName
            });
            this.subscription = sm.subscribe(null, function () {
              return _this2.setState({
                data: sm.data,
                dispatch: sm.dispatch,
                stateName: sm.stateName
              });
            });
          }
        }, {
          key: "componentDidUpdate",
          value: function componentDidUpdate() {
            console.info("update", sm.stateName);
          }
        }, {
          key: "componentWillUnmount",
          value: function componentWillUnmount() {
            sm.unsubscribe(this.subscription);
          }
        }, {
          key: "render",
          value: function render() {
            return _react.default.createElement(Component, _extends({}, this.state, this.props, actions(sm.dispatch)));
          }
        }]);

        return MachineComponent;
      }(_react.default.Component)
    );
  };
};

module.exports = withMachine;