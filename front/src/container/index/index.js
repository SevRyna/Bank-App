document.addEventListener('DOMContentLoaded', () => {
  if (window.session) {
    const { user } = window.session
        location.assign('/home')
    if (user.isConfirm) {
      // location.assign('/home')
    } else {
      // location.assign('/signup-confirm')
    }
  } else {
    // location.assign('/signup')
  }
})
