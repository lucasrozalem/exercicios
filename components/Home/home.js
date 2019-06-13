import React, { Component } from 'react';
import { Button } from 'antd';

export default class Home extends Component {
    render() {
        return(
            <Button 
                type='primary'
            >
                Bem-vindo ao projeto
            </Button>
        );
    }
}