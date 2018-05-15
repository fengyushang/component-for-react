import React from 'react';
import {autobind} from 'core-decorators';
import PropTypes from 'prop-types';
import {toTwo,manyDay,normalDate,dateFormat0,Scroll} from 'js/yydjs';
import CalendarArr from './CalendarArr';
import './style.less';

@autobind
export default class Calendar extends React.Component{
    static propTypes={
        single:PropTypes.bool,
        format:PropTypes.string,
        startText:PropTypes.string,
        endText:PropTypes.string,
        startDate:PropTypes.string,
        endDate:PropTypes.string,
        update:PropTypes.func,
    }

    static defaultProps={
        single:false,//是否是单个日期选择
        format:'yyyy-MM-dd hh:mm:ss',//输出日期格式化
        startText:'选择开始时间',//默认开始文字
        endText:'选择结束时间',//默认结束文字
        startDate:'',//默认开始时间
        endDate:'',//默认结束时间
        update:()=>{},//选择时间后的回调函数，参数为格式化后的日期
    }

    /*
        <Calendar
            update={(date)=>{
                console.log(date);
            }}
        />
    */

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
            timeJson:{
                hours:[],
                minutes:[],
                seconds:[],
            },
            select1:{
                select:-1,
                index:-1,
                text:'',
            },
            select2:{
                select:-1,
                index:-1,
                text:'',
            },
            selectTime:false,
            startTime:'',
            endTime:'',
            showCalendar:false,
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
        this.hoursWrap1=null;
        this.minutesWrap1=null;
        this.secondsWrap1=null;
        this.hoursWrap2=null;
        this.minutesWrap2=null;
        this.secondsWrap2=null;

        CalendarArr.push(this);
    }

    componentWillMount(){
        this.refreshNow();
        this.setDate(1);
        this.setDate(2);
    }

    componentDidMount(){
        this.createDay(1);
        this.createDay(2);
        this.createTime();
    }

    componentWillUnmount(){
        CalendarArr.splice(0,CalendarArr.length);
    }

    closeAll(){
        for(let value of CalendarArr){
            value.setState({
                selectTime:false,
                showCalendar:false,
            });
        }
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
        let {startDate,endDate}=this.props;

        if(startDate&&index==1||endDate&&index==2){
            let date=index==1?startDate:endDate;

            date=new Date(normalDate(date));
            year=date.getFullYear();
            month=date.getMonth()+1;
            day=date.getDate();
            week=date.getDay()||7;
            hours=date.getHours();
            minutes=date.getMinutes();
            seconds=date.getSeconds();
        }

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

    createDay(select,year=this.date.year,month=this.date.month){
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

        for(let i=1;i<currentMaxDay+1;i++){
            currentMonth.push({
                text:i,
                class:'day currentMonth',
            });
        }

        for(let i=1;i<length-lastMonth.length-currentMonth.length+1;i++){
            nextMonth.push({
                text:i,
                class:'day nextMonth',
            });
        }

        this.setState({
            ['dayArr'+select]:[].concat(weekArr,lastMonth,currentMonth,nextMonth),
            select1:{
                select:-1,
                index:-1,
                text:'',
            },
            select2:{
                select:-1,
                index:-1,
                text:'',
            },
        });
    }

    createTime(){
        let {timeJson}=this.state;
        let [hoursArr,minutesArr,secondsArr]=[[],[],[]];

        for(let i=0;i<24;i++){
            hoursArr.push(toTwo(i));
        }

        for(let i=0;i<60;i++){
            minutesArr.push(toTwo(i));
            secondsArr.push(toTwo(i));
        }

        timeJson.hours=hoursArr;
        timeJson.minutes=minutesArr;
        timeJson.seconds=secondsArr;
    }

    selectDay(select,item,index){
        let This=this;
        let {dayArr1,dayArr2,select1,select2,year1,year2,month1,month2,day1,day2}=this.state;

        if(item.class.indexOf('currentMonth')!=-1){
            if(!this.props.single){
                function selectIndex(){
                    if(select1.select==select2.select&&select1.index==index){
                        select1.select=-1;
                        select1.index=-1;
                        select1.text='';
                    }else if(select1.select==select2.select&&select2.index==index){
                        select2.select=-1;
                        select2.index=-1;
                        select2.text='';
                    }else{
                        if(select1.index==-1){
                            select1.select=select;
                            select1.index=index;
                            select1.text=item.text;
                        }else{
                            select2.select=select;
                            select2.index=index;
                            select2.text=item.text;
                        }
                    }
                };

                if(dayArr1[index].class.indexOf('currentMonth')!=-1||dayArr2[index].class.indexOf('currentMonth')!=-1){
                    selectIndex();
                }

                function getDay(){
                    let dayArr=[];

                    function sortDay(reverse){
                        if(year1==year2&&month1==month2){
                            dayArr[0]=+select1.text<+select2.text?select1.text:select2.text;
                            dayArr[1]=+select1.text>+select2.text?select1.text:select2.text;
                        }else{
                            dayArr[!reverse?0:1]=select1.text;
                            dayArr[!reverse?1:0]=select2.text;
                        }
                    };

                    if(select1.select==1&&select2.select==2){
                        sortDay();
                    }else if(select1.select==2&&select2.select==1){
                        sortDay(true);
                    }else{
                        if(select1.select==1&&select2.select==1){
                            This.setState({
                                month2:month1,
                            });
                        }else if(select1.select==2&&select2.select==2){
                            This.setState({
                                month1:month2,
                            });
                        }

                        if(select1.index!=-1&&select2.index==-1){
                            dayArr[0]=select1.text;
                        }else if(select2.index!=-1&&select1.index==-1){
                            dayArr[0]=select2.text;
                        }else if(select1.index!=-1&&select2.index!=-1){
                            sortDay();
                        }
                    }

                    dayArr[0]=dayArr[0]||day1;
                    dayArr[1]=dayArr[1]||day2;

                    return dayArr;
                };

                this.setState({
                    select1,
                    select2,
                    day1:getDay()[0],
                    day2:getDay()[1],
                });
            }else{
                if(select1.index==index){
                    select1.select=-1;
                    select1.index=-1;
                    select1.text='';
                }else{
                    select1.select=1;
                    select1.index=index;
                    select1.text=item.text;
                }

                this.setState({
                    select1,
                    day1:item.text,
                });
            }
        }
    }

    selectAcross(select,item,index){
        let className=item.class;
        let {select1,select2}=this.state;

        if(className.indexOf('currentMonth')!=-1){
            if(className.indexOf('select')==-1){
                if(select1.select==select&&select1.index==index||select2.select==select&&select2.index==index){
                    className+=' select';
                }
            }

            if(className.indexOf('across')==-1&&select1.index!=-1&&select2.index!=-1){
                if(select1.select==1&&select2.select==2){
                    if(select==1&&index>select1.index||select==2&&index<select2.index){
                        className+=' across';
                    }
                }else if(select1.select==2&&select2.select==1){
                    if(select==1&&index>select2.index||select==2&&index<select1.index){
                        className+=' across';
                    }
                }else if(select1.select==select||select2.select==select){
                    if(index>select1.index&&index<select2.index||index<select1.index&&index>select2.index){
                        className+=' across';
                    }
                }
            }
        }

        return className;
    }

    changeMonth(select,num){
        let {year1,year2,month1,month2}=this.state;

        if(select==1){
            month1=month1+num;
            if(month1<1)month1=12;
            if(month1>12)month1=1;

            if(!this.props.single){
                if(year1==year2&&month1>month2){
                    month1=month2;
                }
            }
        }else if(select==2){
            month2=month2+num;
            if(month2<1)month2=12;
            if(month2>12)month2=1;
            if(year1==year2&&month2<month1){
                month2=month1;
            }
        }

        this.setState({
            month1,
            month2,
        });

        setTimeout(()=>{
            this.createDay(select,this.state['year'+select],this.state['month'+select]);
        });
    }

    changeYear(select,num){
        let {year1,year2,month1,month2}=this.state;

        if(select==1){
            year1=year1+num;

            if(!this.props.single){
                if(year1==year2&&month1>month2){
                    year1=year2-1;
                }else if(year1>year2){
                    year1=year2;
                }
            }
        }else if(select==2){
            year2=year2+num;
            if(year2==year1&&month2<month1){
                year2=year1+1;
            }else if(year2<year1){
                year2=year1;
            }
        }

        this.setState({
            year1,
            year2,
        });

        setTimeout(()=>{
            this.createDay(select,this.state['year'+select],this.state['month'+select]);
        });
    }

    timeScroll(){
        setTimeout(()=>{
            Scroll(this.hoursWrap1,'top',this.hoursWrap1.getElementsByClassName('active')[0].offsetTop);
            Scroll(this.minutesWrap1,'top',this.minutesWrap1.getElementsByClassName('active')[0].offsetTop);
            Scroll(this.secondsWrap1,'top',this.secondsWrap1.getElementsByClassName('active')[0].offsetTop);

            if(!this.props.single){
                Scroll(this.hoursWrap2,'top',this.hoursWrap2.getElementsByClassName('active')[0].offsetTop);
                Scroll(this.minutesWrap2,'top',this.minutesWrap2.getElementsByClassName('active')[0].offsetTop);
                Scroll(this.secondsWrap2,'top',this.secondsWrap2.getElementsByClassName('active')[0].offsetTop);
            }
        });
    }

    setTime(key,value){
        let {year1,month1,day1,hours1,minutes1,seconds1,year2,month2,day2,hours2,minutes2,seconds2}=this.state;

        if(!this.props.single&&year1==year2&&month1==month2&&day1==day2){
            switch(key){
                case 'hours1':
                        if(value>=hours2){
                            hours2=value;
                            if(minutes1>=minutes2){
                                minutes2=minutes1;
                                if(seconds1>seconds2){
                                    seconds2=seconds1;
                                }
                            }
                        }
                        hours1=value;
                    break;
                case 'hours2':
                        if(value<=hours1){
                            hours1=value;
                            if(minutes2<=minutes1){
                                minutes1=minutes2;
                                if(seconds2<seconds1){
                                    seconds1=seconds2;
                                }
                            }
                        }
                        hours2=value;
                    break;
                case 'minutes1':
                        if(hours1==hours2&&value>=minutes2){
                            minutes2=value;
                            if(seconds1>seconds2){
                                seconds2=seconds1;
                            }
                        }
                        minutes1=value;
                    break;
                case 'minutes2':
                        if(hours1==hours2&&value<=minutes1){
                            minutes1=value;
                            if(seconds2<seconds1){
                                seconds1=seconds2;
                            }
                        }
                        minutes2=value;
                    break;
                case 'seconds1':
                        if(hours1==hours2&&minutes1==minutes2&&value>seconds2)seconds2=value;
                        seconds1=value;
                    break;
                case 'seconds2':
                        if(hours1==hours2&&minutes1==minutes2&&value<seconds1)seconds1=value;
                        seconds2=value;
                    break;
            }

            this.setState({
                hours1:+hours1,
                hours2:+hours2,
                minutes1:+minutes1,
                minutes2:+minutes2,
                seconds1:+seconds1,
                seconds2:+seconds2,
            });
        }else{
            this.setState({
                [key]:+value,
            });
        }

        this.timeScroll();
    }

    render(){
        const {year1,month1,day1,week1,hours1,minutes1,seconds1,year2,month2,day2,week2,hours2,minutes2,seconds2,dayArr1,dayArr2,select1,select2,timeJson,selectTime,startTime,endTime,showCalendar}=this.state;
        const {single,format,startText,endText,startDate,endDate,update}=this.props;

        return(
            <div className={'Calendar'+(single?' single':'')}>
                <div
                    className="CalendarSelect"
                    onClick={(ev)=>{
                        this.closeAll();
                        this.setState({
                            showCalendar:!showCalendar,
                        });
                    }}
                >
                    <i className="iconfont icon-icon1"></i>
                    <div className="CalendarPick">
                        <span>{(startTime||startDate)&&dateFormat0(startTime||startDate,format)||startText}</span>
                        {
                            !single&&
                            <i className="iconfont icon-xingzhuang4"></i>
                        }
                        {
                            !single&&
                            <span>{(endTime||endDate)&&dateFormat0(endTime||endDate,format)||endText}</span>
                        }
                    </div>
                </div>

                <div className={'CalendarOption'+(showCalendar?' active':'')}>
                    <div className="CalendarTitle">
                        <span>{year1}-{toTwo(month1)}-{toTwo(day1)} {toTwo(hours1)}:{toTwo(minutes1)}:{toTwo(seconds1)}</span>
                        {
                            !single&&
                            <i className="iconfont icon-xingzhuang4"></i>
                        }
                        {
                            !single&&
                            <span>{year2}-{toTwo(month2)}-{toTwo(day2)} {toTwo(hours2)}:{toTwo(minutes2)}:{toTwo(seconds2)}</span>
                        }
                    </div>

                    <div className="CalendarMain">
                        <div className="yearSelectWrap">
                            <YearSelect
                                parent={this}
                                select="1"
                                className="yearSelectLeft"
                            />

                            {
                                !single&&
                                <YearSelect
                                    parent={this}
                                    select="2"
                                    className="yearSelectRight"
                                />
                            }
                        </div>

                        <div className="daySelectWrap">
                            <DaySelect
                                parent={this}
                                select="1"
                                className="daySelectLeft"
                            />

                            {
                                !single&&
                                <DaySelect
                                    parent={this}
                                    select="2"
                                    className="daySelectRight"
                                />
                            }
                        </div>

                        <div className={'timeSelectWrap'+(selectTime?' active':'')}>
                            <div className="timeSelectTitle">
                                <span>开始时间</span>
                                <span>结束时间</span>
                            </div>

                            <div className="timeSelectMain">
                                <TimeSelect
                                    parent={this}
                                    select="1"
                                    className="timeSelectLeft"
                                />

                                {
                                    !single&&
                                    <TimeSelect
                                        parent={this}
                                        select="2"
                                        className="timeSelectRight"
                                    />
                                }
                            </div>
                        </div>
                    </div>

                    <div className="CalendarEnd">
                        {
                            !selectTime?
                            <div
                                className="selectTime"
                                onClick={(ev)=>{
                                    this.setState({
                                        selectTime:true,
                                    })

                                    this.timeScroll();
                                }}
                            >
                                选择时间
                            </div>
                            :
                            <div
                                className="returnDate"
                                onClick={(ev)=>{
                                    this.setState({
                                        selectTime:false,
                                    })
                                }}
                            >
                                返回日期
                            </div>
                        }

                        <div className="buttonWrap">
                            <button
                                className="CalendarClear"
                                type="button"
                                onClick={(ev)=>{
                                    this.setState({
                                        selectTime:false,
                                        startTime:'',
                                        endTime:'',
                                        select1:{
                                            select:-1,
                                            index:-1,
                                            text:'',
                                        },
                                        select2:{
                                            select:-1,
                                            index:-1,
                                            text:'',
                                        },
                                    });
                                }}
                            >
                                清空
                            </button>

                            <button
                                className="CalendarConfirm"
                                type="button"
                                onClick={(ev)=>{
                                    let outputDate={};

                                    outputDate.startDate=dateFormat0(year1+'/'+month1+'/'+day1+' '+hours1+':'+minutes1+':'+seconds1,format);
                                    outputDate.endDate=dateFormat0(year2+'/'+month2+'/'+day2+' '+hours2+':'+minutes2+':'+seconds2,format);

                                    this.closeAll();
                                    this.setState({
                                        showCalendar:false,
                                        startTime:outputDate.startDate,
                                        endTime:outputDate.endDate,
                                    });
                                    update&&update(!this.props.single?outputDate:outputDate.startDate);
                                }}
                            >
                                确定
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

//props参数
//parent（父组件this）
//select（第几个组件，1或2）
//className（增加的类名）
const YearSelect=(props)=>{
    const {parent,select,className}=props;
    const {state}=parent;

    return(
        <div className={'yearSelect '+className}>
            <i
                onClick={(ev)=>{parent.changeYear(select,-1)}}
                className={(function(){
                    let className='iconfont icon-Group1 ';

                    if(select==2){
                        if(state.month2>=state.month1&&state.year2==state.year1||state.month2<state.month1&&state.year2-1==state.year1){
                            className+='disabled';
                        }
                    }

                    return className;
                }())}
            ></i>
            <i
                onClick={(ev)=>{parent.changeMonth(select,-1)}}
                className={(function(){
                    let className='iconfont icon-xingzhuang3 ';

                    if(select==2){
                        if(state.year2==state.year1&&state.month2==state.month1){
                            className+='disabled';
                        }
                    }

                    return className;
                }())}
            ></i>
            <span>{state['year'+select]}年{toTwo(state['month'+select])}月</span>
            <i
                onClick={(ev)=>{parent.changeMonth(select,1)}}
                className={(function(){
                    let className='iconfont icon-xingzhuang2 ';

                    if(!parent.props.single&&select==1){
                        if(state.year1==state.year2&&state.month1==state.month2){
                            className+='disabled';
                        }
                    }

                    return className;
                }())}
            ></i>
            <i
                onClick={(ev)=>{parent.changeYear(select,1)}}
                className={(function(){
                    let className='iconfont icon-Groupwqe ';

                    if(!parent.props.single&&select==1){
                        if(state.month1<=state.month2&&state.year1==state.year2||state.month1>state.month2&&state.year1+1==state.year2){
                            className+='disabled';
                        }
                    }

                    return className;
                }())}
            ></i>
        </div>
    );
};


//props参数
//parent（父组件this）
//select（第几个组件，1或2）
//className（增加的类名）
const DaySelect=(props)=>{
    const {parent,select,className}=props;
    const {state}=parent;

    return(
        <div className={'daySelect '+className}>
            {state['dayArr'+select].map((item,index)=>(
                <span
                    onClick={(ev)=>parent.selectDay(select,item,index)}
                    key={index}
                    className={parent.selectAcross(select,item,index)}
                >
                    {item.text}
                </span>
            ))}
        </div>
    );
};

//props参数
//parent（父组件this）
//select（第几个组件，1或2）
//className（增加的类名）
const TimeSelect=(props)=>{
    const {parent,select,className}=props;
    const {state}=parent;

    return(
        <div className={'timeSelect '+className}>
            <div className="timeTitle">
                <span>时</span>
                <span>分</span>
                <span>秒</span>
            </div>

            <div className="timeMain">
                <ul ref={(dom)=>{parent['hoursWrap'+select]=dom}} className="timeSelectHours">
                    {state.timeJson.hours.map((item,index)=>(
                        <li onClick={(ev)=>{parent.setTime('hours'+select,item)}} className={item==toTwo(state['hours'+select])?'active':''} key={index}>{item}</li>
                    ))}
                </ul>
                <ul ref={(dom)=>{parent['minutesWrap'+select]=dom}} className="timeSelectMinutes">
                    {state.timeJson.minutes.map((item,index)=>(
                        <li onClick={(ev)=>{parent.setTime('minutes'+select,item)}} className={item==toTwo(state['minutes'+select])?'active':''} key={index}>{item}</li>
                    ))}
                </ul>
                <ul  ref={(dom)=>{parent['secondsWrap'+select]=dom}} className="timeSelectSeconds">
                    {state.timeJson.seconds.map((item,index)=>(
                        <li onClick={(ev)=>{parent.setTime('seconds'+select,item)}} className={item==toTwo(state['seconds'+select])?'active':''} key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};