import React from 'react'
import CollectionCard from '../CollectionCard'
import { collectionImg, door, roof, solarPenels, installatioBanner, heater } from '../../../../imagesPath'

const Collection = () => {

    const Collections = [
        {
            title: "HVAC",
            collectionImg: collectionImg
        },
        {
            title: "SOLAR",
            collectionImg: solarPenels
        },
        {
            title: "ROOF",
            collectionImg: roof
        },
        {
            title: "DOORS",
            collectionImg: door
        },
        {
            title: "Insulation",
            collectionImg: installatioBanner
        },
        {
            title: "Water Heater",
            collectionImg: heater
        },
         {
            title: "DOORS",
            collectionImg: door
        },
        {
            title: "HVAC",
            collectionImg: collectionImg
        },
    ]


    return (

        <div class="grid lg:grid-cols-4 grid-cols-2 gap-4">
            {Collections.map((collection, index) => (
                <div key={index}>
                    <CollectionCard title={collection.title} thumbnailImg={collection.collectionImg} />
                </div>
            ))}




        </div>








    )
}

export default Collection