document.addEventListener('DOMContentLoaded', () => {
    const addFieldButton = document.getElementById('addField');
    const fieldsContainer = document.getElementById('fields-container');
  
    addFieldButton.addEventListener('click', () => {
      const fieldGroup = document.createElement('div');
      fieldGroup.classList.add('field-group');
  
      fieldGroup.innerHTML = `
        <label for="fieldName">Field Name:</label>
        <input type="text" name="fieldName" placeholder="Enter field name" required>
  
        <label for="fieldType">Field Type:</label>
        <select name="fieldType" required>
          <option value="INT">INT</option>
          <option value="VARCHAR">VARCHAR</option>
          <option value="TEXT">TEXT</option>
          <option value="DATE">DATE</option>
        </select>
  
        <label for="fieldSize">Field Size:</label>
        <input type="number" name="fieldSize" placeholder="Enter field size (if applicable)">
      `;
  
      fieldsContainer.appendChild(fieldGroup);
    });
  });
  