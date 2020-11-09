import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

 const Basic = (props) => (
   <div>
     <h1>Any place in your app!</h1>
     <Formik
       initialValues={{
        email: '',
        password: ''
      }}
       validationSchema={Yup.object({
         email: Yup.string()
          .email('Invalid Email Address')
          .required('Required'),
         password: Yup.string()
          .min(8, 'Must be at least 8 characters')
          .required('Required')
       })}
       onSubmit={(values, { setSubmitting }) => {
         setTimeout(() => {
           alert(JSON.stringify(values, null, 2));
           setSubmitting(false);
         }, 400);
       }}
     >
       {({ isSubmitting }) => (
         <Form>
           <Field type="email" name="email" />
           <ErrorMessage name="email" component="div" />
           <Field type="password" name="password" />
           <ErrorMessage name="password" component="div" />
           <button type="submit" disabled={isSubmitting}>
             Submit
           </button>
         </Form>
       )}
     </Formik>
   </div>
 );

 export default Basic;
