import React from 'react';
import {autobind} from 'core-decorators';
import PropTypes from 'prop-types';
import RadioItem from './RadioItem';
import './style.less';


@autobind
export default class Radio extends React.Component {
    static props={
        name:PropTypes.string,
        value:PropTypes.string,
        onChange:PropTypes.func,
        config:PropTypes.object
    };
    change(value){
        const { onChange,name } = this.props;
        onChange && onChange(name,value);
    }

    render() {
        const { value,config } = this.props;
        const { options } = config;
        return (
            <div className='radio'>
                {
                    options?
                        options.map((item,i)=>{
                            return <RadioItem data={item} checked={ value == item.value } onClick={ this.change } key={i}/>
                        })
                        :
                        null
                }
            </div>
        )
    }
}