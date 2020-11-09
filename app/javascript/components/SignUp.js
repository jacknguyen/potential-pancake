import React, { useEffect, useContext, useReducer } from 'react';
import { Formik, useField } from 'formik';
import { useHistory, useLocation } from 'react-router-dom';
import { LogInContext } from './LogInContext';
import { Container, Row, Form, Col, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import Users from './Reducers/Users';
import ACTION from './Actions/Actions';

const MyTextInput = ({ label, ...props}) => {
  const [field, meta] = useField(props);
  return (
    <Form.Group className="col-md-12 mb-2">
      <Form.Label className='sr-only'>{label}</Form.Label>
      <Form.Control
        size='lg'
        {...field}
        {...props}
        isInvalid={meta.touched && meta.error} />
      <Form.Control.Feedback type='invalid'>
        {meta.error}
      </Form.Control.Feedback>
    </Form.Group>
  )
}

const SignUp = () => {
  let history = useHistory();
  let location = useLocation();
  const [loggedIn, setLoggedIn] = useContext(LogInContext);
  const [user, dispatch] = useReducer(Users, {});

  useEffect(() => {
    if (loggedIn) {
      history.replace('/');
    }
  }, [loggedIn])

  useEffect(() => {
    // container inherits size from parent and since parent div#app
    // has no size. I need to add this css so div would take up whole
    // height
    const element = document.querySelector('#app');
    element.className += ' h-100';
    element.className = element.className.trim();

    // this is to cleanup the name
    return () => {
      element.className = element.className.replace('h-100', '').trim();
    }
  }, []);

  return (
    <>
      <Container fluid className='h-100'>
        <Row
          className='h-100
            justify-content-center
            align-items-center
            text-center'>
          <Col className='col-sm-6 col-md-6 col-lg-4 col-xl-3'>
            <h1>Sign Up</h1>
            <Formik
              initialValues={{
                email: '',
                password: 'password',
                password_confirmation: 'password'
              }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .required('An email is required.')
                  .email('Email must be valid'),
                password: Yup.string()
                  .required('No password provided.')
                  .min(8, 'Password has to be longer than 8 characters'),
                password_confirmation: Yup.string()
                  .oneOf([Yup.ref('password'), null], 'Passwords must match')
              })}
              onSubmit={ values => {
                // console.log(JSON.stringify(values, null, 2));
                dispatch({
                  type: ACTION.USERS_CREATE,
                  payload: {
                    data: values,
                    history: history,
                    setContext: setLoggedIn
                  }
                })
              }}
            >
              {({handleSubmit}) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Row>
                    <MyTextInput
                      label='Email'
                      type='text'
                      name='email'
                      placeholder='Email' />
                  </Form.Row>
                  <Form.Row>
                    <MyTextInput
                      label='Password'
                      type='password'
                      name='password'
                      placeholder='Password' />
                  </Form.Row>
                  <Form.Row>
                    <MyTextInput
                      label='Password Confirmation'
                      type='password'
                      name='password_confirmation'
                      placeholder='Password Confirmation' />
                  </Form.Row>
                  {' '}
                  <Button type="submit">
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
          </ Col>
        </Row>
      </Container>
    </>
  )
}

export default SignUp;
