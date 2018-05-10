import React from 'react';
import 'components/style/main.less';
import Button from 'components/Button';
import Input from 'components/Input';
import Pagination from 'components/Pagination';
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
        demo2:''
    };

    change(name,value){
        this.setState({[name]:value});
    }
    change2(name,val){
        console.log(name,val);
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
                        onChange={this.change2}
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
            <div style={{'clear':'both'}}>
                <Pagination total={total}
                            pageSize={pageSize}
                            current={current}
                            onChange={(pageSize,pageNum)=>this.setState({current:pageNum})}
                            /*config={{
                                first: '首页',
                                last: '尾页',
                                prev: '上一页',
                                next: '下一页',
                            }}*/
                            border={false}/>
            </div>
        </div>
    }
}