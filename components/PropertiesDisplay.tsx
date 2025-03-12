import React from "react";
import house1 from "../public/house1.jpg";
import house2 from "../public/house2.jpg";
import house3 from "../public/house3.jpg";
import house4 from "../public/house4.jpg";
import house5 from "../public/house5.jpg";
import house6 from "../public/house6.jpg";
import HouseCard from "./HouseCard";

const houseList = [
    {
        image: house2,
        price: "$1,200,000",
        houseStatus: "3bd 2ba 1,200 sqft",
        address: "1234 Sycamore St, San Francisco, CA 94102",

    },
    {
        image: house1,
        price: "$1,500,000",
        houseStatus: "4bd 3ba 2,200 sqft",
        address: "5678 Maple St, San Francisco, CA 94102",
    },
    {
        image: house3,
        price: "$1,800,000",
        houseStatus: "5bd 4ba 3,200 sqft",
        address: "9101 Oak St, San Francisco, CA 94102",
    },
    {
        image: house4,
        price: "$2,000,000",
        houseStatus: "6bd 5ba 4,200 sqft",
        address: "1122 Elm St, San Francisco, CA 94102",
    },
    {
        image: house5,
        price: "$2,500,000",
        houseStatus: "7bd 6ba 5,200 sqft",
        address: "3344 Pine St, San Francisco, CA 94102",
    },
    {
        image: house6,
        price: "$2,500,000",
        houseStatus: "7bd 6ba 5,200 sqft",
        address: "3344 Pine St, San Francisco, CA 94102",
    }
    
]

const PropertiesDisplay = () => {
    return (
        <div className="grid grid-cols-2 w-[500px] gap-1 overflow-y-auto">
            {houseList.map((house, index) => (
                <HouseCard key= {index} image={house.image} price={house.price} houseStatus={house.houseStatus} address={house.address} />
            ))}
        </div>
    )
}

export default PropertiesDisplay;