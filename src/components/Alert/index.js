import React from 'react';
import ReactDOM from 'react-dom';
import IconFont from 'components/IconFont';
import './alert.less';

class Alert extends React.Component {
    state = {
        queue: [],
    };

    pushQueue(obj) {
        const {queue} = this.state;
        queue.push(obj);
        this.setState({queue}, () => {
            setTimeout(() => {
                this.popQueue(obj);
            }, 3000)
        });
    }

    popQueue(obj) {
        const {queue} = this.state;
        const newQueue = queue.filter((item) => item !== obj);
        this.setState({queue: newQueue});
    }

    render() {
        const {queue} = this.state;
        const iconObj = {
            'success': 'ShapeCopy',
            'info': 'CombinedShapeCopy1',
            'warning': 'CombinedShapeCopy',
            'error': 'ShapeCopy1',
        };
        return <React.Fragment>
            {
                queue.map((obj,key) => {
                    return <div key={key} className={'alert-item ' + (obj.type ? 'alert-' + obj.type : '')}>
                        <IconFont name={iconObj[obj.type]}/>
                        <div>{obj.msg}</div>
                    </div>
                })
            }
        </React.Fragment>
    }
}

let node = document.getElementById('alert-container');
if (!node) {
    node = document.createElement('div');
    node.setAttribute('id', 'alert-container');
    document.body.appendChild(node);
}

let alertArray;
ReactDOM.render(<Alert ref={(ref) => {
    alertArray = ref
}}/>, document.getElementById('alert-container'));

export const success = (msg) => {
    alertArray.pushQueue({msg, type: 'success'});
};
export const info = (msg) => {
    alertArray.pushQueue({msg, type: 'info'});
};
export const warning = (msg) => {
    alertArray.pushQueue({msg, type: 'warning'});
};
export const error = (msg) => {
    alertArray.pushQueue({msg, type: 'error'});
};