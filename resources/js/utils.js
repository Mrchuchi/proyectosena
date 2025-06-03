export const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};

/**
 * Combines multiple class names into a single string, filtering out falsy values
 * @param  {...string} classes - Class names to combine
 * @returns {string} - Combined class names
 */
export function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}
