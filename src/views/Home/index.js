import React from 'react';
import 'components/style/main.less';
import Button from 'components/Button';

export default class Home extends React.Component {
    render() {
        return <div className='home-page'>
                <div className='rightContent'>
                    <Button text="确定"/>
                </div>
            </div>
    }
}