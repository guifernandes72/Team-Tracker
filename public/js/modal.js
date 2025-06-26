// public/js/modal.js
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal');
  const openModalBtn = document.getElementById('openModal');
  const closeModalBtn = document.getElementById('closeModal');
  const form = document.getElementById('novoFuncionarioForm');

  openModalBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = 'block';
  });

  closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });

  form.addEventListener('submit', () => {
    // Só fecha o modal antes de enviar para o backend
    modal.style.display = 'none';
    // Não chamar e.preventDefault() aqui para o form enviar normalmente
  });
});
