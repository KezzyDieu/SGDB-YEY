document.addEventListener('DOMContentLoaded', () => {
    const addFieldButton = document.getElementById('add-field');
    const fieldsContainer = document.getElementById('fields-container');

    addFieldButton.addEventListener('click', () => {
        const fieldGroup = document.createElement('div');
        fieldGroup.classList.add('field-group');
        fieldGroup.innerHTML = `
            <label for="fieldName">Nombre del Campo:</label>
            <input type="text" name="fieldName[]" required>

            <label for="fieldType">Tipo del Campo:</label>
            <select name="fieldType[]" required>
                <option value="INT">INT</option>
                <option value="VARCHAR">VARCHAR</option>
                <option value="TEXT">TEXT</option>
                <!-- Agrega más opciones según sea necesario -->
            </select>

            <label for="fieldSize">Tamaño del Campo:</label>
            <input type="number" name="fieldSize[]" min="1" required>

            <label>
                <input type="checkbox" name="primaryKey[]" value="1">
                ¿Llave Primaria?
            </label>
            
            <button type="button" class="remove-field">Eliminar Campo</button>
        `;
        fieldsContainer.appendChild(fieldGroup);

        // Agregar funcionalidad para eliminar el campo
        fieldGroup.querySelector('.remove-field').addEventListener('click', () => {
            fieldsContainer.removeChild(fieldGroup);
        });
    });

    // Funcionalidad inicial para eliminar campos
    fieldsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-field')) {
            event.target.parentElement.remove();
        }
    });
});
