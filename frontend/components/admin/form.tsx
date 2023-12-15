/* eslint-disable @next/next/no-img-element */
'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

const formSchema = z.object({
	title: z.string().min(2),
	category: z.any(),
	links: z.any(),
	images: z.instanceof(File),
});

export function PostForm() {
	const [categories, setCategories] = useState([]);

	const [value, setValue] = useState('');
	const [fetched, setFetched] = useState(false);
	const [isNoCategories, setIsNoCategories] = useState(false);
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
			category: '',
			links: '',
			images: new File([], ''),
		},
	});

	// fetch categories
	useEffect(() => {
		axios
			.get(`http://localhost:4000/api/categories`)
			.then(response => {
				if (response.data.length == 0) {
					setIsNoCategories(true);
				}
				setFetched(false);
				setCategories(response.data);
				let initialCategory = `${response.data[0].cat_type} ${response.data[0].id}`;
				form.setValue('category', initialCategory);
				setFetched(true);
			})
			.catch(err => console.log(err));
	}, []);

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		let categoryString = values.category;

		let numArray = categoryString.split(' ');
		let catType = parseInt(numArray[0], 10);
		let catId = parseInt(numArray[1], 10);

		let formData = new FormData();
		formData.append('description', value);
		// @ts-ignore
		formData.append('cat_type', catType);
		// @ts-ignore
		formData.append('category_id', catId);
		formData.append('links', values.links);
		formData.append('images', values.images);
		formData.append('title', values.title);

		axios
			.post(`http://localhost:4000/api/posts`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
			.then(response => {
				router.push('/admin/dashboard/posts');
				router.refresh();
				form.reset();
				setValue('');
				var image = document.getElementById('selectedImage');
				// @ts-ignore
				image.src = null;
				toast('Posted successfully!');
			})
			.catch(err => console.log(err));
	}

	function displayImage() {
		var input = document.getElementById('postImage');
		var image = document.getElementById('selectedImage');
		// @ts-ignore
		if (input.files && input.files[0]) {
			var reader = new FileReader();

			reader.onload = function (e) {
				// @ts-ignore
				image.src = e.target.result;
			};
			// @ts-ignore
			reader.readAsDataURL(input.files[0]);
		}
	}

	if (isNoCategories)
		return (
			<div className='flex items-center gap-3 p-5 justify-center'>
				<p>There is no category. Create category first.</p>
				<Link href={`/admin/dashboard/categories`}>
					<Button>Create category</Button>
				</Link>
			</div>
		);

	if (fetched)
		return (
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-8'>
					<div className='w-2/4 flex flex-col gap-y-6 container items-center justify-center'>
						<FormField
							control={form.control}
							name='title'
							render={({ field }) => (
								<FormItem className='w-full'>
									<FormLabel>Title</FormLabel>
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
							name='category'
							render={({ field }) => (
								<FormItem className='w-full'>
									<FormLabel>Category Name</FormLabel>
									<FormControl>
										<select
											className='w-full p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block '
											onChange={field.onChange}
											defaultValue={field.value}>
											<optgroup label='သတင်း'>
												{categories
													.filter((category: any, index: number) => category.cat_type == 1)
													.map((category: any, index: number) => {
														return (
															<option
																key={index}
																value={`1 ${category.id}`}>
																{category.description}
															</option>
														);
													})}
											</optgroup>
											<optgroup label='ဝန်ဆောင်မှု'>
												{categories
													.filter((category: any, index: number) => category.cat_type == 2)
													.map((category: any, index: number) => {
														return (
															<option
																key={index}
																value={`2 ${category.id}`}>
																{category.description}
															</option>
														);
													})}
											</optgroup>
											<optgroup label='အသင်းအဖွဲ့'>
												{categories
													.filter((category: any, index: number) => category.cat_type == 3)
													.map((category: any, index: number) => {
														return (
															<option
																key={index}
																value={`3 ${category.id}`}>
																{category.description}
															</option>
														);
													})}
											</optgroup>
											<optgroup label='အကြောင်း'>
												{categories
													.filter((category: any, index: number) => category.cat_type == 4)
													.map((category: any, index: number) => {
														return (
															<option
																key={index}
																value={`4 ${category.id}`}>
																{category.description}
															</option>
														);
													})}
											</optgroup>
										</select>
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
							name='links'
							render={({ field }) => (
								<FormItem className='w-full'>
									<FormLabel>Links</FormLabel>
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
						<div className='w-full flex items-center justify-center relative '>
							<FormField
								control={form.control}
								name='images'
								render={({ field }) => (
									<FormItem className='w-full h-60 rounded-sm  border-2 border-green-800 mb-3 grid place-items-center overflow-hidden'>
										<label
											htmlFor='postImage'
											title='Add profile photo'
											className='w-10 h-10 pb-2 text-3xl backdrop-blur-sm bg-black/10  text-white rounded-sm grid place-items-center absolute '>
											+
										</label>
										<div>
											<img
												id='selectedImage'
												alt=''
												className='-mt-2 object-cover'
											/>
										</div>
										<FormControl className='hidden'>
											<Input
												id='postImage'
												accept='.jpg, .jpeg, .png, .svg, .gif, .webp'
												onChange={e => {
													field.onChange(e.target.files ? e.target.files[0] : null);
													displayImage();
												}}
												type='file'
											/>
										</FormControl>
										{/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className='w-full h-[450px]'>
							<ReactQuill
								theme='snow'
								value={value}
								onChange={setValue}
								style={{ height: 400 }}
							/>
						</div>

						<div className='flex justify-center items-center gap-4'>
							<Button
								variant='destructive'
								className=' w-[200px] h-[50px]'
								onClick={() => router.push('/admin/dashboard/posts')}>
								Cancel
							</Button>
							<Button
								type='submit'
								className='bg-green-800 hover:bg-green-700 text-base w-[200px] h-[50px]'>
								Create Post
							</Button>
						</div>
					</div>
				</form>
			</Form>
		);
}
