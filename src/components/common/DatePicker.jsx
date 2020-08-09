// import React, { Component } from 'react'
// import moment from 'moment';
// import momentLocalizer from 'react-widgets-moment';
// import { Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
// import DateTimePicker from 'react-widgets/lib/DateTimePicker'
// import 'react-widgets/dist/css/react-widgets.css';

// moment.locale('id');
// momentLocalizer()

// export default class DatePicker extends Component {
// 		state = {
// 		  event: moment().format('YYYY-MM-DD 00:00:00')
//     }

//     render() {
//         let { value, id='', name = '', disabled, label = '', help = '', invalidClass, initialValid} = this.props
// 				const { event } = this.state;
// 				if(initialValid==false){
// 					invalidClass = 'form-control is-invalid'
// 					help = 'This field is invalid'
// 				}else{
// 					invalidClass = 'form-control'
//         }

//         if(value==''){
//           value = this.state.event
//         }

//         return (
//           <FormGroup >
//               <Label>{label}</Label>
//                   <DateTimePicker
//                       id={id}
// 											defaultValue={new Date(value)}
//                       onChange={this.setValue.bind(this, name)}
//                       value={new Date(value)}
//                       className={invalidClass}
//                       time={false}
//                       disabled={disabled}
//                       format='DD MMM YYYY'
// 											required
//                   />
//                 <FormFeedback>{help}</FormFeedback>
//             </FormGroup>
//         )
//     }
// 		setValue(property, event) {
//       let date = moment(event).format('YYYY-MM-DD 00:00:00')
// 			this.setState({ event });
// 			this.props.onChange(property, date)
// 		}
// }
import React, { Component } from 'react';
import moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import { FormGroup, FormFeedback } from 'reactstrap';
import { DateTimePicker } from 'react-widgets';
import 'react-widgets/dist/css/react-widgets.css';
import '../tasklist/tasksiswa.css';

moment.locale('id');
momentLocalizer();

export default class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: moment().format('YYYY-MM-DD')
    };
  }

  render() {
    let {
      value,
      id = '',
      name = '',
      disabled,
      label = '',
      help = '',
      time = false,
      format = 'DD MM YYYY',
      isInline,
      colLabel = 'col-md-4',
      colInput = 'col-md-8',
      onChange
    } = this.props;
    const { event } = this.state;

    if (!value) {
      value = this.state.event;
    }

    let labels = isInline ? colLabel + ' label-title-small bold default' : 'col-md-12  label-title-small bold default';
    let inputs = isInline ? colInput : 'col-md-12';

    return (
      <FormGroup className={'row'}>
        <label className={labels}>{label}</label>
        <DateTimePicker
          id={id}
          defaultValue={new Date(value)}
          onChange={onChange}
          value={new Date(value)}
          className={inputs}
          time={time}
          disabled={disabled}
          format={format}
          required
        />
        <FormFeedback>{help}</FormFeedback>
      </FormGroup>
    );
  }
  setValue(property, event) {
    this.props.onChange(property, event.target.value);
  }
}
