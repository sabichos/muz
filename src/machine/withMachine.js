import React from 'react';
import { machine } from './stateMachine';

export const withMachine = (state, map, actions) => Component => {
    const sm = machine(state, map);
    return class MachineComponent extends React.Component {
        constructor(props) {
            super(props);
            this.attached = null;
            this.subscriptions = [];
        }
        componentWillMount() {
            this.setMachineState();
            for (const key in map) {
                if (map.hasOwnProperty(key)) {
                    this.subscriptions.push(sm.subscribe(key, () => this.setMachineState()))
                }
            }
        }

        setMachineState() {
            this.setState({ data: sm.data, dispatch: sm.dispatch, stateName: sm.stateName });
        }
      
        componentWillUnmount() {
            for (const subscription of this.subscriptions) {
                sm.unsubscribe(subscription);    
            }            
        }



        render() {
            return <Component {...this.state} {...this.props} {...actions(sm.dispatch)} />;
        }
    }



}