import React from 'react';
import {autobind} from 'core-decorators';
import {manyDay} from 'js/yydjs';
import './style.less';

@autobind
export default class Calendar extends React.Component{
    constructor(props){
        super(props);
        this.state={
            dayArr:[],
        };

        this.date=new Date();

    }

    componentDidMount(){
        let {dayArr}=this.state;
        let weekArr=['日','一','二','三','四','五','六'];
        let lastMonthDay=[];
        let currentMonthDay=[];
        let nextMonthDay=[];



    }



    render(){
        const {dayArr}=this.state;

        return(
            <div className="Calendar">
                <div className="CalendarSelect">
                    <i className="iconfont icon-icon1"></i>
                    <div className="CalendarPick">
                        <span>选择开始时间</span>
                        <i className="iconfont icon-xingzhuang4"></i>
                        <span>选择结束时间</span>
                    </div>
                </div>

                <div className="CalendarOption">
                    <div className="CalendarTitle">
                        <span>2017-06-07 09:49:49</span>
                        <i className="iconfont icon-xingzhuang4"></i>
                        <span>2017-06-07 09:49:49</span>
                    </div>

                    <div className="CalendarMain">
                        <div className="yearSelect">
                            <div className="fl">
                                <i className="iconfont icon-Group1"></i>
                                <i className="iconfont icon-xingzhuang3"></i>
                                <span>2018年3月</span>
                            </div>

                            <div className="fr">
                                <span>2018年3月</span>
                                <i className="iconfont icon-xingzhuang2"></i>
                                <i className="iconfont icon-Groupwqe"></i>
                            </div>
                        </div>

                        <div className="daySelect">
                            {}
                        </div>
                    </div>

                    <div className="CalendarEnd">

                    </div>
                </div>
            </div>
        )
    }
}