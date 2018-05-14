import React,{Component} from 'react';
import propTypes from 'prop-types';
import { autobind } from 'core-decorators';
import '../select.less'
import IconFont from 'components/IconFont';

@autobind
class InputSelect extends Component{

    static props = {
        name:propTypes.string.require,
        value:propTypes.string,
        onChange:propTypes.func.require,
        placeholder:propTypes.string,
        readOnly:propTypes.bool,
        config:propTypes.object.require
    };
    state = {
        dropDown:true,
        dropOptions:[],
        selectPos:-1,
        selectVal:''
    }
    static defaultProps = {
        placeholder:'请输入选项',
        readOnly:false,
        config:{}
    }
    changeItem(name,value,label){
        const {onChange} = this.props;
        this.setState({dropDown:true,selectVal:label});
        onChange(name,value);
    }
    selectClick(){
        this.state.dropDown && this.setState({dropDown:false})
    }
    componentDidMount(){
        document.addEventListener('click',this.eventListener);
        document.addEventListener('keyup',this.dealKeyEvent);
    }
    componentWillMount(){
        const {config,value} = this.props;
        let res = '';
        for(let i =0 ; i<config.options.length; i++){
            if(config.options[i].value == value ){
                res = config.options[i].label;
                break;
            }
        }
        this.setState({dropOptions:config.options,selectVal:res});
    }
    submitSelect(){
        const {dropOptions,selectPos} = this.state;
        this.changeItem(this.props.name,dropOptions[selectPos].value,dropOptions[selectPos].label);
    }
    dealKeyEvent(ev){
        const code = ev.keyCode;
        let {selectPos,dropOptions} = this.state;
        let pos = selectPos;
        if(!this.state.dropDown){
            switch(code){
                case 38:
                    selectPos!=='' && selectPos>=1 && this.setState({selectPos:--selectPos});
                    break;
                case 40:
                    dropOptions.length > 0 && selectPos <dropOptions.length-1 && (!selectPos || selectPos < dropOptions.length) && this.setState({selectPos:++selectPos});
                    break;
                case 13:
                    this.submitSelect();
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
        this.pureSelectResuld();
    }
    pureSelectResuld(){
        const {dropOptions,selectVal} = this.state;
        selectVal == '' && dropOptions.filter((item)=>{
            return item.active = false;
        })
        this.setState({dropOptions:dropOptions});
    }
    searchSelect(ev){
        const {config,name,onChange} = this.props;
        let res = ev.target.value;
        let newArr = config.options.filter((item,idx)=>{
            return item.label.includes(res);
        });
        this.setState({dropOptions:newArr,selectVal:res,dropDown:false,selectPos:0});
    }
    autoResult(res,arr){
        const {name,onChange,config} = this.props;
        arr.length > 0 && res!='' ? (arr[0].active = true) : 
        (arr.filter((item)=>{return item.active = false}));
        return arr;
    }
    mouseLi(idx){
        const {selectPos} = this.state;
        idx !== selectPos && this.setState({selectPos:idx});
    }
    componentWillUnmount(){
        document.removeEventListener('click',this.eventListener);
        document.removeEventListener('keyup',this.dealKeyEvent);
    }
    getHeaderBox(){
        const {value,placeholder } = this.props;
        let {selectVal,dropOptions} = this.state;
        let res = '';
        for(let i =0 ; i<dropOptions.length; i++){
            if(dropOptions[i].value == value ){
                res = dropOptions[i].label;
                break;
            }
        }
        return res;
    }

    render(){
        const {name,label,config,value,placeholder,readOnly} = this.props;
        const {dropDown,dropOptions,selectPos,selectVal} = this.state;
        const borderCls = dropDown ? '' : 'blueBorder';
        const res = this.getHeaderBox();
        return(
            <div className={"select-comp "+borderCls} onClick={()=>this.selectClick()}
                ref={(container)=>{this.selectContainer=container}}
            >
                <div>
                <input placeholder={placeholder} onChange={this.searchSelect} value={selectVal} readOnly={readOnly}/>
                <IconFont name="icon"/></div>
                <ul>
                {
                    dropOptions && dropOptions.map((item,idx)=>{
                        return <li key={idx} 
                        onMouseEnter ={()=>this.mouseLi(idx)}
                        onClick={()=>this.changeItem(name,item.value,item.label)} 
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