document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav removed — no toggle behavior needed
  const modal = document.getElementById('project-modal');
  if (!modal) return;
  const backdrop = modal.querySelector('.modal-backdrop');
  const imgEl = modal.querySelector('.modal-image');
  const titleEl = modal.querySelector('.modal-title');
  const descEl = modal.querySelector('.modal-desc');
  const closeBtn = modal.querySelector('.modal-close');

  function openModal(card) {
    const img = card.querySelector('img');
    const title = card.querySelector('h3');
    const desc = card.querySelector('p');
    if (img) {
      imgEl.src = img.src;
      imgEl.alt = img.alt || title?.textContent || 'Proyecto';
    }
    titleEl.textContent = title ? title.textContent : '';
    descEl.textContent = desc ? desc.textContent : '';

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    // clear content to avoid stale images
    setTimeout(() => {
      imgEl.src = '';
      titleEl.textContent = '';
      descEl.textContent = '';
    }, 300);
  }

  // Open when clicking a project card, but ignore clicks on links inside the card
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function (e) {
      if (e.target.closest('a')) return; // allow link clicks
      openModal(card);
    });
  });

  // Close handlers
  closeBtn?.addEventListener('click', closeModal);
  backdrop?.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
});
