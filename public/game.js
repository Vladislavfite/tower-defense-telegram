// Отрисовка карты при старте игры
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

const mapImage = new Image();
mapImage.src = 'assets/map/EMXN1y8qTQoGdXBsb2FkEg55bGFiLXN0dW50LXNncBoza2xpbmcvZG93bmxvYWQvTWpnME56azBOems0TXpBNE5UZ3pNVFV4TVRneE1UTTVNZz09.png';

function drawMap() {
  const scale = Math.max(
    canvas.width / mapImage.width,
    canvas.height / mapImage.height
  );
  const x = (canvas.width - mapImage.width * scale) / 2;
  const y = (canvas.height - mapImage.height * scale) / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    mapImage,
    x,
    y,
    mapImage.width * scale,
    mapImage.height * scale
  );
}

mapImage.onload = () => {
  resizeCanvas();
  drawMap();
};

window.addEventListener('resize', () => {
  resizeCanvas();
  drawMap();
});

console.log('Game started');
