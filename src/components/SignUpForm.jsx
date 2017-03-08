import React from 'react'
import { Field, reduxForm } from 'redux-form'

import styles from './SignUpForm.css'
import { Link } from 'react-router-dom'

import PictureObject from './SignUpWithFace'

const renderField = ({ input, label, type, meta: { touched, error } }) => {
  const hasError = (touched && error) ? 'has-danger' : ''
  return (
    <div className={`form-group ${hasError}`}>
      <label>{label}</label>
      <div>
        <input {...input} placeholder={label} type={type} className='form-control' />
        {touched && error && <div className='form-control-feedback'>{error}</div>}
      </div>
    </div>
  )
}

const renderErrors = (errors) => (
  <div className='alert alert-danger' role='alert'>
    {errors.map((error, index) => <span key={index}>{error.value}</span>)}
  </div>
)

const SignUpForm = ({ handleSubmit, errors }) => {
  const errs = errors <= 0 ? null : renderErrors(errors)
  return (
    <div className={styles.container}>
      <form className={styles.container} onSubmit={handleSubmit}>
        { errs }
        <Field name='username' type='username' component={renderField} label='Username' />
        <Field name='password' type='password' component={renderField} label='Password' />
        <button type='submit' className='btn btn-primary'>Sign up</button>
      </form>
      <div>
        <Link to='/signin'>Already have an account? Sign in</Link>
      </div>
      <div>
        <PictureObject />
      </div>
    </div>
  )
}

const validate = (values) => {
  const errors = {}

  if (!values.username) {
    errors.username = 'Required'
  } else if (values.username.length <= 3) {
    errors.username = 'Must be at least 4 characters'
  }

  if (!values.password) {
    errors.password = 'Required'
  } else if (values.password.length <= 3) {
    errors.password = 'Must be at least 4 characters'
  }

  return errors
}

export default reduxForm({
  form: 'SignUpForm',
  validate
})(SignUpForm)
