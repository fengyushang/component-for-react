import React from 'react';
import PropTypes from 'prop-types';
import CheckBoxItem from './CheckBoxItem';
import {autobind} from 'core-decorators';
import './style.less';

@autobind
export default class CheckBox extends React.Component {
    static props={
        options:PropTypes.array,
        onChange:PropTypes.func,
        name:PropTypes.string,
        allCheck:PropTypes.bool
    };
    state={
        allCheckStatus:false,
        checked:[],
        rowCheck:false
    };

    //处理重复数据
    kickOutArr(val,arr){
        let beauty = [];
        let res =  arr.filter(function(i){
            return beauty.indexOf(i) <0 && beauty.push(i) && i!=val;
        });
        return res;
    }



    allCheckfunc(_,value){
        const { options,onChange,name } = this.props;
        if(value){
            let arr = [];
            for (let i = 0;i<options.length;i++){
                arr.push(options[i].value);
            }
            this.setState({checked:arr},()=>{ onChange && onChange(name,this.state.checked) });
        }else{
            this.setState({checked:[]},()=>{ onChange && onChange(name,this.state.checked) })
        }
        this.setState({allCheckStatus:value,rowCheck:false});
    }

    changeCheck(_,val){
        const { checked } = this.state;
        const { options,name,onChange } = this.props;
        let newValue = Object.assign({},{val:checked}).val;
        newValue.indexOf(val) >=0 ? newValue = this.kickOutArr(val,newValue) : newValue.push(val);
        this.setState({checked:newValue},()=>{
            if(this.state.checked.length == options.length){
                this.setState({allCheckStatus:true,rowCheck:false})
            }else if (this.state.checked.length == '0'){
                this.setState({allCheckStatus:false,rowCheck:false})
            }else{
                this.setState({allCheckStatus:false,rowCheck:true})
            }
            onChange && onChange(name,this.state.checked);
        });

    }

    render() {
        const { allCheckStatus,checked,rowCheck } = this.state;
        const { options,allCheck,name } = this.props;
        return (
            <div className='check-box'>
                {
                    allCheck &&
                        <CheckBoxItem text='全选' value={ allCheckStatus } onChange={ this.allCheckfunc } rowCheck={rowCheck} className='all-check'/>
                }
                {
                    options.map((item,i)=>{

                        return <CheckBoxItem
                                disabled={ item.disabled }
                                text={item.label}
                                name={name}
                                value={checked.indexOf(item.value)>=0}
                                onChange={ ()=>{ this.changeCheck(item.name,item.value) } }
                                key={i}
                        />
                    })
                }
            </div>
        )
    }
}