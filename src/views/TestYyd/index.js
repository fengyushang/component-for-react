import React from 'react';
import {autobind} from 'core-decorators';
import Calendar from 'components/Calendar';
import './style.less';

@autobind
export default class TestYyd extends React.Component{
    constructor(props){
        super(props);
        this.state={

        };
    }

    componentDidMount(){

    }

    render(){
        return(
            <div className="TestYyd">
                <Calendar
                    update={(date)=>{
                        console.log(date);
                    }}
                />

                <Calendar
                    update={(date)=>{
                        console.log(date);
                    }}
                />
            </div>
        )
    }
}