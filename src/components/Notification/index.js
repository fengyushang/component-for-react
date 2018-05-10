import React from 'react';
import ReactDOM from 'react-dom';
import IconFont from 'components/IconFont';
import './notification.less';

class Notification extends React.Component {
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
                    return <div key={key} className={'notification-item ' + (obj.type ? 'notification-' + obj.type : '')}>
                        <IconFont name={iconObj[obj.type]}/>
                        <div>{obj.msg}</div>
                    </div>
                })
            }
        </React.Fragment>
    }
}

let node = document.getElementById('notification-container');
if (!node) {
    node = document.createElement('div');
    node.setAttribute('id', 'notification-container');
    document.body.appendChild(node);
}

let notificationArray;
ReactDOM.render(<Notification ref={(ref) => {
    notificationArray = ref
}}/>, document.getElementById('notification-container'));

export const success = (msg) => {
    notificationArray.pushQueue({msg, type: 'success'});
};
export const info = (msg) => {
    notificationArray.pushQueue({msg, type: 'info'});
};
export const warning = (msg) => {
    notificationArray.pushQueue({msg, type: 'warning'});
};
export const error = (msg) => {
    notificationArray.pushQueue({msg, type: 'error'});
};