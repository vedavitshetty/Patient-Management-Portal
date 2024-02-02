export const snakeKeysToCamel = (data: any) => {
    const camelData: any = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const camelKey = key.replace(/_./g, (match) => match.charAt(1).toUpperCase());
        camelData[camelKey] = data[key];
      }
    }
    return camelData;
};

export const formatDateOfBirth = (dateString: string) => {
    let [year, month, day] = dateString.split('-'); // Assuming date string is in 'YYYY-MM-DD' format
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    month = date.toLocaleString('en-US', { month: 'long' });
    day = date.getDate().toString();
    year = date.getFullYear().toString();
    return `${month} ${day}, ${year}`;
};


  
  
  
  