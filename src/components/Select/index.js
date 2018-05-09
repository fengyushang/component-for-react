import React,{Component} from 'react';
import propTypes from 'prop-types';
import { autobind } from 'core-decorators';
import './select.less'

@autobind
class Select extends Component{
    static props = {
        name:propTypes.string,
        label:propTypes.string,
        value:propTypes.string,
        config:propTypes.object.require
    };
    state = {
        dropDown:true
    }
    static defalutProps = {
        
    }
    changeItem(value){
    }
    selectClick(){

    }
    render(){
        const {name,label,config} = this.props;
        return(
            <div className="select-comp" onClick={()=>this.selectClick}>
                <span>123</span>
                <ul>
            {
                config && config.options && config.options.map((item,idx)=>{
                    return <li key={idx} onClick={()=>this.changeItem(item.value)}>{item.label}</li>
                })
            }
                </ul>
            </div>
        )
    }
}

export default Select;