import React from 'react';
import '../../css/main.less';
import {Panel, Button, Row, Col, Breadcrumb, Dropdown} from '../../components';
import {autobind} from 'core-decorators';
import './style.less';

@autobind
export default class Home extends React.Component {
    render() {
        return <div className='home-page'>
                {/*<SideBar/>
                <Panel className='rightContent'>
                    <RightContent/>
                </Panel>*/}
                <Panel title='button'>
                    <Button type='primary' label='primary' onClick={()=>console.log(1)}/>
                    <Button type='default' label='default'/>
                    <Button type='secondary' label='secondary'/>
                    <Button type='default' label='large' size='large'/>
                    <Button type='default' label='default' size='default'/>
                    <Button type='default' label='small' size='small'/>
                    <Button type='primary' label='disabled' disabled/>
                    <Button type='default' label='icon' icon='search1187938easyiconnet'/>
                </Panel>
            <Panel title='Row Col'>
                <Row className='row-test'>
                    <Col span={3}>
                        <div>1</div>
                    </Col>
                    <Col span={6}>
                        <div>2</div>
                    </Col>
                    <Col span={3}>
                        <div>3</div>
                    </Col>
                </Row>
            </Panel>
            <Panel title='breadcrumb'>
                <Breadcrumb routes={[
                    {label: 'text1', link: '/a'},
                    {label: 'text2', link: '/home'},
                    {label: 'text3'},
                ]}/>
            </Panel>
            <Panel title='dropdown'>
                <Dropdown label='dropdown1' arrow={false} data={[
                    {label:'list1',onClick:()=>console.log(1)},
                    {label:'list2',onClick:()=>console.log(2)},
                    {label:'list3',onClick:()=>console.log(3)},
                ]}/>
                <Dropdown label='dropdown2' trigger={['hover']} value={2} border position='topRight' data={[
                    {label:'list1', value: 1, onClick:()=>console.log(1)},
                    {label:'list2', value: 2, onClick:()=>console.log(2)},
                    {label:'list3', value: 3, onClick:()=>console.log(3)},
                ]}/>
            </Panel>
        </div>
    }
}