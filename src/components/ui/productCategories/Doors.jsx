import React, { useState } from 'react'
import IconHeading from '../../utils/IconHeading'
import { arrowUpIcon, deleteIcon, doorIcon, infoCircleIcon } from '../../../../imagesPath'
import Image from '../../utils/Image'
import VerticalSeparator from '../../utils/VerticalSeparator'
import PrimaryBtn from '../PrimaryBtn'
import Input from '../Input'
import Dropdown from '../Dropdown'
import Counter from '../../utils/Counter'

const Doors = () => {
    const [qty, setQty] = useState(0);

    const options = ['French', 'Sliding', 'Glass', "Flush doors"]


    return (
        <>
            <div className='border border-secondary p-[26px] rounded-large'>
                {/* accordion header */}
                <div className='flex justify-between'>
                    <IconHeading primaryIcon={doorIcon} headingText="Door 1" secondaryIcon={infoCircleIcon} />
                    <div className='flex gap-4 items-center'>
                        <button><Image img={deleteIcon} /></button>
                        <VerticalSeparator className='h-10' />
                        <PrimaryBtn className='bg-transparent px-2'>
                            <button><Image img={arrowUpIcon} /></button>
                        </PrimaryBtn>
                    </div>
                </div>

                {/* accordion body */}
                <div className='mt-5'>
                    <form action="">
                        <div className="grid grid-cols-12 gap-4">
                            <div className='col-span-4'>
                                <Input label="Height" unit="sqf" />
                            </div>
                            <div className='col-span-4'>
                                <Input label="Width" unit="sqf" />
                            </div>
                            <div className='col-span-4'>
                                <Dropdown label="Type" options={options} />
                            </div>
                            <div className='col-span-4'>
                                checkbox
                            </div>
                            <div className='col-span-4'>
                                <Input label="Tint Color" />
                            </div>
                            <div className='col-span-4'>
                                <Counter value={qty} onChange={setQty} min={0} max={100} />
                            </div>
                        </div>

                    </form>
                </div>



            </div>


        </>
    )
}

export default Doors