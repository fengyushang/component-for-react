import React from 'react';
import './style.less';
import Test from 'components/Test';

export default class Home extends React.Component {
    render() {
        return <div className='home-page'>
            home
            <Test/>
        </div>
    }
}