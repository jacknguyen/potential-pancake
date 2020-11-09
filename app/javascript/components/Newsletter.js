import React from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';

const Newsletter = () => {
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {
      email: ''
    },
    onSubmit: (values, { resetForm }) => {
      alert(JSON.stringify(values, null, 2));
      resetForm();
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group>
        <Form.Label>Email Address</Form.Label>
        <Form.Control
          id="email"
          name="email"
          type="email"
          placeholder="email"
          onChange={formik.handleChange}
          value={formik.values.email} />
      </Form.Group>
      <Button variant="primary">Submit</Button>
    </Form>
  )
}

export default Newsletter;
