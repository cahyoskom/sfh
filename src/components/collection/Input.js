import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Input extends Component {
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

  componentDidMount() {
    let self = this;
    if (this.props.isDropDown && this.props.id != undefined) {
      var observer;
      var targetNode = document.getElementById(this.props.id);
      var config = { attributes: true, childList: true, subtree: true };
      var callback = function (mutationsList) {
        for (var mutation of mutationsList) {
          if (mutation.type == "attributes") {
            if (mutation.attributeName == "style") {
              $("#" + self.props.id + "_Id-error").attr(
                "style",
                "margin-left: 15px !important"
              );
            }
          }
        }
      };
      observer = new MutationObserver(callback);
      observer.observe(targetNode, config);
    }
  }

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
      isDropDown,
      classList = "col-md-12",
      classInput = "form-control",
      autoComplete = "",
    } = this.props;
    let parent = isInline ? "form-group row" : "form-group";
    let labels = isInline
      ? "col-md-3  label-title-small bold default"
      : "col-md-12  label-title-small bold default";
    let inputs = isInline ? "col-md-9" : classList;

    let self = this;
    return (
      <React.Fragment>
        <label className={labels} htmlFor="text-input">
          {label}
        </label>
        <div className={inputs}>
          <input
            pattern={pattern}
            className={classInput + " form-control inputs "}
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
            autoComplete={this.props.autoComplete}
            min={min}
            max={max}
            autoComplete={autoComplete}
          />
          <span className="help-block">{help}</span>
        </div>
      </React.Fragment>
    );
  }

  setValue(property, event) {
    if (event.target.validity.valid)
      this.props.onChange(property, event.target.value);
  }
}
