import React from 'react'
import CollectionCard from '../CollectionCard'
import { collectionImg, door, roof, solarPenels, installatioBanner, heater } from '../../../../imagesPath'

const Collection = () => {

    const collections = [
        { title: 'HVAC', slug: 'hvac', img: collectionImg },
        { title: 'SOLAR', slug: 'solar', img: solarPenels },
        { title: 'ROOF', slug: 'roof', img: roof },
        { title: 'DOORS', slug: 'doors', img: door },
        { title: 'INSULATION', slug: 'insulation', img: installatioBanner },
        { title: 'WATER HEATER', slug: 'water-heater', img: heater },
    ];


    return (

        <div className="grid lg:grid-cols-4 grid-cols-2 gap-4">
            {collections.map(({ title, slug, img }) => (
                <CollectionCard key={slug} title={title} slug={slug} thumbnailImg={img} />
            ))}
        </div>

    )
}

export default Collection