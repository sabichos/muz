const withStateMachine = machine => Component => props => {
    return <Component {...machine} {...props}></Component>
}