import React from 'react';
import machine from './stateMachine';


const withMachine = (state, map, actions) => Component => {
    const sm = machine.create(state, map);
    return class MachineComponent extends React.Component {
        constructor(props) {
            super(props);
            this.attached = null;
            this.subscription = null;
        }
        componentWillMount() {
            this.setState({ data: sm.data, dispatch: sm.dispatch, stateName: sm.stateName });
            this.subscription = sm.subscribe(null, () => this.setState({ data: sm.data, dispatch: sm.dispatch, stateName: sm.stateName }));
        }
   
        componentWillUnmount() {
            sm.unsubscribe(this.subscription);
        }



        render() {
            return <Component {...this.state} {...this.props} {...actions(sm.dispatch)} />;
        }
    }



}
module.exports = withMachine;