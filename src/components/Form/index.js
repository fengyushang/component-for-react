import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'components';
import {autobind} from 'core-decorators';
import {Event, FORM_FIELD_CHANGE} from "../events";
import './form.less';

export const FormContext = React.createContext({});
@autobind
export default class Form extends React.Component {
    static props = {
        name: PropTypes.string.isRequired,
        hideRequired: PropTypes.bool,
        layout: PropTypes.string,
        onSubmit: PropTypes.func.isRequired,
        hideCancelButton: PropTypes.bool,
        cancelButtonText: PropTypes.string,
        confirmButtonText: PropTypes.string,
        cancelFn: PropTypes.func,
        getFormHelper: PropTypes.func,
        errorInfoPosition: PropTypes.string,
        hideErrorInfo: PropTypes.bool,
    };
    static defaultProps = {
        hideRequired: false,
        layout: 'vertical',
        hideCancelButton: false,
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        errorInfoPosition: 'bottom',
        hideErrorInfo: false,
    };
    state = {
        formData: {},
        errorInfo: {},
        submitClickStatus: false,
    };

    setField(name, value) {
        this.setState(prevState => {
            prevState.formData[name] = value;
            return {formData: prevState.formData};
        }, () => Event.emit(FORM_FIELD_CHANGE, {name, value}));
    }

    setData(data) {
        this.setState({formData: data});
    }

    setError(name, value) {
        this.setState(prevState => {
            prevState.errorInfo[name] = value;
            return {errorInfo: prevState.errorInfo};
        });
    }

    submit(){
        if(this.isCanSubmit()){
            this.setState({submitClickStatus:false});
            this.props.onSubmit(this.state.formData);
        }else{
            this.setState({submitClickStatus:true})
        }
    }

    isCanSubmit(){
        const {errorInfo} = this.state;
        let canSubmit = true;
        for (let key in errorInfo) {
            if (errorInfo[key]) {
                canSubmit = false;
                break;
            }
        }
        return canSubmit;
    }

    render() {
        const {hideCancelButton, cancelButtonText, confirmButtonText, onSubmit, getFormHelper} = this.props;
        const {setField, setData, setError} = this;
        const canSubmit = this.isCanSubmit();
        const formHelperData = {...this.props, ...this.state, setField, setData, setError};
        getFormHelper && getFormHelper(formHelperData);
        return <div className='my-form'>
            <FormContext.Provider value={formHelperData}>
                {this.props.children}
                <div className='form-buttons'>
                    {
                        !hideCancelButton && <Button label={cancelButtonText} cancelBtn/>
                    }
                    <Button label={confirmButtonText}
                            sureBtn
                            // disabled={!canSubmit}
                            onClick={this.submit}/>
                </div>
            </FormContext.Provider>
        </div>
    }
}