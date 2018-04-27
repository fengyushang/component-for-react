import React,{Component} from 'react';
import PropTypes from 'prop-types';
import 'components/style/main.less';

class Button extends Component {
    
    static props = {
        text:PropTypes.string,
        type:PropTypes.string,
        className:PropTypes.string,
        disabled: PropTypes.bool,
        onClick:PropTypes.func
    };

    static defaultProps = {
        text:'button',
        type:'button',
        className:'btn'
    };

    render(){
        const {text,type,className,disabled,onClick} = this.props;
        return(
            <button type={type} disabled={disabled}
            onClick = {onClick}
            className={className}>{text}</button>
        )
    }
}
export default Button;