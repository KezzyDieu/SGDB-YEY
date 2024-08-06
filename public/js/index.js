document.addEventListener('DOMContentLoaded', function () {
    const alertElement = document.querySelector('.alert');
    
    if (alertElement) {
      // Desaparecer la alerta después de 5 segundos
      setTimeout(function () {
        alertElement.classList.add('fade-out');
        setTimeout(function () {
          alertElement.remove();
        }, 500); // Tiempo para desaparecer
      }, 5000); // Tiempo para mostrar alerta
    }
  });
  