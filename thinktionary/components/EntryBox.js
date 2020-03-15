import React, { Component } from 'react';
import styled from 'styled-components/native'
const HP_SIMPLIFIED = 'hp-simplified'
import * as Font from 'expo-font';
import {AppLoading} from 'expo';

export default class EntryBox extends Component {

    constructor(props) {
        super(props);

        this.state = {
            active: (props.locked && props.active) || false,
            value: props.value || "",
            error: props.error || "",
            label: props.label || "Label",
            loading : true
        };
    }

    async componentWillMount() {
        await Font.loadAsync({
            'hp-simplified': require('../assets/fonts/hp-simplified.ttf'),
        });
        this.setState({loading : false})
    }

    changeValue(event) {
        const value = event.target.value;
        this.setState({ value, error: "" });
    }

    handleKeyPress(event) {
        if (event.which === 13) {
            this.setState({ value: this.props.predicted });
        }
    }

    render() {
        if (!this.state.loading) {
            const {active, value, error, label} = this.state;
            const {id, predicted, locked} = this.props;
            const status = `${(locked ? active : active || value) &&
            "active"} ${locked && !active && "locked"}`;

            //    transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out;
            const Field = styled.View.attrs()`
    width: 50%;
    height: 56px;
    border-radius: 15px;
    margin: 10%;
    position: relative;
    background-color: rgba(255, 255, 255, 0.3);

    &:hover{
        background-color: rgba(255, 255, 255, 0.45);
        shadowColor: rgba(0,0,0, 0.05);  
        shadowOffset: { 
            width: 4,
            height: 0,
        }
        shadowOpacity: 20;
        shadowRadius: 0;
    }

    &.active {
        background-color: #ffffff;
        shadowColor: rgba(0,0,0, 0.2);  
        shadowOffset: { 
            width: 4,
            height: 0,
        }
        shadowOpacity: 20;
        shadowRadius: 0;
    }
    
    &.locked {
        pointer-events: none;
    }
`

//transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out,0.1s padding ease-in-out;
            const FieldInput = styled.TextInput.attrs((/* props */) => ({tabIndex: 0}))`
    width: 100%;
    height: 56px;
    position: relative;
    padding: 0px 16px;
    border: none;
    border-radius: 15px;
    font-family: ${HP_SIMPLIFIED};
    font-size: 16px;
    font-weight: 400;
    background-color: transparent;
    color: #282828;
    shadowColor: rgba(0,0,0, 1.0);  
        shadowOffset: { 
            width: 4,
            height: 0,
        }
        shadowOpacity: 20;
        shadowRadius: 0;
          s
    .active & {
        padding: 24px 16px 8px 16px;
    }
    
    &::-webkit-input-placeholder {
        color: rgba(255, 255, 255, 0.8);
    }

    &::-moz-placeholder {
        color: rgba(255, 255, 255, 0.8);
    }

    &:-ms-input-placeholder {
        color: rgba(255, 255, 255, 0.8);
    }

    &:-moz-placeholder {
        color: rgba(255, 255, 255, 0.8);
    } 
`
// transition: 0.1s all ease-in-out;
            const FieldLabel = styled.Text.attrs((/* props */) => ({tabIndex: 0}))`
    input + label {
    position: absolute;
    top: 24px;
    left: 16px;
    font-family: ${HP_SIMPLIFIED};
    font-size: 12px;
    font-weight: 600;
    line-height: 24px;
    color: #ffffff;
    opacity: 0;
    pointer-events: none;

    &.active {
        top: 4px;
        opacity: 1;
        color: #512da8;
        font-family: ${HP_SIMPLIFIED};
    }
    
    &.error {
        color: #ec392f;
    }
}
`

            const Predicted = styled.Text.attrs((/* props */) => ({tabIndex: 0}))`    
        position: absolute;
        top: 8px;
        left: 16px;
        font-family: ${HP_SIMPLIFIED};
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        color: #e0e0e0;
        opacity: 1;
        pointer-events: none;
}
`

            return (
                <Field style={status}>
                    {active &&
                    value &&
                    predicted &&
                    predicted.includes(value) && <Predicted>{predicted}</Predicted>}
                    <FieldInput style={status}
                                id={id}
                                type="text"
                                value={value}
                                placeholder={label}
                                onChange={this.changeValue.bind(this)}
                                onKeyPress={this.handleKeyPress.bind(this)}
                                onFocus={() => !locked && this.setState({active: true})}
                                onBlur={() => !locked && this.setState({active: false})}
                    />
                    <FieldLabel htmlFor={id} style={error && "error"}>
                        {error || label}
                    </FieldLabel>
                </Field>
            );
        }
        else return (<AppLoading/>);
    }
}
