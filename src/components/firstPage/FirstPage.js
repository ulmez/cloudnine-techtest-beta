import React, { Component } from 'react';
// import { css } from '@emotion/core';
import { CircleLoader } from 'react-spinners';

// const override = css`
//     display: block;
//     margin: 0 auto;
//     border-color: red;
// `;

class FirstPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: true
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                loading: false
            });
        }, 4000);
    }

    close() {
        console.log('Gick att trycka...');
    }
    
    render() {
        return (
            <div>
                <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)'}}>
                    <CircleLoader
                        sizeUnit={"px"}
                        size={50}
                        color={'#B69F58'}
                        loading={this.state.loading}
                    />
                </div>
            </div>
        );
    }
}

export default FirstPage;