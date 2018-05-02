import React from 'react';
import propTypes from 'proptypes';
import {autobind} from 'core-decorators';
import '../style/input.less';

@autobind
export default class Input extends React.Component {
    static props = {
        name: propTypes.string.isRequired,
        value: propTypes.string.isRequired,
        onChange: propTypes.func.isRequired,
        onBlur: propTypes.func,
        disabled: propTypes.bool,
        error: propTypes.bool,
        unit: propTypes.string,
        type: propTypes.string,
        placeholder: propTypes.string,
    };
    static defaultProps = {
        disabled: false,
        error: false,
        unit: '',
        type: 'text',
        placeholder: '',
    };
    inputChange(e){
        const {name,onChange} = this.props;
        onChange(name,e.target.value);
    }
    inputBlur(e){
        const {name,onBlur} = this.props;
        onBlur && onBlur(name,e.target.value);
    }
    componentDidMount(){
        if(this.unitNode){
            this.inputNode.style.paddingRight = this.unitNode.style.width;
        }
    }
    render() {
        const {name, value, disabled, error, unit, type, placeholder} = this.props;
        return <div className={'input-component'+(error?' input-error':'')}>
            <input name={name}
                   value={value}
                   type={type}
                   onChange={this.inputChange}
                   onBlur={this.inputBlur}
                   placeholder={placeholder}
                   ref={(val)=>this.inputNode = val}
            />
            { unit && <span className='unit' ref={(val)=>this.unitNode=val}>{unit}</span>}
        </div>
    }
}