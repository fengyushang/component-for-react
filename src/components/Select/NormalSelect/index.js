import React,{Component} from 'react';
import propTypes from 'prop-types';
import { autobind } from 'core-decorators';
import '../select.less'

@autobind
class Select extends Component{
    static props = {
        name:propTypes.string,
        label:propTypes.string,
        value:propTypes.string,
        onChange:propTypes.func.require,
        config:propTypes.object.require
    };
    state = {
        dropDown:true
    }
    static defalutProps = {
        
    }
    changeItem(name,value){
        const {onChange} = this.props;
        onChange(name,value);
    }
    selectClick(){
        let {dropDown} = this.state;
        this.setState({dropDown:!dropDown})
    }
    render(){
        const {name,label,config,value} = this.props;
        const {dropDown} = this.state;
        const borderCls = dropDown ? '' : 'blueBorder';
        return(
            <div className={"select-comp "+borderCls} onClick={()=>this.selectClick()}>
                {
                    value ?
                        config.options && config.options.map((item,idx)=>{
                            if(value == item.value){
                                return <span key={idx}>{item.label}</span>;
                            }
                        })
                    : (config.placeholder ? <span>{config.placeholder}</span> : '')

                }
                <ul>
                {
                    config && config.options && config.options.map((item,idx)=>{
                        return <li key={idx} onClick={()=>this.changeItem(name,item.value)}>{item.label}</li>
                    })
                }
                </ul>
            </div>
        )
    }
}

export default Select;