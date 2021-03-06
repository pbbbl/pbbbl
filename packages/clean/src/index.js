/**
 * Module dependencies.
 */

const isEmpty = require("lodash.isempty");
const isPlainObject = require("lodash.isplainobject");
const transform = require("lodash.transform");

/**
 * Export `cleanDeep` function.
 */

module.exports = function clean(
    object,
    { cleanKeys = [], cleanValues = [], emptyArrays = true, emptyObjects = true, emptyStrings = true, fn = true, NaNValues = false, nullValues = true, undefinedValues = true } = {},
) {
    return transform(object, (result, value, key) => {
        // Exclude specific keys.
        if (cleanKeys.includes(key)) {
            return;
        }

        // Recurse into arrays and objects.
        if (Array.isArray(value) || isPlainObject(value)) {
            value = cleanDeep(value, {
                cleanKeys,
                cleanValues,
                emptyArrays,
                emptyObjects,
                emptyStrings,
                fn,
                NaNValues,
                nullValues,
                undefinedValues,
            });
        }

        // Exclude specific values.
        if (cleanValues.includes(value)) {
            return;
        }

        // Exclude empty objects.
        if (emptyObjects && isPlainObject(value) && isEmpty(value)) {
            return;
        }

        // Exclude empty arrays.
        if (emptyArrays && Array.isArray(value) && !value.length) {
            return;
        }

        // Exclude empty strings.
        if (emptyStrings && value === "") {
            return;
        }

        // Exclude NaN values.
        if (NaNValues && Number.isNaN(value)) {
            return;
        }

        // Exclude null values.
        if (nullValues && value === null) {
            return;
        }

        // Exclude functions.
        if (fn !== false && typeof value == "function") {
            return;
        }

        // Exclude undefined values.
        if (undefinedValues && value === undefined) {
            return;
        }

        // Append when recursing arrays.
        if (Array.isArray(result)) {
            return result.push(value);
        }

        result[key] = value;
    });
};
