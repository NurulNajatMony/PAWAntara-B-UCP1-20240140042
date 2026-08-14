document.addEventListener('DOMContentLoaded', () => {
  // Global script misal untuk handle logout
  const logoutBtn = document.getElementById('logoutBtn');
  
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      
      const confirmLogout = await Swal.fire({
        title: 'Logout?',
        text: "Anda akan keluar dari sesi admin.",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Ya, Logout',
        cancelButtonText: 'Batal'
      });

      if (confirmLogout.isConfirmed) {
        try {
          const res = await fetch('/api/logout', { method: 'POST' });
          const result = await res.json();
          
          if (res.ok && result.status === 'success') {
            window.location.href = '/login';
          }
        } catch (err) {
          console.error(err);
          Swal.fire('Error', 'Gagal logout.', 'error');
        }
      }
    });
  }
});
