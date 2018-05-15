import React from 'react';
import 'components/style/main.less';
import {Panel} from '../../components';
import {autobind} from 'core-decorators';
import RightContent from './RightContent.js';
import SideBar from 'components/SideBar';

@autobind
export default class Home extends React.Component {
    render() {
        return <div className='home-page'>
            <div>
                <SideBar/>
                <Panel className='rightContent'>
                    <RightContent/>
                </Panel>
            </div>
        </div>
    }
}