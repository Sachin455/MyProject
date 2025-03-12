"use client";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, {Marker} from "react-map-gl/mapbox";
import Header from "@/components/Header";
import PropertiesDisplay from "@/components/PropertiesDisplay";
import { useTheme } from "next-themes";



export default function Home() {
  const {theme} = useTheme();
  
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  const markers = [
    { id: 1, longitude: 151.20929, latitude: -33.86882 }, // Sydney
    { id: 2, longitude: 151.454091, latitude: -32.459515 }, // Another location
    { id: 3, longitude: 150.89306, latitude: -34.427812 }, // Another location
  ];
  return (
    <div className="flex flex-col h-screen w-full">
      <Header/>
      <div className="flex h-full">
        <div className="flex-grow h-screen">
          <Map
          mapboxAccessToken={mapboxToken}
          initialViewState={{
            longitude: 151.209290,
            latitude: -33.868820,
            zoom: 10
          }}
            mapStyle={
              theme === "light"
              ?"mapbox://styles/mapbox/light-v10"
              :"mapbox://styles/mapbox/dark-v10"}>
                <Marker longitude={151.20929} latitude={-33.86882} anchor="bottom">
                  <img src="/pin.png" width={20} height={20} alt="Marker"/></Marker>
          </Map>
        </div>
        <PropertiesDisplay/>
      </div>
    </div>
  )
} 
