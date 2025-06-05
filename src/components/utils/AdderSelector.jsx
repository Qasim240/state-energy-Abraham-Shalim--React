import React from 'react';
import Image from './Image';
import { adderIconPlus, adderIconminus } from '../../../imagesPath';

const AdderSelector = ({ adders = [], selectedAdders = [], toggleAdder }) => {
    return (
        <div className="flex gap-4 flex-wrap mt-4">
            {adders.map((adder) => {
                const active = selectedAdders.includes(adder);
                return (
                    <button
                        type="button"
                        key={adder}
                        onClick={() => toggleAdder(adder)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-full transition border font-Avenir font-medium
              ${active
                                ? 'bg-primary text-white border-primary'
                                : 'bg-white text-black border-gray-300'
                            }`}
                    >
                        <span className={`flex items-center justify-center font-Avenir font-medium w-6 h-6 rounded-full text-lg
              ${active
                                ? 'bg-white text-base'
                                : 'bg-gray-300 text-black'
                            }`}
                        >
                            {active ? <Image img={adderIconPlus} /> : <Image img={adderIconminus} />}
                        </span>
                        {adder}
                    </button>
                );
            })}
        </div>
    );
};

export default AdderSelector;
