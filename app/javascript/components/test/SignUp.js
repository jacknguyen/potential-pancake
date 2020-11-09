import React from 'react';
import { Formik, useField, Form } from 'formik';
import * as Yup from 'yup';
import { Styles } from '../Styles';

const CustomTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ): null}
    </>
  )
}

const CustomCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField(props, 'checkbox');

  return (
    <>
      <label className="checkbox">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ): null}
    </>
  )
}

const CustomSelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ): null}
    </>
  )
}

const SignUp = () => (
  <Formik
    initialValues={{
      name: '',
      email: '',
      acceptedTerms: false,
      specialPower: '',
    }}
    validationSchema={Yup.object({
      name: Yup.string()
        .min(3, 'Must be at least 3 characters')
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      email: Yup.string()
        .email('Invalid Email Address')
        .required('Required'),
      acceptedTerms: Yup.boolean()
        .required('Required')
        .oneOf([true], 'Must accept terms and conditions'),
      specialPower: Yup.string()
        .oneOf(['flight', 'invisibility','speed', 'other'], 'Invalid Special Power')
        .required('Required')
    })}
    onSubmit={(values, { setSubmitting, resetForm }) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resetForm();
        setSubmitting(false);
      }, 3000)
    }}
  >
    {props => (
      <Form>
        <h1>Sign Up</h1>
        <CustomTextInput label="Name" name="name" type="text" placeholder="Frank" />
        <CustomTextInput label="Email" name="email" type="email" placeholder="Frank@thetank.com" />
        <CustomSelect label="Special Power" name="specialPower">
          <option value="">Select a Special Power</option>
          <option value="flight">flight</option>
          <option value="invisibility">invisibility</option>
          <option value="speed">speed</option>
          <option value="other">other</option>
        </CustomSelect>
        <CustomCheckbox name="acceptedTerms">
          I accept
        </CustomCheckbox>
        <button type="submit">{props.isSubmitting ? 'Loading...' : 'Submit'}</button>
      </Form>
    )}
  </Formik>
)

export default SignUp;
