function formatDate(date) {
  const newDate = new Date(date);
  const formattedDate = newDate.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  return formattedDate;
}

export default formatDate;
