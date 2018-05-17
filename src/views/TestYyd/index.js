import React from 'react';
import {autobind} from 'core-decorators';
import Calendar from 'components/Calendar';
import Alert from 'components/Alert';
import Confirm from 'components/Confirm';
import Dialog from 'components/Dialog';
import Autoplay from 'components/Autoplay';
import './style.less';

@autobind
export default class TestYyd extends React.Component{
    constructor(props){
        super(props);
        this.state={
            show1:false,
            show2:false,
            show3:false,
            dataList:[],
        };
    }

    componentDidMount(){
        setTimeout(()=>{
            this.setState({
                dataList:[
                            {
                                src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526550365699&di=05e48c925316cf2870ebfb3d0b17922a&imgtype=0&src=http%3A%2F%2Fimage.tupian114.com%2F20151022%2F17350163.jpg',

                            },
                            {
                                src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526550409291&di=e0896e74ed0850746dcda02a7328436e&imgtype=0&src=http%3A%2F%2Fimage.tupian114.com%2F20120407%2F16415077.jpg',

                            },
                            {
                                src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526550432091&di=ac6285218ef009677f4f5c96c39b635e&imgtype=0&src=http%3A%2F%2Fimage.tupian114.com%2F20151022%2F12420249.jpg',

                            },
                        ],
            });
        },100);
    }

    render(){
        const {show1,show2,show3,dataList}=this.state;

        return(
            <div className="TestYyd">
                <Calendar
                    single={true}
                    update={(date)=>{
                        console.log(date);
                    }}
                />
                <br/>
                <Calendar
                    update={(date)=>{
                        console.log(date);
                    }}
                />
                <br/>
                <button
                    onClick={(ev)=>{this.setState({
                        show1:true,
                    })}}
                    type="button"
                >
                    显示alert
                </button>
                <br/>
                <br/>
                <button
                    onClick={(ev)=>{this.setState({
                        show2:true,
                    })}}
                    type="button"
                >
                    显示confirm
                </button>
                <br/>
                <br/>
                <button
                    onClick={(ev)=>{this.setState({
                        show3:true,
                    })}}
                    type="button"
                >
                    显示dialog
                </button>
                <br/>
                <Autoplay
                    dataList={dataList}
                    auto={true}
                    frequency={3000}
                    height="200px"
                />

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
            </div>
        )
    }
}