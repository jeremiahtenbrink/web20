import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const simpsonData = [
    {
        name: "Orville Simpson",
        spouse: "Yuma Hickman",
        type: "Parent",
        children: [
            {
                name: "Abraham Simpson",
                type: "Child",
                spouse: "Mona",
                children: [
                    {
                        name: "Homer Simpson",
                        spouse: "Marge Bouvier",
                        type: "Grand Child",
                        children: [
                            {
                                name: "Bart Simpson", type: "Great Grand Child"
                            }, {
                                name: "Lisa Simpson", type: "Great Grand Child"
                            }, {
                                name: "Maggie Simpson",
                                type: "Great Grand Child"
                            }
                        ]
                    }
                ]
            }
        ]
    }
];

const Child = props => {
    return ( <div>
        <h1>{ props.child.type }: { props.child.name }</h1>
        { props.child.children && props.child.children.map( child => {
            return <Child child={ child }/>;
        } ) }
    </div> );
};

const App = () => {
    return ( <div className="App">
        <h2>Simpsons Lineage</h2>
        { simpsonData.map( person => {
            return <Child child={ person }/>;
        } ) }
    </div> );
};

const rootElement = document.getElementById( "root" );
ReactDOM.render( <App/>, rootElement );
