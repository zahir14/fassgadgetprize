interface ExportData {
  [key: string]: any;
}

export const exportToCSV = (data: ExportData[], filename: string) => {
  if (!data || !data.length) {
    console.error('No data to export');
    return;
  }

  // Get all unique keys from the data
  const keys = Array.from(
    new Set(
      data.flatMap(item => Object.keys(item))
    )
  );

  // Create CSV header row
  const header = keys.join(',');

  // Create CSV rows for data
  const csvRows = data.map(item => {
    return keys.map(key => {
      let cellData = item[key] === undefined ? '' : item[key];
      
      // Handle data that needs quotes (strings with commas, quotes, or newlines)
      if (typeof cellData === 'string') {
        // Replace double quotes with two double quotes
        cellData = cellData.replace(/"/g, '""');
        
        // If the value contains commas, newlines, or double quotes, enclose in quotes
        if (/[",\n\r]/.test(cellData)) {
          cellData = `"${cellData}"`;
        }
      }
      
      return cellData;
    }).join(',');
  });

  // Combine header and rows
  const csv = [header, ...csvRows].join('\n');
  
  // Create a Blob with the CSV data
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  
  // Create a link element to download the CSV
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};