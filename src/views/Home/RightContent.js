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
import Calendar from 'components/Calendar';
import Alert from 'components/Alert';
import Confirm from 'components/Confirm';
import Dialog from 'components/Dialog';
import Autoplay from 'components/Autoplay';
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

        show1:false,
        show2:false,
        show3:false,

        checked:[],
        checked1:[],
        rowCheck:false,
        allCheckStatus:false,
    };
    change(name, value) {
        this.setState({[name]: value});
    }


    render() {
        const {input1, total, pageSize, current, demo, demo2,radio,show1,show2,show3} = this.state;
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

            <Panel title='日历组件'>
                <div>单身狗模式（o(╥﹏╥)o）</div>
                <Calendar
                    single={true}
                    update={(date)=>{
                        console.log(date);
                    }}
                />
                <Pre code={
                    `<Calendar
                        single={true}
                        update={(date)=>{
                            console.log(date);
                        }}
                    />`
                }/>
                <br/>
                <div>情侣模式（默认开启）</div>
                <Calendar
                    update={(date)=>{
                        console.log(date);
                    }}
                />
                <Pre code={
                    `<Calendar
                        update={(date)=>{
                            console.log(date);
                        }}
                    />`
                }/>
            </Panel>
            <Panel title='弹窗组件'>
                <div>alert</div>
                <button
                    onClick={(ev)=>{this.setState({
                        show1:true,
                    })}}
                    type="button"
                >
                    显示alert
                </button>
                <Pre code={
                    `
                        <Alert
                        parent={this}
                        state="show1"
                        show={show1}
                        title="我是第一个弹窗"
                        content="我是第一个弹窗的内容"
                        confirm={()=>{console.log('第一个弹窗被点击了')}}
                        button="确定"
                        />
                    `
                }/>
                <br/>

                <div>confirm</div>
                <button
                    onClick={(ev)=>{this.setState({
                        show2:true,
                    })}}
                    type="button"
                >
                    显示confirm
                </button>
                <Pre code={
                    `
                        <Confirm
                            parent={this}
                            state="show2"
                            show={show2}
                            title="修改密码"
                            content={<h1>我是内容</h1>}
                            confirm={()=>{console.log('确定')}}
                            cancel={()=>{console.log('取消')}}
                            lButton="取消"
                            rButton="确定"
                        />
                    `
                }/>
                <br/>

                <div>dialog（自定义弹窗）</div>
                <button
                    onClick={(ev)=>{this.setState({
                        show3:true,
                    })}}
                    type="button"
                >
                    显示dialog
                </button>
                <Pre code={
                    `
                        <Dialog
                            parent={this}
                            state="show3"
                            showDialog={show3}
                            title="修改密码"
                            showClose={true}
                            maskClose={true}
                        >
                           <div className="main">
                                   主体内容
                           </div>

                           <div className="end">
                               <span>取消</span>
                               <span>确定</span>
                           </div>
                        </Dialog>
                    `
                }/>
                <br/>

                <br/>

                <Alert
                    parent={this}
                    state="show1"
                    show={show1}
                    title="我是第一个弹窗"
                    content="我是第一个弹窗的内容"
                    confirm={()=>{console.log('第一个弹窗被点击了')}}
                    button="确定"
                />

                <Confirm
                    parent={this}
                    state="show2"
                    show={show2}
                    title="修改密码"
                    content={<h1>我是内容</h1>}
                    confirm={()=>{console.log('确定')}}
                    cancel={()=>{console.log('取消')}}
                    lButton="取消"
                    rButton="确定"
                />

                <Dialog
                    parent={this}
                    state="show3"
                    showDialog={show3}
                    title="修改密码"
                    showClose={true}
                    maskClose={true}
                >
                   <div className="main">
                           主体内容
                   </div>

                   <div className="end">
                       <span>取消</span>
                       <span>确定</span>
                   </div>
                </Dialog>
            </Panel>

            <Panel>
                <div>自动播放</div>
                <div style={{width:'500px'}}>
                    <Autoplay
                        dataList={[
                                {
                                    src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526550365699&di=05e48c925316cf2870ebfb3d0b17922a&imgtype=0&src=http%3A%2F%2Fimage.tupian114.com%2F20151022%2F17350163.jpg',
                                },
                                {
                                    src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526550409291&di=e0896e74ed0850746dcda02a7328436e&imgtype=0&src=http%3A%2F%2Fimage.tupian114.com%2F20120407%2F16415077.jpg',
                                },
                                {
                                    src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526550432091&di=ac6285218ef009677f4f5c96c39b635e&imgtype=0&src=http%3A%2F%2Fimage.tupian114.com%2F20151022%2F12420249.jpg',
                                },
                            ]}
                        height="300px"
                    />
                </div>
                <Pre code={
                    `
                        <Autoplay
                            dataList={[
                                    {
                                        src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526550365699&di=05e48c925316cf2870ebfb3d0b17922a&imgtype=0&src=http%3A%2F%2Fimage.tupian114.com%2F20151022%2F17350163.jpg',
                                    },
                                    {
                                        src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526550409291&di=e0896e74ed0850746dcda02a7328436e&imgtype=0&src=http%3A%2F%2Fimage.tupian114.com%2F20120407%2F16415077.jpg',
                                    },
                                    {
                                        src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526550432091&di=ac6285218ef009677f4f5c96c39b635e&imgtype=0&src=http%3A%2F%2Fimage.tupian114.com%2F20151022%2F12420249.jpg',
                                    },
                                ]}
                            width="500px"
                            height="300px"
                        />
                    `
                }/>
            </Panel>
        </div>
    }
}