import React,{Component} from 'react';
import PARAMS from './config.js';
import './style.less';

export default class SideBar extends Component{

    getCnode(){

    }
    render(){
        return (
            <div className="sideBar">
                <div className="treeDom">
                    <ul>
                        {/* {
                            PARAMS.map((item,idx)=>{
                                const cNode = item.cNode;
                                return <li key={idx}>
                                    <div className="parentNode">{item.pNode.label}</div>
                                </li>
                            })
                        } */}

                        <li className="active">
                            <div className="parentNode">商品信息</div>
                            <ul>
                                <li className="hover">商品列表</li>
                                <li>基础配置</li>
                                <li>板块设置</li>
                                <li>策略设置</li>
                                <li>服务器配置</li>
                            </ul>
                        </li>
                        <li>用户信息</li>
                        <li>资金信息</li>
                        <li>订单信息</li>
                        <li>运营信息</li>
                        <li>系统配置</li>
                    </ul>
                </div>
            </div>
        )
    }
}