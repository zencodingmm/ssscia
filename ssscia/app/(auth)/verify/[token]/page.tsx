"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface VerifyPageProps {
	params: {
		token: string;
	};
}
const VerifyPage: React.FC<VerifyPageProps> = ({ params }) => {
	const token = params.token;
	const [status, setStatus] = useState(false);
	const router = useRouter();

	const verify = () => {
		axios
			.get(`http://localhost:4000/api/auth/verify/${token}`)
			.then((response) => {
				if (response.data.message == "success") {
					setStatus(true);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
	useEffect(() => {
		verify();
	}, []);

	if (status) router.push("/login");

	if (!status) return <div className="flex justify-center items-center">Verifying your email...</div>;
};

export default VerifyPage;
