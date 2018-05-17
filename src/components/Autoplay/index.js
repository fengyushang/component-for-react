import React from 'react';
import {autobind} from 'core-decorators';
import PropTypes from 'prop-types';
import {getStyle,bind,unbind,pDef,tweenMove,css} from 'js/yydjs';
import './style.less';

@autobind
export default class Autoplay extends React.Component{
    static propTypes={
        dataList:PropTypes.array,
        auto:PropTypes.bool,
        frequency:PropTypes.number,
        height:PropTypes.string,
    }

    static defaultProps={
        dataList:[],
        auto:true,
        frequency:3000,
        height:'300px',
    }

    constructor(props){
        super(props);
        this.state={
            iNow:0,
        };

        this.oldProps=this.props;
        this.Autoplay=null;
        this.AutoplayWrap=null;
        this.AutoplayDotWrap=null;
        this.timer=null;
        this.timer1=null;
        this.iNow=0;
        this.onOff=true;
    }

    componentDidMount(){
        console.log(this.props);
    }

    componentDidUpdate(){
        if(JSON.stringify(this.oldProps)!=JSON.stringify(this.props)){
            this.oldProps=this.props;
            if(!this.onOff)return;
            this.onOff=false;
            this.startAutoplay();
        }
    }

    componentWillUnmount(){
        clearInterval(this.timer);
        clearInterval(this.timer1);
    }

    startAutoplay(obj=this.AutoplayWrap,obj1=this.AutoplayDotWrap,styleClass='active',moveType='linear',t=5000,t1=1500,t2=500,t3=2000){
        var This=this;
        var oLi=obj.children;
        var iW=oLi[0].offsetWidth;
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
            css(obj,'translateX',-iW*iL/2);
        }

        bind(obj,'touchstart',fn2);
        function fn2(ev){
            var ev=ev||event;
            clearInterval(This.timer);
            iLeft=ev.changedTouches[0].pageX;
            iTop=ev.changedTouches[0].pageY;
            oTime=+new Date();

            iOld=css(obj,'translateX');
            bind(obj,'touchmove',pDef);
            bind(obj1,'touchmove',pDef);
        };

        bind(obj,'touchmove',fn3);
        function fn3(ev){
            var ev=ev||event;
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

        bind(obj,'touchend',fn4);
        for(let value of obj1.children){
            bind(value,'click',(ev)=>{
                let target=ev.currentTarget;

                iNow=target.getAttribute('index');
                This.setNow(This,iNow);
                fn4();
            });
            bind(value,'click',goOn);
        }
        function fn4(){
            var tDis=+new Date()-oTime;

            if(Math.abs(lDis/iW)>0.3||tDis<300&&Math.abs(lDis)>30){
                lDis<0?iNow++:iNow--;
                fn();
                lDis=0;
            }

            tweenMove(t2,obj,{'translateX':-iNow*iW},moveType,function(){
                iOld=css(obj,'translateX');
            });
            unbind(obj,'touchmove',pDef);
            unbind(obj1,'touchmove',pDef);
        };

        bind(document,'touchmove',goOn);
        bind(document,'touchend',goOn);
        function goOn(){
            clearTimeout(This.timer1);
            This.timer1=setTimeout(fn1,t3);
        };

        fn1();
        function fn1(){
            clearInterval(This.timer);
            This.timer=setInterval(function(){
                iNow++;
                fn();
                tweenMove(t1,obj,{'translateX':-iNow*iW},moveType);
            },t);
        };

        function fn(){
            if(iNow>iL/2){
                iNow%=iL/2;
                css(obj,'translateX',0+lDis);
            }else if(iNow<1){
                iNow=iL/2;
                css(obj,'translateX',-iW*(iL/2+1)+lDis );
            }

            index=iNow%(iL/2);
            if(This.iNow!=index){
                This.iNow=index;
                This.setNow(This,index);
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
            let iW=parseInt(getStyle(this.Autoplay,'width'));

            return iW*length;
        }

        return 'auto';
    }

    render(){
        const {dataList,auto,frequency,height}=this.props;
        const {iNow}=this.state;
        const dataList1=[].concat(dataList,dataList);

        return(
            <div ref={(dom)=>{this.Autoplay=dom}} className="Autoplay">
                <div className="AutoplayScroll">
                    <ul
                        ref={(dom)=>{this.AutoplayWrap=dom}}
                        className="AutoplayWrap"
                        style={{width:this.calcWidth(dataList.length+2)+'px'}}
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

    return(
        <li style={{width:parent.calcWidth()+'px'}} >
            {
                item.link&&
                <a href={item.link?item.link:''} className="AutoplayLink"></a>
            }
            <div style={{backgroundImage:'url('+item.src+')'}} className="AutoplayImage"></div>
        </li>
    );
}