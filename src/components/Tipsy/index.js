import React from 'react';
import {autobind} from 'core-decorators';
import PropTypes from 'prop-types';
import IconFont from '../IconFont';
import './style.less';
@autobind
export default class Tipsy extends React.Component {
    static props={
        className:PropTypes.string,
        tipsyText:PropTypes.string.isRequired,
        placement:PropTypes.string
    };
    static defaultProps={
        placement:'top'
    };
    render() {
        const { className,tipsyText,placement } = this.props;
        return (
            <span className={ (className?className:'')+' tipsy '+(placement?placement:'') }>
                <IconFont name='ICON'/>
                <div className='tipsy-text'>{ tipsyText }</div>
            </span>
        )
    }
}