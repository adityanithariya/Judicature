"use client";
import { useMutation } from "@apollo/client";
import Button from "@components/auth/Button";
import InputField from "@components/auth/InputField";
import { FORGOT_PASSWORD } from "@graphql/index";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";

const ForgotPassword = () => {
	const { register, handleSubmit } = useForm();
	const [forgotPassword, { loading }] = useMutation(FORGOT_PASSWORD);

	const [email, setEmail] = useState("");
	const [emailSet, setEmailSet] = useState(false);

	const onSubmit = async (data) => {
		const { email: identity } = data;

		try {
			await forgotPassword({
				variables: {
					user: {
						identity,
					},
				},
			});
			setEmail(identity);
			setEmailSet(true);
		} catch (err) {
			console.log(err.message);
			toast.error("Failed to send email. Please try again!");
		}
	};

	return (
		<div className="bg-white w-[425px] absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] p-8 rounded-md shadow-lg">
			{!emailSet ? (
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
			) : (
				<div>
					<h2 className="text-center text-2xl  font-semibold text-slate-500 mb-2">
						Email sent to {email}
					</h2>
					<p className="text-center text-xl  font-semibold text-slate-500 mb-2">
						Would you like to:
					</p>
					<Button
						onClick={async () => {
							await forgotPassword({
								variables: {
									user: {
										identity: email,
									},
								},
							});
							toast.success("Email Sent!");
						}}
					>
						Resend Email
					</Button>
					<Button onClick={() => setEmailSet(false)}>Change Email</Button>
				</div>
			)}
		</div>
	);
};

export default ForgotPassword;
