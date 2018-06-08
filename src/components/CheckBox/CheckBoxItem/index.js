import React from 'react';
import IconFont from 'components/IconFont';
import {autobind} from 'core-decorators';
import PropTypes from 'prop-types';

@autobind
export default class CheckBoxItem extends React.Component {
    static props={
        name:PropTypes.string,
        value:PropTypes.string,
        onChange:PropTypes.func,
        disabled:PropTypes.bool,
        text:PropTypes.string,
        rowCheck:PropTypes.bool,
        className:PropTypes.string
    };
    static defaultProps={
        disabled:false
    };

    render() {
        const {name, value, onChange, text,disabled,rowCheck,className} = this.props;
        return (
            <div onClick={ disabled?_=>{}:_ => { onChange && onChange(name,!value) } }
                 className={"h-checkbox " + ( value ? ' checked ' : '') + (disabled ? ' disabled ':'')+(className?className:'')}>
                {
                    disabled ?
                        <IconFont name='RectangleCopy'/>
                        :
                        (
                            rowCheck?
                                <IconFont name='CombinedShape'/>
                                :
                                (value ?
                                        <IconFont name='hebingxingzhuang'/>
                                        :
                                        <IconFont name='Rectangle1'/>
                                )
                        )
                }
                {text ? <span className="checkbox-label">{text}</span> : null}
            </div>
        )
    }
}