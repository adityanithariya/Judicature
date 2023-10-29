'use client';

import React from 'react';
import InputField from '@components/auth/InputField';
import Button from '@components/auth/Button';
import { FaLock, FaUser } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { RESET_PASSWORD } from '@graphql/index';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';

import { useRouter } from 'next/navigation';

const ResetTokenPage = ({ params, searchParams }) => {
    const { register, handleSubmit } = useForm();

    const [forgotPassword, { error, loading }] = useMutation(RESET_PASSWORD);
    const navigate = useRouter();

    const onSubmit = async (data) => {
        const { rest_token: resetToken } = params;

        try {
            await forgotPassword({
                variables: {
                    user: {
                        resetToken,
                        password,
                    },
                },
            });
            toast.success('password reset');

            navigate.replace('/auth');
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <div>
            <div className="bg-white w-[425px] absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] p-8 rounded-md shadow-lg">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <>
                        {loading && <p>Loading...</p>}
                        <h1 className="text-center text-3xl  font-semibold text-blue-600 mb-4">
                            Set New Password
                        </h1>
                        <InputField
                            label="password"
                            type="password"
                            icon={FaLock}
                            register={register}
                        />
                        <Button>Submit</Button>
                    </>
                </form>
            </div>
        </div>
    );
};

export default ResetTokenPage;

