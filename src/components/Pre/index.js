import React,{Component} from 'react';
import propTypes from 'prop-types';
import {autobind} from 'core-decorators';
import './style.less'

@autobind
export default class Pre extends Component {
    static props = {
        code:propTypes.string
    };
    state = {
        show:false,
        txt:'点击查看demo'
    }
    toggleTxt(){
        let {show} = this.state;
        let str = show ? '点击查看demo' : '收起demo';
        this.setState({
            show:!show,
            txt:str
        });
    }

    render(){
        const {code} = this.props;
        const {show,txt} = this.state;
        const cls = show ? 'block' : 'none';
        return (
            <pre>
                <a onClick={this.toggleTxt}>{txt}</a>
                <div style={{'display':cls}} className="code">
                {code}
                </div>
            </pre>
        )
    }
}