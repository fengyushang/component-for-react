import React,{Component} from 'react';
import propTypes from 'prop-types';
import { autobind } from 'core-decorators';
import IconFont from 'components/IconFont';
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
        dropDown:true,
        selectVal:''
    }
    static defalutProps = {
        
    }
    changeItem(name,value,label){
        const {onChange} = this.props;
        this.setState({selectVal:label});
        onChange(name,value);
    }
    selectClick(){
        let {dropDown} = this.state;
        this.setState({dropDown:!dropDown})
    }
    componentWillMount(){
        const {config,value,placeholder} = this.props;
        let res = placeholder;
        for(let i=0; i<config.options.length; i++){
            if(config.options[i].value == value){
                res = config.options[i].label;
                break;
            }
        }
        this.setState({selectVal:res});
    }
    componentDidMount(){
        document.addEventListener('click',this.eventListener);
    }
    eventListener(ev){
        if(this.selectContainer && !this.selectContainer.contains(ev.target)){
            !this.state.dropDown && this.setState({dropDown:true})
        }
    }
    componentWillUnmount(){
        document.removeEventListener('click',this.eventListener);
    }
    render(){
        const {name,label,config,value} = this.props;
        const {dropDown,selectVal} = this.state;
        const borderCls = dropDown ? '' : 'blueBorder';
        return(
            <div className={"select-comp "+borderCls} onClick={()=>this.selectClick()} ref={(container)=>{this.selectContainer=container}}>
                {/* {
                    value ?
                        config.options && config.options.map((item,idx)=>{
                            if(value == item.value){
                                return <span key={idx}>{item.label}<IconFont name="icon"/></span>;
                            }
                        })
                    : (config.placeholder ? <span>{config.placeholder}<IconFont name="icon"/></span> : '')

                } */}
                <span>{selectVal}<IconFont name="icon"/></span>
                <ul>
                {
                    config && config.options && config.options.map((item,idx)=>{
                        return <li key={idx} onClick={()=>this.changeItem(name,item.value,item.label)}>{item.label}</li>
                    })
                }
                </ul>
            </div>
        )
    }
}

export default Select;