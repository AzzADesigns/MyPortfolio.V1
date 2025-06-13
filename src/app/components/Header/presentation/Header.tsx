import React from "react";
import { Banner } from "./Banner";
import { Information } from "./Information";
import Card from "../../ui/Card";

export default function Header() {
    return (
        <div className="">
            <Card extraClass=" ">
                <Banner />
                <Information />
            </Card>
        </div>
    );
}
