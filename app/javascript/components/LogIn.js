import React, { useEffect, useContext, useReducer } from 'react';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import { Formik, useFormik, useField} from 'formik';
import * as Yup from 'yup';
import { useHistory, useLocation, Link } from "react-router-dom";
import { LogInContext } from './LogInContext';
import Sessions from './Reducers/Sessions';
import ACTION from './Actions/Actions';

const MyTextInput = ({ label, ...props}) => {
  const [field, meta] = useField(props);
  return (
    <Form.Group className="col-md-12 mb-4">
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

const LogIn = () => {
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: '/' } };
  const [loggedIn, setLoggedIn] = useContext(LogInContext);
  const [_login, dispatch] = useReducer(Sessions, {})

  useEffect(() => {
    if (loggedIn) {
      history.replace('/');
    }
  }, [])

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
    <Container fluid className='h-100'>
      <Row className='h-100 justify-content-center align-items-center text-center'>
        <Col className='col-sm-6 col-md-6 col-lg-4 col-xl-3'>
          <h1 className="h3 mb-4 font-weight-normal">Please sign in</h1>
          <Formik
            initialValues={{
              email: '',
              password: 'password'
            }}
            validationSchema={
              Yup.object({
                email: Yup.string()
                  .email('Email must be valid')
                  .required('Required'),
                password: Yup.string()
                  .required('Required')
              })
            }
            onSubmit={ values => {
              dispatch({
                type: ACTION.LOGIN,
                payload: {
                  data: values,
                  setContext: setLoggedIn,
                  history: history,
                  from: from }
              })
            }}
            >
              {({handleSubmit,
                 handleChange,
                 handleBlur,
                 values,
                 touched,
                 isValid,
                 errors,
              }) => (
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
                  <Link to='/' className='btn btn-danger'>
                    Cancel
                  </Link>
                  {' '}
                  <Button type="submit">Submit</Button>
                </Form>
              )}

          </Formik>
          {' '}
          <Row
            style={{marginTop: '10px'}}
            className='justify-content-center'>
              <Link to='/signup'>Sign Up</Link>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default LogIn;
