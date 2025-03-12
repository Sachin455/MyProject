"use client";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, {Marker} from "react-map-gl/mapbox";
import Header from "@/components/Header";
import PropertiesDisplay from "@/components/PropertiesDisplay";
import { useTheme } from "next-themes";



export default function Home() {
  const {theme} = useTheme();
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
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
                <Marker longitude={151.454091} latitude={-32.459515} anchor="bottom">
                  <img src="../public/pin.png" width={30} height={30}/></Marker>
          </Map>
        </div>
        <PropertiesDisplay/>
      </div>
    </div>
  )
} 
