document.addEventListener('DOMContentLoaded', () => {
  if (window.session) {
    const { user } = window.session
        // location.assign('/home')
    if (user.isConfirm) {
    } else {
    }
  } else {
  }
})
