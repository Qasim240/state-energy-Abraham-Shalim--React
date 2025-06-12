import React from 'react';

const tableHeadingStyle = 'text-gray-500 text-sm mb-1';
const tableRowStyle = 'text-black text-base';

const fieldMap = {
    Roof: [
        { label: 'ID', key: 'id' },
        { label: 'Type', key: 'type' },
        { label: 'Square Footage', key: 'sqft' },
        {
            label: 'Color',
            key: 'color',
            render: (color) => (
                <div className="flex items-center gap-2 mt-1">
                    <span
                        className="w-[10px] h-[10px] rounded-full"
                        style={{ backgroundColor: color?.code }}
                    />
                    <span>{color?.name}</span>
                </div>
            ),
        },
        { label: 'Adders', key: 'adders' },
    ],
    Solar: [
        { label: 'ID', key: 'id' },
        { label: 'System KW', key: 'systemKW' },
        { label: 'Battery', key: 'battery' },
        { label: 'Adders', key: 'adders' },
    ],
    window: [
        { label: 'ID', key: 'id' },
        { label: 'window type', key: 'windowtype' },
    ],

};

function CartCard({ item }) {
    const fields = fieldMap[item.title] || [];

    return (
        <div className="rounded-xl border bg-white px-6 py-4 shadow-md mb-6">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <img src={item.icon} alt={item.title} className="h-10 w-10" />
                    <h2 className="text-xl font-bold">{item.title}</h2>
                </div>
                <p className="text-xl font-semibold">${item.price.toFixed(2)}</p>
            </div>

            <div className="mt-4 border-t border-gray-200 pt-3 grid grid-cols-5 gap-4 text-sm">
                {fields.map((field, index) => (
                    <div key={index}>
                        <p className={tableHeadingStyle}>{field.label}</p>
                        <p className={tableRowStyle}>
                            {field.render
                                ? field.render(item[field.key])
                                : item[field.key] ?? '-'}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CartCard;
