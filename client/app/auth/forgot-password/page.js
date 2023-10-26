'use client';
import React, { useState } from 'react';
import InputField from '@components/auth/InputField';
import Button from '@components/auth/Button';
import { FaUser } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { FORGOT_PASSWORD } from '@graphql/index';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
    const { register, handleSubmit } = useForm();
    const [forgotPassword, { loading }] = useMutation(FORGOT_PASSWORD);

    const [emailSent, setEmailSent] = useState(false);
    const [resendEmail, setResendEmail] = useState(false);
    const [email, setEmail] = useState('');

    const onSubmit = async (data) => {
        const { email } = data;

        try {
            await forgotPassword({
                variables: {
                    user: {
                        email,
                    },
                },
            });
            setEmailSent(true);
            setEmail(email);
            setResendEmail(false);
            toast.success('Email sent to ' + email);
        } catch (err) {
            console.log(err.message);
            toast.error('Failed to send email. Please try again.');
        }
    };

    const handleResend = () => {
        setEmailSent(false);
        setResendEmail(true);
    };

    const handleChangeEmail = () => {
        setEmailSent(false);
        setResendEmail(false);
    };

    return (
        <div className="bg-white w-[425px] absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] p-8 rounded-md shadow-lg">
            {!emailSent ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="text-center text-3xl  font-semibold text-blue-600 mb-4">
                        Forgot Password
                    </h1>
                    <InputField
                        label="Email"
                        type="email"
                        icon={FaUser}
                        register={register}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            ) : !resendEmail ? (
                <div>
                    <h2>Email sent to {email}</h2>
                    <p>Would you like to:</p>
                    <Button onClick={handleResend}>Resend Email</Button>
                    <Button onClick={handleChangeEmail}>Change Email</Button>
                </div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2 className="text-center text-2xl  font-semibold text-blue-600 mb-3">
                        Change Email
                    </h2>
                    <InputField
                        label="Email"
                        type="email"
                        icon={FaUser}
                        register={register}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            )}
        </div>
    );
};

export default ForgotPassword;

