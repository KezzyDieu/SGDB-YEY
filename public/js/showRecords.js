// public/js/show-records.js
document.getElementById('showRecordsForm').addEventListener('submit', async function(e) {
    e.preventDefault();
  
    const dbName = document.getElementById('dbName').value;
    const tableName = document.getElementById('tableName').value;
  
    try {
      const response = await fetch(`/show-records/shows?dbName=${dbName}&tableName=${tableName}`);
      const data = await response.json();
  
      console.log('Server response:', data); // Verifica la respuesta del servidor
  
      const recordsContainer = document.getElementById('records-container');
      recordsContainer.innerHTML = '';
  
      if (data.records && data.records.length > 0) {
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');
        const headerRow = document.createElement('tr');
  
        // Create table headers
        Object.keys(data.records[0]).forEach(field => {
          const th = document.createElement('th');
          th.textContent = field;
          headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);
  
        // Create table rows
        data.records.forEach(record => {
          const row = document.createElement('tr');
          Object.values(record).forEach(value => {
            const td = document.createElement('td');
            td.textContent = value;
            row.appendChild(td);
          });
          tbody.appendChild(row);
        });
        table.appendChild(tbody);
        recordsContainer.appendChild(table);
      } else {
        recordsContainer.innerHTML = '<p>No se encontraron registros.</p>';
      }
    } catch (error) {
      console.error('Error fetching records:', error);
      recordsContainer.innerHTML = '<p>Error al obtener los registros.</p>';
    }
  });
  