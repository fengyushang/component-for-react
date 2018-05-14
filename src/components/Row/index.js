import React from 'react';
import PropTypes from 'prop-types';
import './row.less';
export const GutterContext = React.createContext(0);
export default class Row extends React.Component{
    static props = {
        align: PropTypes.string,
        justify: PropTypes.number,
        gutter: PropTypes.bool,
        className: PropTypes.string,
    };
    static defaultProps = {
        justify: 'start',
        gutter: 0,
        className: '',
    };
    render(){
        const {align,justify,gutter,className} = this.props;
        const alignTransfer = {
            'top':'flex-start',
            'middle':'center',
            'bottom':'flex-end'
        };
        const justifyTransfer = {
            'start':'flex-start',
            'end':'flex-end',
            'center':'center',
            'space-between':'space-between',
            'space-around':'space-around',
        };
        return <div className={'my-row '+className} style={{alignItems: alignTransfer[align],justifyContent:justifyTransfer[justify]}}>
            <GutterContext.Provider value={gutter}>
                {this.props.children}
            </GutterContext.Provider>
        </div>
    }
}