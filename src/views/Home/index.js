import React from 'react';
import 'components/style/main.less';
// import Test from 'components/Test';
// import {Route,Router,Switch} from 'react-router';
import LeftNav from '../LeftNav';
import Button from '../Button';

export default class Home extends React.Component {
    render() {
        return <div className='home-page'>
                <LeftNav/>
                <div className='rightContent'>
                    <Button text="确定"/>
                </div>
            </div>
    }
}