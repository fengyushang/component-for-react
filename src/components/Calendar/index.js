import React from 'react';
import {autobind} from 'core-decorators';
import './style.less';

@autobind
export default class Calendar extends React.Component{
    constructor(props){
        super(props);
        this.state={

        };
    }

    componentDidMount(){

    }

    render(){
        return(
            <div className="Calendar">
                <div className="CalendarSelect">
                    <i className="iconfont icon-icon1"></i>
                    <span>选择开始时间</span>
                    <i className="iconfont icon-xingzhuang4"></i>
                    <span>选择结束时间</span>
                </div>

                <div className="CalendarOption">
                    <div className="CalendarTitle">
                        <span>2017-06-07 09:49:49</span>
                        <i className="iconfont icon-xingzhuang4"></i>
                        <span>2017-06-07 09:49:49</span>
                    </div>

                    <div className="CalendarMain">

                    </div>

                    <div className="CalendarEnd">

                    </div>
                </div>
            </div>
        )
    }
}