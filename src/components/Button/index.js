import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './button.less';
import IconFont from "../IconFont";

export default class Button extends Component {
    static propTypes = {
        disabled: PropTypes.bool,
        icon: PropTypes.string,
        size: PropTypes.string,
        label: PropTypes.string,
        type: PropTypes.string,
        className: PropTypes.string,
        onClick: PropTypes.func
    };

    static defaultProps = {
        disabled: false,
        label: 'button',
        size: 'default',//large, default, small
        type: 'default',//primary, default, secondary
    };

    render() {
        const {disabled, icon, size, label, type, className, onClick} = this.props;
        return <button className={`button-component ${className ? className : ''} button-${type} button-${size} ${disabled ? 'disabled ':''}`}
                       onClick={() => onClick && onClick()}>
            {icon && <IconFont name={icon}/>}
            {label}
        </button>
    }
}