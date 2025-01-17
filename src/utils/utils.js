export const removeHyphens = (input) => {
    if (typeof input !== 'string') {
        throw new Error('Input must be a string');
    }

    return input.replace(/-/g, '');
};