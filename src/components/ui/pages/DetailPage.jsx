import React from 'react'
import { useParams } from 'react-router-dom'
import Roof from '../productCategories/Roof'
import Hvac from '../productCategories/Hvac'
import Solar from '../productCategories/Solar'
import Insulation from '../productCategories/Insulation'
// import Doors from '../productCategories/Doors'
// import NotFound from '../common/NotFound'

const DetailPage = () => {
    const { category } = useParams()

    const categoryComponents = {
        roof: Roof,
        solar: Solar,
        hvac: Hvac,
        insulation: Insulation,

    }

    const SelectedComponent = categoryComponents[category?.toLowerCase()]

    return SelectedComponent ? <SelectedComponent /> : <NotFound />
}

export default DetailPage
