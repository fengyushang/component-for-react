import React,{Component} from 'react';
import PARAMS from './config.js';
 
import './style.less';

export default class SideBar extends Component{
    state = {
        pIndex:0,
        cIndex:0
    }
    getCnode(items){
        const {cIndex} = this.state;
        const li = items && items.map((item,idx)=>{
            const cls = idx == cIndex ? 'hover' : ''
            return <li key={idx} className={cls} onClick={()=>this.changeCindex(idx)}>{item.label}</li>
        });
        return li;
    }
    changePindex(idx){
        console.log(1111);
        this.setState({pIndex:idx,cIndex:0});
    }
    changeCindex(idx){
        console.log(idx);
        this.setState({cIndex:idx});
    }
    render(){
        const {pIndex} = this.state;
        return (
            <div className="sideBar">
                <div className="treeDom">
                    <ul className="cUl">
                        {
                            PARAMS.map((item,idx)=>{
                                const cNode = this.getCnode(item.cNode);
                                const cls = idx == pIndex ? 'active' : '';
                                return <li key={idx} className={cls} >
                                    <div className="parentNode" onClick={()=>this.changePindex(idx)}>{item.pNode.label}</div><ul>{cNode}</ul>
                                </li>
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}