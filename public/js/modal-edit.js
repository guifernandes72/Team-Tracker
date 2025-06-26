document.addEventListener('DOMContentLoaded', () => {
  const modalNovo = document.getElementById('modal');
  const modalEdit = document.getElementById('modal-edit');

  const openModalBtn = document.getElementById('openModal');
  const closeModalBtn = document.getElementById('closeModal');
  const closeModalEditBtn = document.getElementById('closeModalEdit');

  const editButtons = document.querySelectorAll('.openModalEdit');

  const idInput = document.getElementById('edit-id');
  const nameInput = document.getElementById('edit-name');
  const roleInput = document.getElementById('edit-role');
  const emailInput = document.getElementById('edit-email');
  const phoneInput = document.getElementById('edit-phone');
  const dateInput = document.getElementById('edit-date');
  const notesInput = document.getElementById('edit-notes')
  const departmentInput = document.getElementById('edit-department')
  const statusInput = document.getElementById('edit-status');

  openModalBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modalNovo.style.display = 'block';
  });

  closeModalBtn.addEventListener('click', () => {
    modalNovo.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === modalNovo) {
      modalNovo.style.display = 'none';
    }
    if (event.target === modalEdit) {
      modalEdit.style.display = 'none';
    }
  });

  closeModalEditBtn.addEventListener('click', () => {
    modalEdit.style.display = 'none';
  });

  editButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();

      idInput.value = btn.dataset.id;
      nameInput.value = btn.dataset.name;
      roleInput.value = btn.dataset.role;
      emailInput.value = btn.dataset.email;
      phoneInput.value = btn.dataset.phone;
      notesInput.value = btn.dataset.notes;
      departmentInput.value = btn.dataset.department;

      let rawDate = btn.dataset.date;

      if (rawDate.includes('/')) {
        const [dia, mes, ano] = rawDate.split('/');
        rawDate = `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
      }

      let formattedDate = rawDate;
      try {
        const d = new Date(rawDate);
        if (!isNaN(d.getTime())) {
          formattedDate = d.toISOString().split('T')[0];
        }
      } catch (e) {
        console.warn('Formato de data inválido:', rawDate);
      }

      dateInput.value = formattedDate;

      statusInput.value = (btn.dataset.status === "1" || btn.dataset.status === "true") ? "true" : "false";

      modalEdit.style.display = 'block';
    });
  });

  const formEdit = document.getElementById('editFuncionarioForm');
  formEdit.addEventListener('submit', () => {
    console.log('Formulário de edição enviado');
    modalEdit.style.display = 'none';
  });
});
