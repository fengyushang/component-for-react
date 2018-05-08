import React from 'react';
import propTypes from 'prop-types';
import '../style/pagination.less';

const step = 5;
export default class Pagination extends React.Component {
    static props = {
        pageSize: propTypes.number.isRequired,//每页显示条数
        total: propTypes.number.isRequired,//数据总条数
        current: propTypes.number.isRequired,//当前页码
        hideOnSinglePage: propTypes.bool,//只有一页时是否隐藏分页器
        onChange: propTypes.func.isRequired,//页码改变的回调
    };
    static defaultProps = {
        pageSize: 10,
        total: 0,
        current: 1,
    };

    render() {
        const {pageSize, total, current, hideOnSinglePage, onChange} = this.props;
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
                <li className={current<=1 ? 'disabled':''} onClick={this.goFirst}>&lt;&lt;</li>
                <li className={current<=1 ? 'disabled':''} onClick={this.goLeft}>&lt;</li>
                {
                    total > 0 && <li>1</li>
                }
                {
                    left && <li>...</li>
                }
                {
                    pages.map((item, key) => {
                        return <li key={key}>{item}</li>
                    })
                }
                {
                    right && <li>...</li>
                }
                {
                    pageNum >= 2 && <li>{pageNum}</li>
                }
                <li className={current>=pageNum ? 'disabled':''} onClick={this.goRight}>&gt;</li>
                <li className={current>=pageNum ? 'disabled':''} onClick={()=>current<pageNum && onChange(pageSize)}>&gt;&gt;</li>
            </ul>
        </div>
    }
}