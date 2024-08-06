document.addEventListener('DOMContentLoaded', () => {
    const fieldsContainer = document.getElementById('fields-container');
    const addFieldBtn = document.getElementById('add-field-btn');
    let fieldCount = 0;
  
    addFieldBtn.addEventListener('click', () => {
      fieldCount++;
      const fieldDiv = document.createElement('div');
      fieldDiv.classList.add('field-container');
      fieldDiv.innerHTML = `
        <label for="field-${fieldCount}">Field ${fieldCount}:</label>
        <input type="text" id="field-${fieldCount}" name="field-${fieldCount}" placeholder="Enter value" required>
        <button type="button" class="remove-field-btn">Remove</button>
      `;
      fieldsContainer.appendChild(fieldDiv);
  
      // Add event listener to remove button
      const removeFieldBtn = fieldDiv.querySelector('.remove-field-btn');
      removeFieldBtn.addEventListener('click', () => {
        fieldsContainer.removeChild(fieldDiv);
      });
    });
  });
  