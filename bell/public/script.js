const socket = io();
const button = document.getElementById('ring-btn');
const sound = document.getElementById('bell-sound');
const flash = document.getElementById('flash');

button.addEventListener('click', () => {
  socket.emit('ring-bell');
});

socket.on('bell-rung', () => {
  // Play bell
  sound.currentTime = 0;
  sound.play();

  // Flash effect
  flash.style.opacity = 0.6;
  setTimeout(() => {
    flash.style.opacity = 0;
  }, 150);
});
