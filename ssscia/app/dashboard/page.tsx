"use client";
import React, { useEffect, useState } from "react";

import dynamic from "next/dynamic";
import useAuthStore from "@/lib/store";
import axios from "axios";
import { useRouter } from "next/navigation";

const DynamicMap = dynamic(() => import("@/components/map/map"), {
	ssr: false,
});

const UserDashboard = () => {
	const [center, setCenter] = useState<L.LatLngExpression>([20.7835101993, 97.0345498618]);
	const [polygons, setPolygons] = useState([]);
	const [fetched, setFetched] = useState(false);
	const { userID, memberID, setIsMember, isMember, setMemberID } = useAuthStore();
	useEffect(() => {
		axios
			.get(`http://localhost:4000/api/landfactors/members/${memberID}`)
			.then((response) => {
				setFetched(false);
				const coords: any = [];
				{
					response.data.forEach((factor: any, index: number) => {
						if (index == 0) {
							setCenter(JSON.parse(factor.number_of_map)[0]);
						}
						coords.push(JSON.parse(factor.number_of_map));
					});
				}

				setPolygons(coords);
				setFetched(true);
			})
			.catch((err) => console.log(err))
			.finally(() => {
				setFetched(true);
			});
	}, [memberID]);

	useEffect(() => {
		axios
			.get(`http://localhost:4000/api/members/${userID}`)
			.then((response) => {
				if (response.data) {
					setIsMember(true);
					setMemberID(response.data.member_id);
				} else {
					setIsMember(false);
				}
			})
			.catch((err) => {
				setIsMember(false);
			});
	}, [isMember]);

	if (fetched) console.log(polygons);

	if (fetched)
		return (
			<div className="flex items-center justify-center w-full h-screen overflow-scroll">
				<DynamicMap center={center} polygons={polygons} />
			</div>
		);
};

export default UserDashboard;
