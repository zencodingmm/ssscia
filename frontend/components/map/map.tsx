"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "./map.css";
import {
	MapContainer,
	TileLayer,
	Marker,
	Polygon,
	Tooltip,
} from "react-leaflet";
import { Button } from "../ui/button";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Link from "next/link";

const icon = L.icon({
	iconUrl: "/flag.png",
	iconSize: [30, 61],
	iconAnchor: [0, 61],
	popupAnchor: [0, 0],
});

const Map = ({
	center,
	polygons,
}: {
	center: L.LatLngExpression;
	polygons: any;
}) => {
	const fillBlueOptions = { fillColor: "green", color: "red" };
	const purpleOptions = { color: "purple" };
	return (
		<div className="w-full flex flex-col items-center justify-center">
			<div className="w-full flex justify-between mb-4 px-1 lg:px-5">
				<h1 className="text-2xl font-bold">သင်၏မြေယာများ</h1>
				<Link href={`/dashboard/landfactors`}>
					<Button className="flex gap-2 justify-start bg-green-800 hover:bg-green-700">
						<AiOutlinePlusCircle className="w-4 h-4" />
						မြေယာအသစ်ထည့်ရန်
					</Button>
				</Link>
			</div>

			<div className="max-w-screen-xl">
				<MapContainer
					center={center}
					zoom={13}
					scrollWheelZoom={true}
					id="map"
				>
					<TileLayer
						attribution="Google Maps Satellite"
						url="https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}"
					/>
					<TileLayer url="https://www.google.cn/maps/vt?lyrs=y@189&gl=cn&x={x}&y={y}&z={z}" />

					{polygons ? (
						<Polygon pathOptions={purpleOptions} positions={polygons} />
					) : null}
					{polygons
						? polygons.map((polygon: any, index: number) => {
								let position = polygon[0];
								return (
									<Marker key={index} position={position} icon={icon}>
										<Tooltip>Hello</Tooltip>
									</Marker>
								);
						  })
						: null}
				</MapContainer>
			</div>
		</div>
	);
};

export default Map;
