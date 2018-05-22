import React from 'react';
import {autobind} from 'core-decorators';
import PropTypes from 'prop-types';
import {getStyle,bind,unbind,pDef,tweenMove,css} from 'js/yydjs';
import './style.scss';

@autobind
export default class Autoplay extends React.Component{
    static propTypes={
        dataList:PropTypes.array,
        auto:PropTypes.bool,
        height:PropTypes.string,
        t:PropTypes.number,
        t1:PropTypes.number,
        t2:PropTypes.number,
        t3:PropTypes.number,
    }

    static defaultProps={
        dataList:[],//轮播图片的数据，（注意，只会执行一遍开始轮播的函数，在这个数组不为空的时候）
        /*
            [{
                src:'',//图片地址
                link:'',//链接地址，有则点击跳转
            }]
        */
        auto:true,//是否自动播放
        height:'300px',//容器高度
        t:5000,//轮播间隔
        t1:1000,//轮播滚动时间
        t2:500,//划屏滚动时间
        t3:2000,//划屏后轮播延迟时间
    }

    /*
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
    */

    constructor(props){
        super(props);
        this.state={
            iW:this.calcWidth(),
            iNow:0,
        };

        this.iW=this.calcWidth();
        this.Autoplay=null;
        this.AutoplayWrap=null;
        this.AutoplayDotWrap=null;
        this.timer=null;
        this.timer1=null;
        this.iNow=0;
        this.onOff=true;
        this.exist=true;
    }

    componentDidMount(){
        this.startExecute();
    }

    componentDidUpdate(){
        this.startExecute();
    }

    componentWillUnmount(){
        this.exist=false;
        clearInterval(this.timer);
        clearTimeout(this.timer1);
        unbind(window,'resize',this.setWidth);
    }

    startExecute(){
        if(this.props.dataList&&this.props.dataList.length){
            if(!this.onOff)return;
            this.onOff=false;
            const {auto,t,t1,t2,t3}=this.props;

            this.setWidth();
            bind(window,'resize',this.setWidth);
            this.startAutoplay(this.AutoplayWrap,this.AutoplayDotWrap,'active','linear',auto,t,t1,t2,t3);
        }
    }

    setWidth(){
        this.setState({
            iW:this.calcWidth(),
        });
    };

    startAutoplay(obj,obj1,styleClass,moveType,autoBool,t,t1,t2,t3){
        var This=this;
        var oLi=obj.children;
        var iL=oLi.length;
        var iLeft=0;
        var iTop=0;
        var lDis=0;
        var tDis=0;
        var oTime=0;
        var iNow=0;
        var index=0;
        var iOld=0;

        if(iNow==0){
            iNow=iL/2;
            index=iNow%(iL/2);
            This.setNow(This,index);
            css(obj,'translateX',-This.iW*iL/2);
        }

        bind(obj,'touchstart',start);
        function start(ev){
            var ev=ev||window.event;
            clearInterval(This.timer);
            iLeft=ev.changedTouches[0].pageX;
            iTop=ev.changedTouches[0].pageY;
            oTime=+new Date();

            iOld=css(obj,'translateX');
            bind(obj,'touchmove',pDef);
            bind(obj1,'touchmove',pDef);
        };

        bind(obj,'touchmove',move);
        function move(ev){
            var ev=ev||window.event;
            lDis=ev.changedTouches[0].pageX-iLeft;
            tDis=ev.changedTouches[0].pageY-iTop;
            var condition=Math.abs(lDis)-Math.abs(tDis);

            if(condition<0){
                unbind(obj,'touchmove',pDef);
                unbind(obj1,'touchmove',pDef);
            }else{
                css(obj,'translateX',iOld+lDis);
            }
        };

        bind(obj,'touchend',end);
        function end(){
            var tDis=+new Date()-oTime;

            if(Math.abs(lDis/This.iW)>0.3||tDis<300&&Math.abs(lDis)>30){
                lDis<0?iNow++:iNow--;
                judge();
                lDis=0;
            }

            tweenMove(t2,obj,{'translateX':-iNow*This.iW},moveType,function(){
                iOld=css(obj,'translateX');
            });
            unbind(obj,'touchmove',pDef);
            unbind(obj1,'touchmove',pDef);
        };

        for(let value of obj1.children){
            bind(value,'click',click);
            function click(ev){
                let target=ev.currentTarget;

                iNow=target.getAttribute('index');
                This.setNow(This,iNow);
                end();
                goOn();
            };
        }

        bind(document,'touchmove',goOn);
        bind(document,'touchend',goOn);
        function goOn(){
            clearInterval(This.timer);
            clearTimeout(This.timer1);
            if(autoBool)This.timer1=setTimeout(auto,t3);
        };

        if(autoBool)auto();
        function auto(){
            if(!This.exist)return clearTimeout(This.timer1);
            clearInterval(This.timer);
            This.timer=setInterval(function(){
                iNow++;
                judge();
                tweenMove(t1,obj,{'translateX':-iNow*This.iW},moveType);
            },t);
        };

        function judge(){
            if(iNow>iL/2){
                iNow%=iL/2;
                css(obj,'translateX',0+lDis);
            }else if(iNow<1){
                iNow=iL/2;
                css(obj,'translateX',-This.iW*(iL/2+1)+lDis);
            }

            index=iNow%(iL/2);
            if(This.iNow!=index){
                This.iNow=index;
                if(This.exist){
                    This.setNow(This,index)
                }
            }
        };
    }

    setNow(This,iNow){
        This.setState({
            iNow,
        });
    }

    calcWidth(length=1){
        if(this.Autoplay){
            let iW=this.Autoplay.offsetWidth||parseInt(getStyle(this.Autoplay,'width'));

            return iW*length;
        }

        return 'auto';
    }

    render(){
        const {dataList,auto,frequency,height}=this.props;
        const {iW,iNow}=this.state;
        const dataList1=[].concat(dataList,dataList);

        this.iW=iW;

        return(
            <div style={{height}} ref={(dom)=>{this.Autoplay=dom}} className="Autoplay">
                <div className="AutoplayScroll">
                    <ul
                        ref={(dom)=>{this.AutoplayWrap=dom}}
                        className="AutoplayWrap"
                        style={{width:iW*(dataList.length+2)+'px'}}
                    >
                        {dataList1.map((item,index)=>(
                            <AutoplayLi
                                parent={this}
                                item={item}
                                key={index}
                            />
                        ))}
                    </ul>
                </div>

                <div className="AutoplayDotWrap">
                    <ol ref={(dom)=>{this.AutoplayDotWrap=dom}}>
                        {dataList.map((item,index)=>(
                            <li index={index} className={index==iNow?'active':''} key={index}></li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

const AutoplayLi=(props)=>{
    const {parent,item}=props;
    const {state}=parent;

    return(
        <li style={{width:state.iW+'px'}} >
            {
                item.link&&
                <a href={item.link?item.link:''} className="AutoplayLink"></a>
            }
            <div style={{backgroundImage:'url('+item.src+')'}} className="AutoplayImage"></div>
        </li>
    );
}