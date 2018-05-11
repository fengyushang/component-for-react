import React from 'react';
import {autobind} from 'core-decorators';
import {toTwo,manyDay,dateFormat0} from 'js/yydjs';
import './style.less';

@autobind
export default class Calendar extends React.Component{
    constructor(props){
        super(props);
        this.state={
            year1:'',
            month1:'',
            day1:'',
            week1:'',
            hours1:'',
            minutes1:'',
            seconds1:'',
            year2:'',
            month2:'',
            day2:'',
            week2:'',
            hours2:'',
            minutes2:'',
            seconds2:'',
            dayArr1:[],
            dayArr2:[],
            select1:{
                select:-1,
                index:-1,
            },
            select2:{
                select:-1,
                index:-1,
            },
            acrossMonth:false,
        };
        this.date={
            year:'0000',
            month:'00',
            day:'00',
            week:0,
            hours:'00',
            minutes:'00',
            seconds:'00',
        };
    }

    componentWillMount(){
        this.refreshNow();
        this.setDate(1);
        this.setDate(2);
    }

    componentDidMount(){
        this.createDay(1);
        this.createDay(2);
    }

    refreshNow(){
        let date=new Date();

        this.date.year=date.getFullYear();
        this.date.month=date.getMonth()+1;
        this.date.day=date.getDate();
        this.date.week=date.getDay()||7;
        this.date.hours=date.getHours();
        this.date.minutes=date.getMinutes();
        this.date.seconds=date.getSeconds();
    }

    setDate(index){
        let {year,month,day,week,hours,minutes,seconds}=this.date;

        this.setState({
            ['year'+index]:year,
            ['month'+index]:month,
            ['day'+index]:day,
            ['week'+index]:week,
            ['hours'+index]:hours,
            ['minutes'+index]:minutes,
            ['seconds'+index]:seconds,
        });
    }

    createDay(index,year=this.date.year,month=this.date.month){
        let {dayArr1}=this.state;
        let length=42;
        let weekArr=['一','二','三','四','五','六','日'];
        let lastMonth=[];
        let currentMonth=[];
        let nextMonth=[];

        let lastMaxDay=manyDay(year,month-1);
        let firstDayWeek=new Date(year,month-1,1).getDay()||7;
        let currentMaxDay=manyDay(year,month);

        weekArr=weekArr.map((item,index)=>({
            text:item,
            class:'week',
        }));

        for(let i=lastMaxDay;i>lastMaxDay-firstDayWeek+1;i--){
            lastMonth.unshift({
                text:i,
                class:'day lastMonth',
            });
        }
        console.log(lastMonth);

        for(let i=1;i<currentMaxDay+1;i++){
            currentMonth.push({
                text:i,
                class:'day currentMonth',
            });
        }
        console.log(currentMonth);

        for(let i=1;i<length-currentMaxDay;i++){
            nextMonth.push({
                text:i,
                class:'day nextMonth',
            });
        }
        console.log(nextMonth);

        this.setState({
            ['dayArr'+index]:[].concat(weekArr,lastMonth,currentMonth,nextMonth),
        });
    }

    selectDay(select,item,index){
        let {dayArr1,dayArr2,select1,select2}=this.state;

        console.log(select,item,index);
        function selectIndex(){
            if(select1.index==-1||index<=select2.index&&select2.select==1){
                select1.select=select;
                select1.index=index;
            }else{
                select2.select=select;
                select2.index=index;
            }
        };

        if(dayArr1[index].class.indexOf('currentMonth')!=-1||dayArr2[index].class.indexOf('currentMonth')!=-1){
            selectIndex();
        }

        this.setState({
            ['day'+index]:item,
            select1,
            select2,
        });
        console.log(select1,select2);
    }

    selectAcross(select,item,index){
        let className=item.class;
        let {select1,select2}=this.state;

        if(className.indexOf('currentMonth')==-1){
            if(className.indexOf('select')==-1){
                if(select1.select==select&&select1.index==index||select2.select==select&&select2.index==index){
                    className+=' select';
                }
            }

            if(className.indexOf('across')==-1&&select1.index!=-1&&select2.index!=-1){
                if(index>select1.index&&index<select2.index){
                    className+=' across';
                }
            }
        }

        return className;
    }

    render(){
        const {year1,month1,day1,week1,hours1,minutes1,seconds1,year2,month2,day2,week2,hours2,minutes2,seconds2,dayArr1,dayArr2,select1,select2,acrossMonth}=this.state;

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
                        <span>{year1}-{month1}-{day1} {hours1}:{minutes1}:{seconds1}</span>
                        <i className="iconfont icon-xingzhuang4"></i>
                        <span>{year2}-{month2}-{day2} {hours2}:{minutes2}:{seconds2}</span>
                    </div>

                    <div className="CalendarMain">
                        <div className="yearSelect">
                            <div className="fl">
                                <i className="iconfont icon-Group1"></i>
                                <i className="iconfont icon-xingzhuang3"></i>
                                <span>{year1}年{month1}月</span>
                            </div>

                            <div className="fr">
                                <span>{year2}年{month2}月</span>
                                <i className="iconfont icon-xingzhuang2"></i>
                                <i className="iconfont icon-Groupwqe"></i>
                            </div>
                        </div>

                        <div className="daySelectWrap">
                            <div className="daySelect daySelectLeft">
                                {dayArr1.map((item,index)=>(
                                    <span
                                        onClick={(ev)=>this.selectDay(1,item,index)}
                                        key={index}
                                        className={this.selectAcross(1,item,index)}
                                    >
                                        {item.text}
                                    </span>
                                ))}
                            </div>
                            <div className="daySelect daySelectRight">
                                {dayArr2.map((item,index)=>(
                                    <span
                                        onClick={(ev)=>this.selectDay(2,item,index)}
                                        key={index}
                                        className={this.selectAcross(2,item,index)}
                                    >
                                        {item.text}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="CalendarEnd">
                        <div className="selectTime">选择时间</div>
                        <div className="buttonWrap">
                            <button className="CalendarClear" type="button">清空</button>
                            <button className="CalendarConfirm" type="button">确定</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}