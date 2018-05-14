import React from 'react';
import PropTypes from 'prop-types';
import {GutterContext} from '../Row';
import './col.less';

export default class Col extends React.Component {
    static props = {
        span: PropTypes.number,
        xs: PropTypes.number,
        sm: PropTypes.number,
        md: PropTypes.number,
        lg: PropTypes.number,
        xl: PropTypes.number,
        className: PropTypes.string,
    };
    static defaultProps = {
        className: '',
    };
    render() {
        let {span, xs, sm, md, lg, xl, className} = this.props;
        span = span || xl || lg || md || sm || xs;
        return <GutterContext.Consumer>
            {
                gutter => <div className={
                    className
                    + (span ? ` my-col-${span}` : '')
                    + (xs ? ` my-col-xs-${xs}` : '')
                    + (sm ? ` my-col-sm-${sm}` : '')
                    + (md ? ` my-col-md-${md}` : '')
                    + (lg ? ` my-col-lg-${lg}` : '')
                    + (xl ? ` my-col-xl-${xl}` : '')
                } style={{paddingLeft: gutter, paddingRight: gutter}}>
                    {this.props.children}
                </div>
            }
        </GutterContext.Consumer>
    }
}