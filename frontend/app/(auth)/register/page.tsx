'use client';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useAuthStore from '@/lib/store';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
	userName: z.string().min(2, {
		message: 'Name must be at least 2 characters',
	}),
	email: z.string().email({
		message: 'Invalid email',
	}),
	password: z.string().min(4, {
		message: 'Password must be at least 4 characters.',
	}),
	phoneNo: z.string().min(10, { message: 'Must be a valid mobile number' }).max(14, { message: 'Must be a valid mobile number' }),
	address: z.string().min(2, {
		message: 'Address must be at least two characters.',
	}),
	userType: z.string(),
});

const RegisterPage = () => {
	const { loggedIn, setLoggedIn } = useAuthStore();
	const [mounted, setMounted] = useState(false);
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			userName: '',
			email: '',
			password: '',
			phoneNo: '',
			address: '',
			userType: '1',
		},
	});

	useEffect(() => {
		if (loggedIn) {
			setMounted(false);
			router.push('/dashboard');
		} else {
			setMounted(true);
		}
	}, [loggedIn, router]);

	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
		axios
			.post('http://localhost:4000/api/auth/register', values, {
				withCredentials: true,
			})
			.then(response => {
				console.log(response.data);
				toast('Check you email for verification!');
			})
			.catch(err => {
				toast('Email already exists!');
			});
		console.log(values);
	}

	if (!mounted) {
		return null;
	}
	return (
		<div className='max-w-[400px] mx-auto p-10 shadow-lg rounded-xl flex flex-col gap-8 justify-center items-center'>
			<h1 className='text-4xl font-bold'>Register</h1>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='w-full space-y-5'>
					<FormField
						control={form.control}
						name='userName'
						render={({ field }) => (
							<FormItem>
								<FormLabel>User Name</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								{/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								{/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										type='password'
										{...field}
									/>
								</FormControl>
								{/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='phoneNo'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Phone Number</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								{/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='address'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Address</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								{/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='userType'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Role</FormLabel>
								<FormControl>
									<Input
										type='number'
										placeholder='Role'
										{...field}
									/>
								</FormControl>
								{/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className='flex justify-end'>
						<Button
							type='submit'
							className='bg-green-800 hover:bg-green-700 w-full h-[50px] text-base'>
							Submit
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default RegisterPage;
