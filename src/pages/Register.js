import React from 'react'
import tw from 'twin.macro'
import { Formik } from 'formik'
import logo from '../assets/images/header-logo.png'
import Message from '../components/ui/Message'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { register } from '../features/user/userSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { statusReset } from '../features/notes/notesSlice'

const Container = tw.div`min-h-screen flex items-center justify-center bg-gray-50 py-8 px-4 sm:px-6 lg:px-8`;
const Img = tw.img`w-auto m-auto sm:h-16`;
const FormContainer = tw.div`max-w-md w-full space-y-8`;
const Title = tw.h2`mt-6 text-center text-3xl font-extrabold text-gray-900`;
const RegisterForm = tw.form`mt-8 space-y-6`;
const RegisterFormGroup = tw.div`rounded-md shadow-sm -space-y-px`;
const EmailField = tw.input`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`;
const PasswordField = tw.input`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`;
const Button = tw.button`w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-700`;

const InfoWrapper = (props) => {
    const { status } = props;

    if (status !== null) {
        if (status === false) {
            return <Message type='error' text='Something wrong' />
        }
        return <Message type='success' text='Your account has been created, please login' />
    }
    return <></>
}

const RegisterPage = () => {
    const dispatch = useDispatch()
    const [isSuccess, setIsSuccess] = useState(null)

    return (
        <Container>
            <FormContainer>
                <Img src={logo} alt="logo" />

                <Title>Create Your Account</Title>
                <InfoWrapper status={isSuccess} />
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validate={values => {
                        const errors = {}
                        if (!values.email) {
                            errors.email = 'Required'
                        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                            errors.email = 'Invalid email address'
                        } else {
                            return errors
                        }
                    }}
                    onSubmit={async (values, { setIsSubmitting }) => {
                        try {
                            const actionResult = await dispatch(register(values))
                            const result = unwrapResult(actionResult)
                            if (result) {
                                setIsSuccess(true)
                            } else {
                                setIsSuccess(false)
                            }
                        } catch (error) {
                            setIsSuccess(false)
                        } finally {
                            dispatch(statusReset())
                            setIsSubmitting(false)
                        }
                    }}
                >
                    {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
                        <RegisterForm onSubmit={handleSubmit}>
                            <RegisterFormGroup>
                                <EmailField type='email' name='email' placeholder='Email address' onChange={handleChange} value={values.email} />
                                {errors.email && touched.email}
                                <PasswordField type='password' name='password' placeholder='Password' onChange={handleChange} value={values.password} />
                                {errors.password && touched.password}
                            </RegisterFormGroup>

                            <Button>Register</Button>
                            <p>Already have account? <Link to='/login'><b>Login</b></Link></p>
                        </RegisterForm>
                    )}
                </Formik>
            </FormContainer>
        </Container>
    )
}

export default RegisterPage;