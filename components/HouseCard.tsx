import React from "react";
import Image, { StaticImageData } from "next/image";
import {Card, CardDescription, CardHeader, CardTitle} from "./ui/card";
import { Button } from "./ui/button";

interface HouseCardProps {
    image: StaticImageData;
    price: string;
    houseStatus: string;
    address: string;
}   

const HouseCard = ({image, price, houseStatus, address}: HouseCardProps) => {
    return(
        <Card>
            <Image alt="house" src={image} className="rounded-md" />
            <CardHeader>
                <CardTitle>{price}</CardTitle>
                <CardDescription>{houseStatus}</CardDescription>
                <CardDescription>{address}</CardDescription>
            </CardHeader>
            <div className="flex justify-end pb-1 px-1">
                <Button size={"sm"}>View Details</Button>
                </div>
        </Card>
    )
}

export default HouseCard;