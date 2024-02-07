export const snakeKeysToCamel = (data: any): any => {
  if (!data || typeof data !== 'object') {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map((item) => snakeKeysToCamel(item));
  }

  const camelData: any = {};

  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const camelKey = key.replace(/_(\w)/g, (match, letter) => letter.toUpperCase());
      camelData[camelKey] = snakeKeysToCamel(data[key]);
    }
  }

  return camelData;
};

export const formatDateOfBirth = (dateString: string) => {
  if (!dateString || !/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return 'Invalid Date'; // Handle invalid date format
  }

  const [year, month, day] = dateString.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  
  if (isNaN(date.getTime())) {
    return 'Invalid Date'; // Handle invalid date values
  }

  const formattedMonth = date.toLocaleString('en-US', { month: 'long' });
  const formattedDay = date.getDate().toString();
  const formattedYear = date.getFullYear().toString();

  return `${formattedMonth} ${formattedDay}, ${formattedYear}`;
};

export const getUTCDate = (date: moment.Moment | null) => {
  return date ? new Date(date.toISOString().slice(0, 10)) : null;
};



  
  
  
  