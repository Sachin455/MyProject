"use client";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker, Popup } from "react-map-gl/mapbox";
import Header from "@/components/Header";
import PropertiesDisplay from "@/components/PropertiesDisplay";
import { useTheme } from "next-themes";
import { useState, useCallback } from "react";

export default function Home() {
  const { theme } = useTheme();
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  
  // Sample property data
  const allMarkers = [
    { 
      id: 1, 
      longitude: 151.20929, 
      latitude: -33.86882,
      title: "Luxury CBD Apartment",
      price: "$1,200,000",
      address: "100 George St, Sydney NSW 2000",
      bedrooms: 3,
      bathrooms: 2,
      carSpaces: 1,
      type: "Apartment",
      features: ["Pool", "Gym", "Concierge"],
      image: "/property1.jpg",
      description: "Stunning views of Sydney Harbour from this spacious 3-bedroom apartment in the heart of the CBD."
    },
    { 
      id: 2, 
      longitude: 151.1788, 
      latitude: -33.8886,
      title: "Darling Harbour Penthouse",
      price: "$3,500,000",
      address: "25 Darling Dr, Sydney NSW 2000",
      bedrooms: 4,
      bathrooms: 3,
      carSpaces: 2,
      type: "Penthouse",
      features: ["Water views", "Private terrace", "Smart home"],
      image: "/property2.jpg",
      description: "Ultra-luxurious penthouse with 360° views of Darling Harbour and the city skyline."
    },
    { 
      id: 3, 
      longitude: 151.2047, 
      latitude: -33.8123,
      title: "Bondi Beachfront Villa",
      price: "$4,750,000",
      address: "1 Beach Rd, Bondi NSW 2026",
      bedrooms: 5,
      bathrooms: 4,
      carSpaces: 3,
      type: "House",
      features: ["Direct beach access", "Ocean views", "Entertainment deck"],
      image: "/property3.jpg",
      description: "Magnificent beachfront property with private access to Bondi Beach."
    },
    { 
      id: 4, 
      longitude: 151.1833, 
      latitude: -33.8333,
      title: "Heritage Terrace Paddington",
      price: "$2,900,000",
      address: "32 Oxford St, Paddington NSW 2021",
      bedrooms: 4,
      bathrooms: 2,
      carSpaces: 1,
      type: "Terrace",
      features: ["Heritage listed", "Renovated interior", "Courtyard garden"],
      image: "/property4.jpg",
      description: "Beautifully restored Victorian terrace in prestigious Paddington."
    },
    { 
      id: 5, 
      longitude: 151.2575, 
      latitude: -33.8269,
      title: "Modern Waterfront Home",
      price: "$5,250,000",
      address: "15 The Promenade, Hunters Hill NSW 2110",
      bedrooms: 5,
      bathrooms: 3,
      carSpaces: 2,
      type: "House",
      features: ["Private jetty", "Pool", "Boat shed"],
      image: "/property5.jpg",
      description: "Architect-designed waterfront property with deep water access."
    },
    { 
      id: 6, 
      longitude: 151.2015, 
      latitude: -33.8679,
      title: "Investor's Dream Apartment",
      price: "$850,000",
      address: "42 Sussex St, Sydney NSW 2000",
      bedrooms: 2,
      bathrooms: 1,
      carSpaces: 1,
      type: "Apartment",
      features: ["High rental yield", "City views", "Secure parking"],
      image: "/property6.jpg",
      description: "Well-located investment property with strong rental history."
    },
    { 
      id: 7, 
      longitude: 151.2394, 
      latitude: -33.8914,
      title: "Family Home Balmain",
      price: "$2,300,000",
      address: "78 Darling St, Balmain NSW 2041",
      bedrooms: 4,
      bathrooms: 2,
      carSpaces: 2,
      type: "House",
      features: ["Renovated kitchen", "North-facing garden", "Close to ferries"],
      image: "/property7.jpg",
      description: "Charming family home in the heart of Balmain village."
    },
    { 
      id: 8, 
      longitude: 151.1856, 
      latitude: -33.7972,
      title: "Luxury Condo North Sydney",
      price: "$1,750,000",
      address: "15 Blue St, North Sydney NSW 2060",
      bedrooms: 3,
      bathrooms: 2,
      carSpaces: 1,
      type: "Apartment",
      features: ["Harbour views", "Resident pool", "24-hour security"],
      image: "/property8.jpg",
      description: "Sophisticated apartment with panoramic harbour views."
    },
    { 
      id: 9, 
      longitude: 151.2639, 
      latitude: -33.9122,
      title: "Renovated Cottage Rozelle",
      price: "$1,950,000",
      address: "22 Victoria Rd, Rozelle NSW 2039",
      bedrooms: 3,
      bathrooms: 1,
      carSpaces: 1,
      type: "House",
      features: ["Character home", "Open-plan living", "Close to cafes"],
      image: "/property9.jpg",
      description: "Beautifully renovated workers cottage with modern extension."
    },
    { 
      id: 10, 
      longitude: 149.2767, 
      latitude: -33.8217,
      title: "Executive Family Home",
      price: "$3,850,000",
      address: "8 Bradleys Head Rd, Mosman NSW 2088",
      bedrooms: 5,
      bathrooms: 3,
      carSpaces: 2,
      type: "House",
      features: ["Home office", "Solar pool", "Landscaped gardens"],
      image: "/property10.jpg",
      description: "Sprawling family estate in prestigious Mosman with district views."
    },
    { 
      id: 11, 
      longitude: 151.2214, 
      latitude: -33.8892,
      title: "Art Deco Apartment",
      price: "$1,350,000",
      address: "12/45 Macleay St, Potts Point NSW 2011",
      bedrooms: 2,
      bathrooms: 1,
      carSpaces: 0,
      type: "Apartment",
      features: ["Art deco features", "City views", "Walk to Kings Cross"],
      image: "/property11.jpg",
      description: "Charming art deco apartment with original features."
    },
    { 
      id: 12, 
      longitude: 151.1935, 
      latitude: -33.8556,
      title: "Modern Loft Surry Hills",
      price: "$1,650,000",
      address: "24 Foster St, Surry Hills NSW 2010",
      bedrooms: 2,
      bathrooms: 1,
      carSpaces: 1,
      type: "Loft",
      features: ["Open-plan living", "Exposed brick", "Private rooftop"],
      image: "/property12.jpg",
      description: "Stylish converted warehouse in trendy Surry Hills."
    }
  ];

  // Filter markers based on search query
  const filteredMarkers = allMarkers.filter(marker => {
    const searchLower = searchQuery.toLowerCase();
    return (
      marker.title.toLowerCase().includes(searchLower) ||
      marker.address.toLowerCase().includes(searchLower) ||
      marker.price.toLowerCase().includes(searchLower) ||
      marker.type.toLowerCase().includes(searchLower) ||
      marker.bedrooms.toString().includes(searchQuery)
    );
  });

  // Handle search from header
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  return (
    <div className="flex flex-col h-screen w-full">
      <Header onSearch={handleSearch} />
      <div className="flex h-full">
        <div className="flex-grow h-screen">
          <Map
            mapboxAccessToken={mapboxToken}
            initialViewState={{
              longitude: 151.209290,
              latitude: -33.868820,
              zoom: 11
            }}
            mapStyle={
              theme === "light"
                ? "mapbox://styles/mapbox/light-v10"
                : "mapbox://styles/mapbox/dark-v10"
            }
          >
            {filteredMarkers.map((marker) => (
              <div key={marker.id}>
                <Marker
                  longitude={marker.longitude}
                  latitude={marker.latitude}
                  anchor="bottom"
                  onClick={(e) => {
                    e.originalEvent.stopPropagation();
                    setSelectedMarker(marker);
                  }}
                >
                  <img 
                    src="/pin.png" 
                    width={24} 
                    height={24} 
                    alt="Property marker"
                    className="cursor-pointer hover:scale-125 transition-transform"
                  />
                </Marker>

                {selectedMarker?.id === marker.id && (
                  <Popup
                    longitude={marker.longitude}
                    latitude={marker.latitude}
                    onClose={() => setSelectedMarker(null)}
                    closeButton={true}
                    closeOnClick={false}
                    anchor="bottom"
                    offset={25}
                  >
                    <div className="p-2">
                      <h3 className="font-bold">{marker.title}</h3>
                      <p>{marker.address}</p>
                      <p>{marker.price}</p>
                      <p>{marker.bedrooms} bedrooms</p>
                    </div>
                  </Popup>
                )}
              </div>
            ))}
          </Map>
        </div>
        <PropertiesDisplay properties={filteredMarkers} />
      </div>
    </div>
  );
}