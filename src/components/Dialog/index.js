import React from 'react';
import {autobind} from 'core-decorators';
import {Type} from 'js/yydjs';
import PropTypes from 'prop-types';
import './style.less';

@autobind
export default class Dialog extends React.Component {
    static propTypes={
        parent:PropTypes.object.isRequired,
        state:PropTypes.string.isRequired,
        showDialog:PropTypes.bool.isRequired,
        title:PropTypes.string,
        showClose:PropTypes.bool,
        maskClose:PropTypes.bool,
        animation:PropTypes.bool,
    }

    static defaultProps={
        parent:null,//父组件的this（必填）
        state:null,//父组件控制这个弹窗的state名字，字符串（必填）
        showDialog:false,//父组件控制这个弹窗的state名字，本身（必填）
        title:'弹窗默认标题',//弹窗标题
        showClose:false,//是否显示关闭按钮
        maskClose:false,//点击遮罩是否关闭
        animation:true,//是否开启动画
    }

    /*
        <Dialog
            parent={this}
            state="show"
            showDialog={show}
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
    */

	constructor(props){
		super(props);
        this.state={
            show:false,
            defaulttitle:true,
        };
	}

    componentDidMount(){
        let childArr=Type(this.props.children)=='array'?this.props.children:(this.props.children?[this.props.children]:[]);

        for(let child of childArr){
            if(child.props.slot){
                this.setState({
                    ['default'+child.props.slot]:false,
                });
            }
        }
    }

    clickMask(ev){
        if(!this.props.maskClose)return;
        let self=ev.currentTarget;
        let target=ev.target;

        if(target===self&&this.props.parent&&this.props.state){
            this.props.parent.setState({
                [this.props.state]:false,
            });
        }
    }

    handleDialog(){
        if(this.props.parent&&this.props.state){
            this.props.parent.setState({
                [this.props.state]:false,
            });
        }
    }

    render(){
        const {show,defaulttitle}=this.state;
        const {showDialog,showClose,title,animation}=this.props;

        return(
            <div onClick={(ev)=>{this.clickMask(ev)}} className={'Dialog'+(animation?' DialogAnimation':'')+(showDialog?' active':'')}>
                <div className="DialogWrap">
                    {
                        defaulttitle&&
                        <div className="title">
                            <span>{title}</span>
                            {
                                showClose&&
                                <em onClick={this.handleDialog}>
                                    <i className="iconfont icon-ShapeCopy1"></i>
                                </em>
                            }
                        </div>
                    }
                    {
                        React.Children.map(this.props.children,(item,index)=>{
                            return item;
                        })
                    }
                </div>
            </div>
        )
    }
}