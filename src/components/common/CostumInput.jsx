import React, { Component } from "react";
import PropTypes from "prop-types";
import { Input } from "reactstrap";

export default class CustomInput extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyUp: PropTypes.func,
    onKeyDown: PropTypes.func,
    disable: PropTypes.bool,
    name: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    help: PropTypes.string,
    isInline: PropTypes.bool,
    id: PropTypes.string,
    pattern: PropTypes.string,
    autoComplete: PropTypes.string,
  };
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.value !== nextProps.value) {
      return true;
    }
    if (this.props.disable !== nextProps.disable) {
      return true;
    }
    return false;
  }

  componentDidMount() {}

  render() {
    let {
      id = "",
      value,
      disable = false,
      name = "",
      label = "",
      placeholder = "",
      help = "",
      isInline = false,
      onFocus,
      onBlur,
      pattern,
      maxLength,
      onKeyUp,
      onKeyDown,
      type,
      step,
      min,
      max,
      size = "md",
      classList = "col-md-12",
      classInput = "form-control",
      autoComplete = "",
      colLabel = "col-md-2",
      colInput = "col-md-4",
    } = this.props;
    let parent = isInline ? "form-group row" : "form-group";
    let labels = isInline
      ? colLabel + " label-title-small bold default"
      : "col-md-12  label-title-small bold default";
    let inputs = isInline ? colInput : classList;

    let self = this;
    return (
      <div className={parent}>
        <label className={labels} htmlFor="text-input">
          {label}
        </label>
        <div className={inputs}>
          {/* <Input pattern={pattern} className={classInput + " form-control inputs "} placeholder={placeholder} name={name} value={value} disabled={disable} */}
          <Input
            pattern={pattern}
            placeholder={placeholder}
            name={name}
            value={value}
            disabled={disable}
            onChange={(e) => {
              self.setValue(name, e);
            }}
            onFocus={onFocus}
            onBlur={onBlur}
            maxLength={maxLength}
            onKeyUp={onKeyUp}
            onKeyDown={onKeyDown}
            id={id}
            type={type}
            step={step}
            bsSize={size}
            autoComplete={this.props.autoComplete}
            min={min}
            max={max}
            autoComplete={autoComplete}
          />
          <span className="help-block">{help}</span>
        </div>
      </div>
    );
  }

  setValue(property, event) {
    if (event.target.validity.valid)
      this.props.onChange(property, event.target.value);
  }
}
