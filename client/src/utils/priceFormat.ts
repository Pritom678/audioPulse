/**
 * Utility function to format prices with consistent 2 decimal places
 * Prevents floating point precision issues and ensures consistent display
 */

export const formatPrice = (price: number): string => {
  // Handle invalid inputs
  if (typeof price !== 'number' || isNaN(price)) {
    return '$0.00';
  }

  // Format with exactly 2 decimal places
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

/**
 * Alternative simple version using toFixed for cases where Intl is not preferred
 */
export const formatPriceSimple = (price: number): string => {
  if (typeof price !== 'number' || isNaN(price)) {
    return '$0.00';
  }
  
  return `$${price.toFixed(2)}`;
};
