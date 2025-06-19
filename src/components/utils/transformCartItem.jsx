import {
    roofSmallIcon,
    solarSmallIcon,

} from '../../../imagesPath';

const iconMap = {
    roof: roofSmallIcon,
    solar: solarSmallIcon,
    //   windows: windowSmallIcon,
};

export function transformCartItem(item) {
    const categoryName = item.category?.name || 'Unknown';
    const lowerCategory = categoryName.toLowerCase();

    // Handle nested windows config
    let configValues = item.configuration || {};
    if (Array.isArray(configValues?.windows)) {
        configValues = configValues.windows[0];
    }

    // Normalize key casing
    const normalizedValues = Object.entries(configValues).reduce((acc, [k, v]) => {
        acc[k.toLowerCase()] = v;
        return acc;
    }, {});

    // Parse config field structure
    let configFields = [];
    try {
        const parsed = typeof item.category?.configuration === 'string'
            ? JSON.parse(item.category.configuration)
            : item.category.configuration;

        configFields = parsed?.fields || [];
    } catch (err) {
        console.warn('Invalid category configuration:', err);
    }

    // Build field rows
    const fields = configFields.map((field) => {
        const key = field.name.toLowerCase();
        let value = normalizedValues[key] ?? '-';
        let render;

        if (key === 'frame_color' && value !== '-') {
            value = {
                name: value,
                code:
                    value.toLowerCase() === 'red'
                        ? '#C52F31'
                        : value.toLowerCase() === 'brown'
                            ? '#8B4513'
                            : '#000',
            };
            render = (color) => (
                <div className="flex items-center gap-2">
                    <span
                        className="w-[10px] h-[10px] rounded-full"
                        style={{ backgroundColor: color.code }}
                    />
                    <span>{color.name}</span>
                </div>
            );
        }

        if (typeof value === 'boolean') {
            value = value ? 'Yes' : 'No';
        }

        return {
            label: field.label,
            key: field.name,
            value,
            render,
        };
    });

    // Add ID at the top
    fields.unshift({
        label: 'ID',
        key: 'id',
        value: item.id,
    });

    // Add Adders at the end
    fields.push({
        label: 'Adders',
        key: 'adders',
        value: item.adders?.map((a) => a.name).join(', ') || '-',
    });

    return {
        id: item.id,
        title: categoryName,
        price: parseFloat(item.price || 0),
        icon: iconMap[lowerCategory] || roofSmallIcon,
        fields,
        // Optionally: pass category + ID for routing if needed
        categorySlug: lowerCategory,
    };
}
