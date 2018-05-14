import React from 'react';
import {autobind} from 'core-decorators';
import {Panel} from '../../components';
import RightContent from './RightContent.js';
import SideBar from 'components/SideBar';

@autobind
export default class Home extends React.Component {
    state = {

    }
    change(name, value) {
    }

    render() {
        return <div>
                <SideBar/>
                <Panel className='rightContent'>
                    <RightContent/>
                </Panel>
        </div>
    }
}