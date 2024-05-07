import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
// import { ActivityIndicator, List, useTheme } from "react-native-paper";
import * as Location from "expo-location";

import MapView, {
	PROVIDER_GOOGLE,
	Polyline,
	Marker,
	Callout,
} from "react-native-maps";
import { hotels } from "@/constants/data/hotel";

// import { decode } from "@mapbox/polyline";
const MapScreen = () => {
	const [region, setRegion] = useState({});
	const [coords, setCoords] = useState([]); // line

	const hotel = {
		latitude: 10.750367230537718,
		longitude: 106.6248195918647,
	};
	return (
		<SafeAreaView
			style={{

			}}
		>
			<MapView
				style={{ width: "100%", height: "100%" }}
				provider={PROVIDER_GOOGLE} // Specify
				initialRegion={{
					latitude: hotel.latitude,
					longitude: hotel.longitude,
					latitudeDelta: 0.5,
					longitudeDelta: 0.05,
				}}
				showsUserLocation={true}
				onRegionChangeComplete={(region) => setRegion(region)}
			>
				{hotels.map((marker, index) => (
					<Marker
						key={index}
						coordinate={{
							latitude: marker.latitude,
							longitude: marker.longitude,
							// title: marker.name,
						}}
					>
						<Callout>
							<Text>{marker.name}</Text>
						</Callout>
					</Marker>
				))}

				{coords.length > 0 && (
					<Polyline
						coordinates={coords}
						strokeColor={"#e84118"}
						strokeWidth={5}
						lineDashPattern={[1]}
					/>
				)}
			</MapView>
		</SafeAreaView>
	);
};

export default MapScreen;
