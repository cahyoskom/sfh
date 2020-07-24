import React, { Component } from "react";
import PropTypes from "prop-types";
import { DropDownList } from "@progress/kendo-dropdowns-react-wrapper";

export default class Select extends Component {
  constructor(props) {
    super(props);
    this.onFilter = this.onFilter.bind(this);
    this.filterType = "contains";
  }

  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    disable: PropTypes.bool,
    name: PropTypes.string,
    label: PropTypes.string,
    help: PropTypes.string,
    isInline: PropTypes.bool,
    id: PropTypes.string,
    nullable: PropTypes.bool,
  };

  onFilter = (e) => {
    console.log("event :: filter");
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.value !== nextProps.value) {
      return true;
    }
    if (this.props.data !== nextProps.data) {
      return true;
    }
    if (this.props.disable !== nextProps.disable) {
      return true;
    }
    return false;
  }

  render() {
    let {
      value,
      data,
      disable = false,
      name = "",
      label = "",
      filter = false,
      help = "",
      isInline = false,
      isObject = false,
      nullable = true,
    } = this.props;
    let parent = isInline ? "form-group row" : "form-group";
    let labels = isInline
      ? "col-md-3 label-title-small bold default"
      : "col-md-12  label-title-small bold default";
    let inputs = isInline ? "col-md-9 dropdown" : "col-md-12 dropdown";
    return (
      <div className={parent} id={name}>
        <label className={labels} htmlFor="text-input">
          {label}
        </label>
        <div className={inputs}>
          <DropDownList
            optionLabel={nullable ? "-- Select One --" : ""}
            filter={filter ? this.filterType : null}
            filtering={filter ? this.onFilter : null}
            name={name}
            dataTextField="text"
            dataValueField="value"
            value={isObject ? value.value : value}
            select={this.setValue.bind(this, name, isObject, name)}
            dataSource={data}
            enable={!disable}
          />
          <input
            style={{ display: "none" }}
            name={name}
            defaultValue={isObject ? value.text : value}
            id={name + "_Id"}
          />
          <span className="help-block">{help}</span>
        </div>
      </div>
    );
  }

  setValue(property, isObject, name, event) {
    if (event.dataItem.isDisabled) {
      event.preventDefault();
      return;
    }

    if (isObject) {
      this.props.onChange(property, {
        value: event.dataItem.value,
        text: event.dataItem.text,
      });
    } else {
      this.props.onChange(property, event.dataItem.value);
    }

    window.jQuery("#" + name + "_Id").focus();
    window.jQuery("#" + name + "_Id").blur();
    event.preventDefault();
  }
}
