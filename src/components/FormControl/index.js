import React from 'react';
import PropTypes from 'prop-types';
import {FormContext} from '../Form';
import {autobind} from 'core-decorators';
import {Event,FORM_FIELD_CHANGE} from "../events";
import './formControl.less';

@autobind
export default class FormControl extends React.Component{
    render(){
        return <FormContext.Consumer>
                {
                    context => {
                        return <ControlItem {...this.props} context={context}/>
                    }
                }
            </FormContext.Consumer>
    }
}

@autobind
class ControlItem extends React.Component{
    static props = {
        component: PropTypes.element.isRequired,
        name: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        controlProps: PropTypes.object,
        required: PropTypes.bool,
        validator: PropTypes.array,//验证输入内容是否正确
        parse: PropTypes.func,//限制输入内容
        context: PropTypes.object,
    };
    static defaultProps = {
        controlProps: {},
        required: false,
        validator: [],
    };
    state = {
        errorMsg: '',
    };
    onChange(name,value){
        const {parse} = this.props;
        if(parse){
            value = parse(value);
        }
        this.props.context.setField(name,value);
    }
    onBlur(name,value){
        this.check(name,value);
    }
    componentWillMount(){
        this.fieldListener = Event.on(FORM_FIELD_CHANGE,({name,value})=>{
            this.check(name,value);
        });
    }
    componentDidMount(){
        this.check(this.props.name, this.props.context.formData[name]);
    }
    check(name,value){
        const {required,label,context,validator} = this.props;
        if(name===this.props.name){
            if(required && (value===null || value===undefined || value==='')){
                context.setError(name,`${label}必填`);
                this.setState({errorMsg: `${label}必填`});
            }else{
                let flag = true, msg = '';
                if(value!==null && value!==undefined && value!==''){
                    for(let i=0;i<validator.length;i++){
                        const data = validator[i];
                        if(typeof(data.rule)==='function'){
                            flag = data.rule(value);
                        }else{
                            flag = data.rule.test(value);
                        }
                        if(!flag){
                            msg = data.msg;
                            break;
                        }
                    }
                }
                context.setError(name,msg);
                this.setState({errorMsg: msg});
            }
        }
    }
    componentWillUnmount(){
        if(this.fieldListener){
            this.fieldListener();
        }
    }
    render(){
        const {component,label,name,controlProps,required,context} = this.props;
        const {errorMsg} = this.state;
        const ControlComponent = component;
        return <div className={'form-control '+context.layout+(context.hideErrorInfo ? ' hide-error-info':'')}>
            <div className={'error-info error-info-'+context.errorInfoPosition}>
                {(!context.hideErrorInfo && context.submitClickStatus && context.layout==='horizontal') ? errorMsg : ''}
            </div>
            <div className='control-label'>
                <label>
                    {label}
                    {!context.hideRequired && required && <span className='required'>*</span>}
                </label>
                {
                    !context.hideErrorInfo && context.submitClickStatus && context.layout==='vertical'
                    &&
                    <div className={'error-info error-info-'+context.errorInfoPosition}>{errorMsg}</div>
                }
            </div>
            <div className='control-content'>
                <ControlComponent name={name}
                                  value={context.formData[name] || ''}
                                  onChange={this.onChange}
                                  onBlur={this.onBlur}
                                  error={context.submitClickStatus && errorMsg}
                                  {...controlProps}/>
            </div>
        </div>
    }
}
