import React,{Component} from 'react';
import PropTypes from 'prop-types';
import '../style/main.less';

class Button extends Component {
    
    static props = {
        label:PropTypes.string,
        type:PropTypes.string,
        sureBtn:PropTypes.bool,
        cancelBtn:PropTypes.bool,
        className:PropTypes.string,
        disabled: PropTypes.bool,
        onClick:PropTypes.func
    };

    static defaultProps = {
        text:'button',
        type:'button',
        className:'btn',
    };

    render(){
        const {label,type,className,disabled,onClick,sureBtn,cancelBtn} = this.props;
        const clstype = sureBtn ? 'sureBtn ' : (cancelBtn ? 'cancelBtn ' : '');
        return(
            <button type={type} disabled={disabled}
            onClick = {onClick}
            className={clstype+className }>{label}</button>
        )
    }
}
export default Button;