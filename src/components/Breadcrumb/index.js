import React from 'react';
import PropTypes from 'prop-types';
import './breadcrumb.less';

export default class Breadcrumb extends React.Component {
    static propTypes = {
        separator: PropTypes.string,
        routes: PropTypes.array,
    };
    static defaultProps = {
        routes: [],
        separator: '/',
    };
    render(){
        const {routes, separator} = this.props;
        return <div className='breadcrumb'>
            {
                routes.map((route, index)=>{
                    return <React.Fragment key={index}>
                        <span className={index<routes.length-1 ? 'breadcrumb-link':''}
                              onClick={()=>route.link && window.open(route.link)}>
                            {route.label}
                        </span>
                        {
                            index<routes.length-1 && <span className='separator'>{separator}</span>
                        }
                    </React.Fragment>
                })
            }
        </div>
    }
}