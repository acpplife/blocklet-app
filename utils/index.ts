/**
 * @description: generate user id
 * @return {string} user id
 */
export const uuid = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

/**
 * @description: format date to 'MM-DD HH:mm'
 * @param {string} date
 * @return {string} formatted date
 */
export const formatDate = (date?: string): string => {
  if (!date) return '';

  return new Date(date).toLocaleString('en-US', {
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
};
