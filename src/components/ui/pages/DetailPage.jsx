import React from 'react'
import { useParams } from 'react-router-dom'
import Roof from '../productCategories/Roof'
import Hvac from '../productCategories/Hvac'
import Solar from '../productCategories/Solar'
import Insulation from '../productCategories/Insulation'
import Doors from '../productCategories/Doors'
import Others from '../productCategories/Others'
import Windows from '../productCategories/Windows'
// import NotFound from '../common/NotFound'

const DetailPage = () => {
    const { category } = useParams()

    const categoryComponents = {
        roof: Roof,
        solar: Solar,
        hvac: Hvac,
        insulation: Insulation,
        doors: Doors,
        others: Others,
        windows: Windows,
        other: Others,

    }

    const SelectedComponent = categoryComponents[category?.toLowerCase()]

    return SelectedComponent ? <SelectedComponent /> : "not define"
}

export default DetailPage
