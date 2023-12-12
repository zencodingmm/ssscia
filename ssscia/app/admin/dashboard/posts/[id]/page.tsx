"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { UpdateForm } from "./form";

const Page = ({
	params,
}: {
	params: {
		id: number;
	};
}) => {
	const [initialValues, setInitialValues] = useState({
		id: "",
		title: "",
		description: "",
		catType: "",
		categoryId: "",
		links: "",
		images: "",
		cratedAt: "",
		updatedAt: "",
	});
	const [fetched, setFetched] = useState(false);
	const [edit, setEdit] = useState(false);

	// fetch the user with the specified id
	useEffect(() => {
		axios
			.get(`http://localhost:4000/api/posts/${params.id}`)
			.then((response) => {
				setFetched(false);
				setInitialValues({
					id: response.data.id,
					title: response.data.title,
					description: response.data.description,
					catType: response.data.cat_type,
					categoryId: response.data.category_id,
					links: response.data.links,
					images: response.data.images,
					cratedAt: response.data.cratedAt,
					updatedAt: response.data.user_type,
				});
				setFetched(true);
			})
			.catch((err) => console.log(err))
			.finally(() => {
				setFetched(true);
			});
	}, [params.id]);

	if (fetched) {
		return <UpdateForm defaultValues={initialValues} originalValues={initialValues} setEdit={setEdit} />;
	}
};

export default Page;
