import React from 'react';

import './Input.css';

export default function Input(props) {
  let element = null;
  const inputClasses = [
    'pa2',
    'input-reset',
    'ba',
    'bg-transparent',
    'hover-bg-black',
    'hover-white',
    'w-100',
  ];

  const invalid = props.invalid && props.shouldValidate && props.touched;

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push('invalid');
  }

  const inputElement = (
    <div>
      <div>{invalid ? props.elementConfig.errorMessage : null}</div>
      <input
        name={props.elementConfig.name}
        label={props.elementConfig.label}
        type={props.elementConfig.type}
        placeholder={props.elementConfig.placeholder}
        required={props.elementConfig.required}
        value={props.value}
        onChange={props.inputChangeHandler}
        className={inputClasses.join(' ')}
      />
    </div>
  );
  const textareaElement = (
    <div>
      <div>{invalid ? props.elementConfig.errorMessage : null}</div>
      <textarea
        name={props.elementConfig.name}
        label={props.elementConfig.label}
        type={props.elementConfig.type}
        placeholder={props.elementConfig.placeholder}
        required={props.elementConfig.required}
        value={props.value}
        onChange={props.inputChangeHandler}
        className={inputClasses.join(' ')}
      />
    </div>
  );

  switch (props.elementType) {
    case 'input':
      element = inputElement;
      break;
    case 'textarea':
      element = textareaElement;
      break;
    default:
      element = inputElement;
      break;
  }

  return (
    <div className='mt3'>
      <label>{props.label}</label>
      {element}
    </div>
  );
}
