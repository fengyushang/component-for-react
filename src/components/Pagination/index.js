import React from 'react';
import propTypes from 'prop-types';
import Input from '../Input';
import IconFont from '../IconFont';
import {autobind} from 'core-decorators';
import './pagination.less';

const step = 5;
@autobind
export default class Pagination extends React.Component {
    static props = {
        pageSize: propTypes.number,//每页显示条数
        total: propTypes.number,//数据总条数
        current: propTypes.number,//当前页码
        hideOnSinglePage: propTypes.bool,//只有一页时是否隐藏分页器
        onChange: propTypes.func.isRequired,//页码改变的回调
        config: propTypes.object,//相关文字信息，首页，上一页，尾页，下一页，跳转至
        showQuickJump: propTypes.bool,//是否显示快速跳转至多少页
    };
    static defaultProps = {
        pageSize: 10,
        total: 0,
        current: 1,
        config: {},
        showQuickJump: true,
        hideOnSinglePage: false,
    };
    state = {
        jumpValue: '',
        config: {
            jumpTo: '跳转至',
        }
    };
    componentDidMount(){
        document.addEventListener('keydown',this.keyDownFn);
    }
    componentWillUnmount(){
        document.removeEventListener('keydown',this.keyDownFn);
    }
    keyDownFn(e){
        if(event.keyCode == 13){
            const {pageSize,total,onChange} = this.props;
            const {jumpValue} = this.state;
            if(jumpValue>0 && jumpValue<=(Math.ceil(total / pageSize))){
                onChange(pageSize,parseInt(jumpValue))
            }
        }
    }
    quickJump(name,value){
        const {pageSize,total,onChange} = this.props;
        if(value>0 && value<=(Math.ceil(total / pageSize))){
            onChange(pageSize,parseInt(value));
            this.setState({jumpValue:''});
        }
    }
    jumpValueChange(name,value){
        this.setState({jumpValue: value});
    }
    render() {
        const {pageSize, total, current, hideOnSinglePage, onChange, config, showQuickJump} = this.props;
        const {jumpValue} = this.state;
        const newConfig = Object.assign(this.state.config,config);
        const {first,last,prev,next,jumpTo} = newConfig;
        const pageNum = Math.ceil(total / pageSize);
        let pages = [];
        let left = false;
        let right = false;

        const half = Math.floor(step / 2);
        if (pageNum <= 10) {//10页一下全部显示
            for (let i = 2; i < pageNum; i++) {
                pages.push(i);
            }
        } else {
            if (current <= step - half + 1) {
                left = false;
                right = true;
                for (let i = 2; i <= step; i++) {
                    pages.push(i);
                }
            } else if (current >= pageNum - half) {
                left = true;
                right = false;
                for (let i = pageNum - step + 1; i < pageNum; i++) {
                    pages.push(i);
                }
            } else {
                left = true;
                right = ((current + half) >= pageNum - 1) ? false : true;
                const prev = step % 2 === 0 ? half - 1 : half;
                for (let i = current - prev; i <= current + half; i++) {
                    pages.push(i);
                }
            }
        }

        return <div className='pagination-component' style={(hideOnSinglePage && pageNum === 1) ? {display: 'none'} : {}}>
            <ul className='pagination-list'>
                <li className={current<=1 ? 'disabled':''} onClick={()=>current>1 && onChange(pageSize,1)}>
                    {first || <IconFont name='icon-test1'/>}
                </li>
                <li className={current<=1 ? 'disabled':''} onClick={()=>current>1 && onChange(pageSize,current-1)}>
                    {prev || <IconFont name='xingzhuang'/>}
                </li>
                {
                    total > 0 && <li className={current===1 ? 'active':''} onClick={()=>onChange(pageSize,1)}>1</li>
                }
                {
                    left && <li title={`previous ${step} pages`} className='jump-prev' onClick={()=>onChange(pageSize,current-step>1 ? current-step : 1)}>· · ·</li>
                }
                {
                    pages.map((item, key) => {
                        return <li key={key} className={current===item ? 'active':''} onClick={()=>onChange(pageSize,item)}>{item}</li>
                    })
                }
                {
                    right && <li title={`next ${step} pages`} className='jump-next' onClick={()=>onChange(pageSize,current+step>pageNum ? pageNum : current+step)}>· · ·</li>
                }
                {
                    pageNum >= 2 && <li className={current===pageNum ? 'active':''} onClick={()=>onChange(pageSize,pageNum)}>{pageNum}</li>
                }
                <li className={current>=pageNum ? 'disabled':''} onClick={()=>current<pageNum && onChange(pageSize,current+1)}>
                    {next || <IconFont name='xingzhuang1'/>}
                </li>
                <li className={current>=pageNum ? 'disabled':''} onClick={()=>current<pageNum && onChange(pageSize,pageNum)}>
                    {last || <IconFont name='icon-test'/>}
                </li>
            </ul>
            {
                showQuickJump && <div className='quick-jump'>
                    <span>{jumpTo}</span>
                    <Input name='jumpTo' value={jumpValue} type='number' onChange={this.jumpValueChange} onBlur={this.quickJump}/>
                </div>
            }
        </div>
    }
}