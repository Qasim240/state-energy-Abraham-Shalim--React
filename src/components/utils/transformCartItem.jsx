import {
    roofSmallIcon,
    solarSmallIcon,
    // windowSmallIcon,
} from '../../../imagesPath';

const iconMap = {
    roof: roofSmallIcon,
    solar: solarSmallIcon,
    // windows: windowSmallIcon,
};

export function transformCartItem(item) {
    const categoryName = item.category?.name || 'Unknown';
    const lowerCategory = categoryName.toLowerCase();

    let configValues = item.configuration || {};
    if (Array.isArray(configValues?.windows)) {
        configValues = configValues.windows[0];
    }

    const normalizedValues = Object.entries(configValues).reduce((acc, [k, v]) => {
        acc[k.toLowerCase()] = v;
        return acc;
    }, {});

    let configFields = [];
    try {
        const parsed = typeof item.category?.configuration === 'string'
            ? JSON.parse(item.category.configuration)
            : item.category.configuration;

        configFields = parsed?.fields || [];
    } catch (err) {
        console.warn('Invalid category configuration:', err);
    }

    let fields = [];

    if (lowerCategory === 'doors' && Array.isArray(item.configuration?.doors)) {
        item.configuration.doors.forEach((door, index) => {
            fields.push({ label: `Door ${index + 1} - Height`, value: door.height ?? '-' });
            fields.push({ label: `Door ${index + 1} - Width`, value: door.width ?? '-' });
            fields.push({ label: `Door ${index + 1} - Type`, value: door.type ?? '-' });

            const frameColor = door.frame_color ?? '-';
            let render;
            if (frameColor !== '-') {
                const code =
                    frameColor.toLowerCase() === 'red'
                        ? '#C52F31'
                        : frameColor.toLowerCase() === 'brown'
                            ? '#8B4513'
                            : '#000';
                render = () => (
                    <div className="flex items-center gap-2">
                        <span className="w-[10px] h-[10px] rounded-full" style={{ backgroundColor: code }} />
                        <span>{frameColor}</span>
                    </div>
                );
            }

            fields.push({ label: `Door ${index + 1} - Frame Color`, value: frameColor, render });
            fields.push({ label: `Door ${index + 1} - Tint Color`, value: door.tint_color ?? '-' });
            fields.push({ label: `Door ${index + 1} - Quantity`, value: door.qty ?? '-' });
        });
    } else if (lowerCategory === 'windows' && Array.isArray(item.configuration?.windows)) {
        item.configuration.windows.forEach((win, index) => {
            fields.push({ label: `Window ${index + 1} - Height`, value: win.height ?? '-' });
            fields.push({ label: `Window ${index + 1} - Width`, value: win.width ?? '-' });
            fields.push({ label: `Window ${index + 1} - Type`, value: win.type ?? '-' });

            const frameColor = win.frame_color ?? '-';
            let render;
            if (frameColor !== '-') {
                const code =
                    frameColor.toLowerCase() === 'red'
                        ? '#C52F31'
                        : frameColor.toLowerCase() === 'brown'
                            ? '#8B4513'
                            : '#000';
                render = () => (
                    <div className="flex items-center gap-2">
                        <span className="w-[10px] h-[10px] rounded-full" style={{ backgroundColor: code }} />
                        <span>{frameColor}</span>
                    </div>
                );
            }

            fields.push({ label: `Window ${index + 1} - Frame Color`, value: frameColor, render });
            fields.push({ label: `Window ${index + 1} - Tint Color`, value: win.tint_color ?? '-' });
            fields.push({ label: `Window ${index + 1} - Quantity`, value: win.qty ?? '-' });
        });
    } else {
        // Generic config rendering
        fields = configFields.map((field) => {
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
                        <span className="w-[10px] h-[10px] rounded-full" style={{ backgroundColor: color.code }} />
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
    }

    // Prepend ID
    fields.unshift({
        label: 'ID',
        key: 'id',
        value: item.id,
    });

    // Append Adders
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
        categorySlug: lowerCategory,
    };
}
