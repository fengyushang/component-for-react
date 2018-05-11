import React from 'react';
import 'components/style/main.less';
import Button from 'components/Button';
import Input from 'components/Input';
import Pagination from 'components/Pagination';
import {success, info, warning, error} from 'components/Message';
import Select,{InputSelect} from 'components/Select';
import {autobind} from 'core-decorators';
import './style.less';

@autobind
export default class Home extends React.Component {
    state = {
        input1: 123,
        total: 112,
        pageSize: 20,
        current: 1,
        demo:'1',
        demo2:'1'
    };

    change(name,value){
        this.setState({[name]:value});
    }
    render() {
        const {input1,total,pageSize,current,demo,demo2} = this.state;
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
                <div className="fl">
                    <Select
                        name="demo"
                        value={demo}
                        onChange={this.change}
                        placeholder='请输入选项'                        
                        config={{
                            options:[{
                                label:'选项A',
                                value:1
                            },{
                                label:'选项B',
                                value:2
                            }],
                        }
                        }
                    />
                </div>
                <div className="fl" style={{'marginLeft':'20px'}}>
                <InputSelect
                        name="demo2"
                        value={demo2}
                        onChange={this.change}
                        config={{
                            options:[{
                                label:'选项A',
                                value:1
                            },{
                                label:'选项B',
                                value:2
                            },{
                                label:'东方鸿',
                                value:3
                            },{
                                label:'太阳升',
                                value:4
                            },{
                                label:'西边冒出个',
                                value:5
                            },{
                                label:'毛泽东',
                                value:6
                            }],
                        }
                        }
                    />
                
                </div>
            <div style={{'clear':'both'}}>
                <Pagination total={total}
                            pageSize={pageSize}
                            current={current}
                            onChange={(pageSize, pageNum) => this.setState({current: pageNum})}
                    /*config={{
                        first: '首页',
                        last: '尾页',
                        prev: '上一页',
                        next: '下一页',
                    }}*/
                            border={false}/>
            </div>
            <div>
                <div>message信息</div>
                <Button label="success" sureBtn onClick={()=>success('success')}/>
                <Button label="info" sureBtn onClick={()=>info('info')}/>
                <Button label="warning" sureBtn onClick={()=>warning('warning')}/>
                <Button label="error" sureBtn onClick={()=>error('error')}/>
            </div>
        </div>
    }
}