import React from 'react';
import 'components/style/main.less';
import Button from 'components/Button';
import Input from 'components/Input';

export default class Home extends React.Component {
    state = {
        input1: 123,
    };
    render() {
        const { input1 } = this.state;
        return <div className='home-page'>
                <div className='rightContent'>
                    <Button text="确定" sureBtn/>
                    <Button text="禁止" sureBtn disabled/>
                    <Button text="取消" cancelBtn/>
                    <Button text="禁止" cancelBtn disabled/>
                </div>
            <div>
                <Input name='input1'
                       value={input1}
                       onChange={(name,value)=>this.setState({input1: value})}
                       placeholder='提示信息'
                       disabled={true}
                       unit='元'
                />
            </div>
            </div>
    }
}