import React from 'react';
import {autobind} from 'core-decorators';
import IconFont from 'components/IconFont';
import PropTypes from 'prop-types';

@autobind
export default class RadioItem extends React.Component {
    static props = {
        data: PropTypes.object,
        onClick: PropTypes.func,
        checked: PropTypes.bool
    };

    render() {
        const {data, onClick, checked} = this.props;
        const {label, value, disabled} = data;
        return (
            <div className={'radio-item ' + (disabled ? 'disabled' : '')} onClick={_ => {
                !disabled && onClick && onClick(value)
            }}>
                {
                    !disabled && checked ?
                        <IconFont name='OvalCopy'/>
                        :
                        (
                            disabled ?
                                <IconFont name='Oval'/>
                                :
                                <IconFont name='Oval1'/>
                        )
                }
                <span className='radio-label'>{label}</span>
            </div>
        )
    }
}