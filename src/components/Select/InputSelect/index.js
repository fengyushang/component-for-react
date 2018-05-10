import React,{Component} from 'react';
import propTypes from 'prop-types';
import { autobind } from 'core-decorators';
import Iconfont from '../../IconFont';
import '../select.less'

@autobind
class InputSelect extends Component{

    static props = {
        name:propTypes.string,
        label:propTypes.string,
        value:propTypes.string,
        onChange:propTypes.func.require,
        placeholder:propTypes.string,
        config:propTypes.object.require
    };
    state = {
        dropDown:true,
        dropOptions:[],
        selectVal:'',
        selectPos:-1
    }
    static defaultProps = {
        placeholder:'请输入选项',
        config:{}
    }
    changeItem(name,value){
        const {onChange} = this.props;
        this.setState({dropDown:true});
        onChange(name,value);
    }
    selectClick(){
        this.state.dropDown && this.setState({dropDown:false})
    }
    componentDidMount(){
        this.setState({dropOptions:this.props.config.options});
        document.addEventListener('click',this.eventListener);
        document.addEventListener('keyup',this.dealKeyEvent)
    }
    dealKeyEvent(ev){
        const code = ev.keyCode;
        let {selectPos,dropOptions} = this.state;
        let pos = selectPos;
        if(!this.state.dropDown){
            switch(code){
                case 38:
                    selectPos!=='' && selectPos>=0 && this.setState({selectPos:selectPos});
                    break;
                case 40:
                    dropOptions.length > 0 && (!selectPos || selectPos < dropOptions.length) && this.setState({selectPos:selectPos});
                    break;
                default:
                    break;
            }
        }

    }
    eventListener(ev){
        if(this.selectContainer && !this.selectContainer.contains(ev.target)){
            !this.state.dropDown && this.setState({dropDown:true})
        }
        this.setState({selectPos:-1})
    }
    searchSelect(ev){
        const {config} = this.props;
        let res = ev.target.value;
        let newArr = config.options.filter((item,idx)=>{
            return item.label.includes(res);
        });
        this.setState({dropOptions:newArr});
    }
    autoResult(res,arr){
        arr.length > 0 && res!='' ? (this.setState({selectPos:0})) : 
        (this.setState({selectPos:''}));
        return arr;
    }
    mouseLi(idx){
        this.setState({selectPos:idx});
    }
    componentWillUnmount(){
        document.removeEventListener('click',this.eventListener);
        document.removeEventListener('keyup',this.dealKeyEvent);
    }
    render(){
        const {name,label,config,value,placeholder} = this.props;
        const {dropDown,dropOptions,selectPos} = this.state;
        const borderCls = dropDown ? '' : 'blueBorder';
        return(
            <div className={"select-comp "+borderCls} onClick={()=>this.selectClick()}
                ref={(container)=>{this.selectContainer=container}}
            >
                {
                    value ?
                    dropOptions && dropOptions.map((item,idx)=>{
                            if(value == item.value){
                                return <div key={idx}><input defaultValue={item.label}
                                 placeholder={placeholder}
                                 onChange={this.searchSelect}
                                /><Iconfont name="icon"/></div>
                            }
                        })
                    : <div><input placeholder={placeholder} onChange={this.searchSelect}/><Iconfont name="icon"/></div>
                }
                <ul>
                {
                    dropOptions && dropOptions.map((item,idx)=>{
                        return <li key={idx} 
                        onMouseEnter ={()=>this.mouseLi(idx)}
                        onClick={()=>this.changeItem(name,item.value)} 
                                className={idx === selectPos ? 'active' : ''}
                        >{item.label}</li>
                    })
                }
                </ul>
            </div>
        )
    }
}

export default InputSelect;