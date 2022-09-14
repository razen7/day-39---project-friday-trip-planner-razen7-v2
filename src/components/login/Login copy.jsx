import { Formik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkUserLogin } from '../../firebase-functions';
import { setUserId } from '../../slices/tripSlice';

export default function Login() {
  let goTo = useNavigate();
  let dispatch = useDispatch();
  return (
    <div className="login-container">
      {
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={values => {
            const errors = {};
            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }
            if (!values.password) {
              errors.password = 'Required';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              // alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
              (async () => {
                let userID =  await checkUserLogin(values);
                if (userID) {
                  dispatch(setUserId(userID));
                  goTo('profile');
                } else {
                  alert('incorrect Username or Password!');
                }
              })();

            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <h3>Login</h3>
              <input
                type="email"
                name="email"
                placeholder="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && errors.email}
              <input
                type="password"
                name="password"
                placeholder="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password && errors.password}

              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
              <a href="signup">Don't Have an Account? Sign up!</a>
            </form>
          )}
        </Formik>
      }
    </div>
  )
}
