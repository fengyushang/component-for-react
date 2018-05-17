import React from 'react';
import PropTypes from 'prop-types';
import {autobind} from 'core-decorators';
import Dialog from 'components/Dialog';
import './style.less';

@autobind
export default class Alert extends React.Component{
    static propTypes={
        parent:PropTypes.object.isRequired,
        state:PropTypes.string.isRequired,
        show:PropTypes.bool.isRequired,
        title:PropTypes.string,
        content:PropTypes.any,
        confirm:PropTypes.func,
        button:PropTypes.string,
    }

    static defaultProps={
        parent:null,//父组件的this（必填）
        state:null,//父组件控制这个弹窗的state名字，字符串（必填）
        show:false,//父组件控制这个弹窗的state名字，本身（必填）
        title:'弹窗默认标题',//弹窗标题
        content:'',//弹窗主题内容
        confirm:()=>{},//确定触发函数
        button:'确定',//按钮文字
    }

    /*
        <Alert
            parent={this}
            state="show1"
            show={show1}
            title="我是第一个弹窗"
            content="我是第一个弹窗的内容"
            confirm={()=>{console.log('第一个弹窗被点击了')}}
            button="确定"
        />
    */

    clickHandle(bool){
        const {state,confirm,cancel}=this.props;

        this.props.parent.setState({
            [state]:false,
        });

        bool?confirm&&confirm():cancel&&cancel();
    }

    render(){
        const {parent,state,show,title,content,button}=this.props;

        return(
            <div className="Alert">
                <Dialog
                    parent={parent}
                    state={state}
                    showDialog={show}
                    title={title||'弹窗'}
                    content={content}
                    maskClose={true}
                >
                    <div className="main">
                        {content}
                    </div>

                    <div className="end1">
                        <span onClick={(ev)=>{this.clickHandle(true)}}>{button}</span>
                    </div>
                </Dialog>
            </div>
        )
    }
}