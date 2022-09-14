import { Formik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../../firebase-functions';

export default function Signup() {
    let goTo = useNavigate();
    return (
        <div className="signup-container">
            {
                <Formik
                    initialValues={{ firstName: '', email: '', password: '', confirmPassword: '' }}
                    validate={values => {
                        const errors = {};
                        if (!values.firstName) {
                            errors.firstName = 'Required';
                        }
                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Invalid email address';
                        }
                        if (!values.password) {
                            errors.password = 'Required';
                        } else if ((!values.confirmPassword)) {
                            errors.confirmPassword = 'Required';
                        } else if (values.password !== values.confirmPassword) {
                            errors.confirmPassword = 'Passwords Don/t match';
                        }
                        return errors;
                    }}
                    onSubmit={async (values, { setSubmitting }) => {
                        // alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                        let userAdded = await addUser(values);
                        if (userAdded) {
                            alert('signup successful, please proceed to signin');
                            goTo('/');
                        }
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
                            <h3>Sign Up</h3>

                            <input
                                type="text"
                                name="firstName"
                                placeholder="First name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.firstName}
                            />
                            {errors.firstName && touched.firstName && errors.firstName}

                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                            />
                            {errors.email && touched.email && errors.email}

                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                            />
                            {errors.password && touched.password && errors.password}

                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="confirm password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.confirmPassword}
                            />
                            {errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}

                            <button type="submit" disabled={isSubmitting}>
                                Submit
                            </button>

                            <a href="/">Already Have an Account? Sign in!</a>
                        </form>
                    )}
                </Formik>
            }
        </div>
    )
}
