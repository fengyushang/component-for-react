import React from 'react';
import PropTypes from 'prop-types';
import './panel.less';

export default class Panel extends React.Component{
    static propTypes = {
        title: PropTypes.string,
        type: PropTypes.string,
        className: PropTypes.string,
    };
    static defaultProps = {
        type: 'default',
        className: '',
    };
    render(){
        const {title, type, className} = this.props;
        return <div className={'my-panel '+(type ? `panel-${type} `:'')+className}>
            { title && <div className='panel-title'>{title}</div>}
            <div className='panel-content'>
                {
                    this.props.children
                }
            </div>
        </div>
    }
}