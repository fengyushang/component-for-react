import React from 'react';
import 'components/style/main.less';
import Button from 'components/Button';
import Input from 'components/Input';
import Pagination from 'components/Pagination';
import Select from 'components/Select';
import './style.less';

export default class Home extends React.Component {
    state = {
        input1: 123,
    };

    render() {
        const {input1} = this.state;
        return <div className='home-page'>
                <div className='rightContent'>
                    <Button label="确定" sureBtn/>
                    <Button label="禁止" sureBtn disabled/>
                    <Button label="取消" cancelBtn/>
                    <Button label="禁止" cancelBtn disabled/>
                </div>
                <div>
                    <Input name='input1'
                        value={input1}
                        onChange={(name, value) => this.setState({input1: value})}
                        placeholder='提示信息'
                        unit='美元'
                    />
                </div>
                <div>
                    <Select
                        name="demo"
                        value="123"
                        config={{
                            options:[{
                                label:'选项A',
                                value:1
                            },{
                                label:'选项B',
                                value:2
                            }],
                            placeholder:'请输入选项'
                        }
                        }
                    />
                </div>
            <div>
                <Pagination pageSize={10} total={112} current={1} />
            </div>
        </div>
    }
}