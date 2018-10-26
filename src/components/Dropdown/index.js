import React from 'react';
import PropTypes from 'prop-types';
import IconFont from "../IconFont";
import {autobind} from 'core-decorators';
import './dropdown.less';

@autobind
export default class Dropdown extends React.Component {
    static propTypes = {
        label: PropTypes.any.isRequired,
        value: PropTypes.any,
        arrow: PropTypes.bool,
        border: PropTypes.bool,
        position: PropTypes.string,
        data: PropTypes.array.isRequired,
    };
    static defaultProps = {
        arrow: true,
        border: false,
        trigger: ['click'],//hover,click
        position: 'bottomLeft',
    };
    state = {
        show: false,
    };
    handleClick(e){
        const path = e.path || e.composedPath();
        if(this.menu && !path.includes(this.menu)){
            this.setState({show: false})
        }
    }
    componentDidMount(){
        document.body.addEventListener('click', this.handleClick);
    }
    componentWillUnmount(){
        document.body.removeEventListener('click', this.handleClick);
    }
    render(){
        const {label, value, arrow, border, position, data} = this.props;
        const {show} = this.state;
        return <div className='dropdown'>
            <div className={border ? 'border ':''}
                 onClick={()=>this.setState({show: !show})}
                 ref={(val)=>this.menu=val}>
                {label}
                {arrow && <IconFont name={show ? 'arrow_u' : 'arrow_d'}/>}
            </div>
            {
                data.length>0 && show &&
                <ul className={position ? position : ''}>
                    {
                        data.map((item,index)=>{
                            return <li key={index}
                                       className={(value && value===item.value) ? 'active':''}
                                       onClick={()=>{
                                           this.setState({show: false});
                                           item.onClick && item.onClick()
                                       }}>{item.label}</li>
                        })
                    }
                </ul>
            }
        </div>
    }
}