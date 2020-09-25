import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Input from '../Input/Input';
import config from '../../config/contactFormConfig.json';
import { createContact } from '../../redux/contacts/contact.actions';

function Form({ createContact }) {
  const history = useHistory();

  const [contactForm, setContactForm] = useState(config);
  const [formIsValid, setFormIsValid] = useState(false);

  const formElements = [];

  for (let key in contactForm) {
    formElements.push({
      id: key,
      config: contactForm[key],
    });
  }

  const inputChangeHandler = (event, inputIdentifier) => {
    const updatedContactForm = { ...contactForm };
    const updatedFormElement = { ...updatedContactForm[inputIdentifier] };

    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedContactForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedContactForm) {
      formIsValid = updatedContactForm[inputIdentifier].valid && formIsValid;
    }

    setContactForm(updatedContactForm);
    setFormIsValid(formIsValid);
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let formElementIdentifier in contactForm) {
      formData[formElementIdentifier] =
        contactForm[formElementIdentifier].value;
    }

    createContact(formData);
    history.push('/');
  };

  const checkValidity = (value, rules) => {
    let isValid = true;

    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  };

  return (
    <form onSubmit={submitFormHandler} className='measure center'>
      <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
        {formElements.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            inputChangeHandler={(event) =>
              inputChangeHandler(event, formElement.id)
            }
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
          />
        ))}
        <div className='tc'>
          <input type='submit' disabled={!formIsValid} />
        </div>
      </fieldset>
    </form>
  );
}

export default connect(null, { createContact })(Form);
