/**
 * Extract error message(s) from an error object.
 * Prioritizes `err.response.data.details` array (Joi style),
 * then `err.response.data.message`, then generic message.
 *
 * @param {any} err - The error object
 * @returns {string|string[]} - Single string or array of error strings
 */
export const getErrorMessage = (err) => {
  console.log('getErrorMessage input:', err);
  if (err?.response?.data?.details && Array.isArray(err.response.data.details)) {
    // details: [{ message: "...", path: [...] }]
    return err.response.data.details.map((d) => {
      const msg = typeof d === 'string' ? d : d?.message || JSON.stringify(d);
      const cleanMsg = msg.replace ? msg.replace(/['"\\]+/g, '') : msg;
      return cleanMsg.charAt(0).toUpperCase() + cleanMsg.slice(1);
    });
  }

  const genericMsg = err?.response?.data?.error || err?.response?.data?.message || err.message || 'An unexpected error occurred';
  const cleanGenericMsg = genericMsg.replace ? genericMsg.replace(/['"\\]+/g, '') : genericMsg;
  return cleanGenericMsg.charAt(0).toUpperCase() + cleanGenericMsg.slice(1);
};
