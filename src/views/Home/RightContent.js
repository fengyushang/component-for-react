import React from 'react';
import 'components/style/main.less';
import Button from 'components/Button';
import {message, Input, Pagination, Row, Col, Panel} from '../../components';
import Select, {InputSelect} from 'components/Select';
import Tipsy from 'components/Tipsy';
import Pre from 'components/Pre';
import {autobind} from 'core-decorators';
import Radio from 'components/Radio';
import CheckBox from 'components/CheckBox';
import './style.less';

@autobind
export default class RightContent extends React.Component {
    state = {
        input1: 123,
        total: 112,
        pageSize: 20,
        current: 1,
        demo: '1',
        demo2: '1',
        radio:'',
        checked:[],
        checked1:[],
        rowCheck:false,
        allCheckStatus:false,
        checkArr:[
            {label:"英雄联盟",value:"1",disabled:false},
            {label:"王者荣耀",value:"2",disabled:false},
            {label:"刺激战场",value:"3",disabled:false}
        ]
    };
    change(name, value) {
        this.setState({[name]: value});
    }

    kickOutArr(val,arr){
        let beauty = [];
        let res =  arr.filter(function(i){
            return beauty.indexOf(i) <0 && beauty.push(i) && i!=val;
        });
        return res;
    }

    allcheck(name,value){
        const { checkArr } = this.state;
        if(value){
            let arr = [];
            for (let i = 0;i<checkArr.length;i++){
                arr.push(checkArr[i].value);
            }
            this.setState({checked:arr});
        }else{
            this.setState({checked:[]})
        }
        this.setState({allCheckStatus:value,rowCheck:false});
    }

    checkChange(name,value,options){
        const { checked } = this.state;
        let newValue = Object.assign({},{val:checked}).val;
        newValue.indexOf(value) >=0 ? newValue = this.kickOutArr(value,newValue) : newValue.push(value);
        this.setState({checked:newValue},()=>{
            if(this.state.checked.length == options.length){
                this.setState({allCheckStatus:true,rowCheck:false})
            }else if (this.state.checked.length == '0'){
                this.setState({allCheckStatus:false,rowCheck:false})
            }else{
                this.setState({allCheckStatus:false,rowCheck:true})
            }
        });
    }

    render() {
        const {input1, total, pageSize, current, demo, demo2,radio,checked,allCheckStatus,checkArr,rowCheck,checked1} = this.state;
        return <div className='home-page'>
            <Panel title='按钮' className='rightContent'>
                <Button label="确定" sureBtn/>
                <Pre code={`<Button label="确定" sureBtn/>`}/>
                <Button label="禁止" sureBtn disabled/>
                <Pre code={`<Button label="禁止" sureBtn disabled/>`}/>
                <Button label="取消" cancelBtn/>
                <Pre code={`<Button label="取消" cancelBtn/>`}/>
                <Button label="禁止" cancelBtn disabled/>
                <Pre code={`<Button label="禁止" cancelBtn disabled/>`}/>
            </Panel>
            <Panel title='input输入框'>
                <Input name='input1'
                       value={input1}
                       onChange={(name, value) => this.setState({input1: value})}
                       placeholder='提示信息'
                       unit='美元'
                />
                <Pre code={
                    `<Input name='input1'
                       value={input1}
                       onChange={(name, value) => this.setState({input1: value})}
                       placeholder='提示信息'
                       unit='美元'
                />`}/>
            </Panel>
            <Panel title='select'>
                <div style={{"position":"relative","zIndex":"2"}}>
                    常规下拉框：
                    <InputSelect
                        name="demo"
                        value={demo}
                        onChange={this.change}
                        placeholder='请输入选项'
                        readOnly={true}
                        config={{
                            options: [{
                                label: '选项A',
                                value: 1
                            }, {
                                label: '选项B',
                                value: 2
                            }]
                        }}
                    />
                    <Pre
                        code={
`<InputSelect
    name="demo"
    value={demo}
    onChange={this.change}
    placeholder='请输入选项'     
    readOnly={true}                   
    config={{
        options: [{
            label: '选项A',
            value: 1
        }, {
            label: '选项B',
            value: 2
        }]
    }}
/>`}/>
                </div>
                <div style={{'marginTop': '20px'}}>
                    可输入下拉框：
                    <InputSelect
                        name="demo2"
                        value={demo2}
                        onChange={this.change}
                        config={{
                            options: [{
                                label: '选项A',
                                value: 1
                            }, {
                                label: '选项B',
                                value: 2
                            }, {
                                label: '东方鸿',
                                value: 3
                            }, {
                                label: '太阳升',
                                value: 4
                            }, {
                                label: '西边冒出个',
                                value: 5
                            }, {
                                label: '毛泽东',
                                value: 6
                            }]
                        }}
                    />
                    <Pre
                        code={
`<InputSelect
    name="demo2"
    value={demo2}
    onChange={this.change}
    config={{
        options: [{
            label: '选项A',
            value: 1
        }, {
            label: '选项B',
            value: 2
        }, {
            label: '东方鸿',
            value: 3
        }, {
            label: '太阳升',
            value: 4
        }, {
            label: '西边冒出个',
            value: 5
        }, {
            label: '毛泽东',
            value: 6
        }]
    }}
/> `}/>
                </div>
            </Panel>
            <Panel title='分页'>
                <Pagination total={total}
                            pageSize={pageSize}
                            current={current}
                            onChange={(pageSize, pageNum) => this.setState({current: pageNum})}
                    /*config={{
                        first: '首页',
                        last: '尾页',
                        prev: '上一页',
                        next: '下一页',
                    }}*/
                            border={false}/>
                <Pre code={`<Pagination total={total}
                    pageSize={pageSize}
                    current={current}
                    onChange={(pageSize, pageNum) => this.setState({current: pageNum})}
                border={false}/>
                `}/>
            </Panel>
            <Panel title='message信息'>
                <Button label="success" sureBtn onClick={() => message.success('success')}/>
                <Pre code={`<Button label="success" sureBtn onClick={() => message.success('success')}/>`}/>
                <Button label="info" sureBtn onClick={() => message.info('info')}/>
                <Pre code={`<Button label="info" sureBtn onClick={() => message.info('info')}/>`}/>
                <Button label="warning" sureBtn onClick={() => message.warning('warning')}/>
                <Pre code={`<Button label="warning" sureBtn onClick={() => message.warning('warning')}/>`}/>
                <Button label="error" sureBtn onClick={() => message.error('error')}/>
                <Pre code={`<Button label="error" sureBtn onClick={() => message.error('error')}/>`}/>
            </Panel>
            <Panel title='悬浮提示框'>
                <div style={{paddingLeft: '10px'}}>
                    <div>悬浮提示框</div>
                    <Tipsy tipsyText='你瞅啥？瞅你咋地！'/>
                    <Pre code={`<Tipsy tipsyText='你瞅啥？瞅你咋地！'/>`}/>
                    <Tipsy tipsyText='波棱盖卡马路牙子上，卡秃噜皮了' placement='right'/>
                    <Pre code={`<Tipsy tipsyText='波棱盖卡马路牙子上，卡秃噜皮了' placement='right'/>`}/>
                    <Tipsy tipsyText='有一种回答叫嗯哪,有一种解决叫咋整,　有一种浪费叫霍霍，有一种重复叫磨叽，有一种状况叫毛楞,有一种面貌叫磕碜，有一种讨厌叫咯应,有一种观察叫撒漠,有一种掩护叫打狼,有一种为人叫得瑟,'
                        placement='bottom'/>
                    <Pre code={`<Tipsy tipsyText='有一种回答叫嗯哪,有一种解决叫咋整,　有一种浪费叫霍霍，有一种重复叫磨叽，有一种状况叫毛楞,有一种面貌叫磕碜，有一种讨厌叫咯应,有一种观察叫撒漠,有一种掩护叫打狼,有一种为人叫得瑟,'  placement='bottom'/>`}/>
                    <Tipsy tipsyText='有一种疑问叫噶哈，有一种习惯叫埋汰，有一种聊天叫唠嗑，有一种速度叫麻溜，有一种愤怒叫急眼，有一种喜欢叫稀罕，有一种厉害叫尿性，有一种傻叫得儿呵，有一种心情叫憋屈，' placement='left'/>
                    <Pre code={`<Tipsy tipsyText='有一种疑问叫噶哈，有一种习惯叫埋汰，有一种聊天叫唠嗑，有一种速度叫麻溜，有一种愤怒叫急眼，有一种喜欢叫稀罕，有一种厉害叫尿性，有一种傻叫得儿呵，有一种心情叫憋屈，' placement='left'/>`}/>
                </div>
            </Panel>
            <Panel title='栅栏'>
                <Row gutter={8} className='row-test'>
                    <Col span={3}>
                        <div>1</div>
                    </Col>
                    <Col span={6}>
                        <div>2</div>
                    </Col>
                    <Col span={3}>
                        <div>3</div>
                    </Col>
                </Row>
                <Pre code={`                <Row gutter={8} className='row-test'>
                    <Col span={3}>
                        <div>1</div>
                    </Col>
                    <Col span={6}>
                        <div>2</div>
                    </Col>
                    <Col span={3}>
                        <div>3</div>
                    </Col>
                </Row>`}/>
            </Panel>
            <Panel title='Radio单选按钮'>
                <Radio
                    name='radio'
                    value={radio}
                    onChange={this.change}
                    config={{
                        options: [
                            {label: '三级头', value: 0, disabled: true},
                            {label: '三级甲', value: 1},
                            {label:'三级包',value:2},
                            {label: 'Kar98k', value: 3},
                        ]
                    }}
                />
                <Pre code={`<Radio
                    name='radio'
                    value={radio}
                    onChange={this.change}
                    config={{
                        options:[
                            {label:'三级头',value:0,disabled:true},
                            {label:'三级甲',value:1},
                            {label:'三级包',value:2},
                            {label:'Kar98k',value:3},
                        ]
                    }}
                    />`}/>
            </Panel>
            <Panel title='CheckBox多选框'>
                <CheckBox
                    options={[
                        {label:"LCK",value:"0",disabled:true},
                        {label:"LPL",value:"1",disabled:false},
                    ]}
                    name='team'
                    onChange={(name,value)=>{ console.log(name,value) }}
                />
                <Pre code={`
                    <CheckBox
                    options={[
                        {label:"英雄联盟",value:"0",disabled:true},
                        {label:"王者荣耀",value:"1",disabled:false},
                    ]}
                    name='team'
                    onChange={(name,value)=>{ console.log(name,value) }}
                />
                />
                `}/>
                <CheckBox
                    options={[
                        {label:"英雄联盟",value:"0",disabled:false},
                        {label:"王者荣耀",value:"1",disabled:false},
                        {label:"绝地求生",value:"2",disabled:false}
                    ]}
                    name='checkbox'
                    onChange={(name,value)=>{ console.log(name,value) }}
                    allCheck
                />
                <Pre code={`
                    <CheckBox
                    options={[
                        {label:"英雄联盟",value:"0",disabled:false},
                        {label:"王者荣耀",value:"1",disabled:false},
                        {label:"刺激战场",value:"2",disabled:false}
                    ]}
                    name='checkbox'
                    onChange={(name,value)=>{ console.log(name,value) }}
                    allCheck
                />
                `}/>
            </Panel>

        </div>
    }
}