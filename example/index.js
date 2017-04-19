import React, {Component} from 'react';
import {render} from 'react-dom';
import ScrollBox from '../lib';

class Example extends Component {
    constructor(props) {
        super(props);
        this.state = {
            style: {
                width: "400px",
                height: "400px",
                border: "1px solid black",
            }
        }
    }
    render() {
        return (
            <div style={this.state.style}>
                <ScrollBox>
                    123<br/>123<br/>123<br/>123<br/>123<br/>123<br/>123<br/>
                    123<br/>123<br/>123<br/>123<br/>123<br/>123<br/>123<br/>
                    123<br/>123<br/>123<br/>123<br/>123<br/>123<br/>123<br/>
                    123<br/>123<br/>123<br/>123<br/>123<br/>123<br/>123<br/>
                    123<br/>123<br/>123<br/>123<br/>123<br/>123<br/>123<br/>
                    123<br/>123<br/>123<br/>123<br/>123<br/>123<br/>123<br/>
                    123<br/>123<br/>123<br/>123<br/>123<br/>123<br/>123<br/>
                    123<br/>123<br/>123<br/>123<br/>123<br/>123<br/>123<br/>
                </ScrollBox>
            </div>
        );
    }
}

render(
    <Example />,
    document.getElementById("app")
);
