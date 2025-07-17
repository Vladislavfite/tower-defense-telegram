const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const coinsEl = document.getElementById("coins");

let coins = 100;
let enemies = [];
let towers = [];

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  enemies.forEach(e => {
    ctx.fillStyle = "red";
    ctx.fillRect(e.x, e.y, 20, 20);
    e.x += e.speed;
  });

  towers.forEach(t => {
    ctx.fillStyle = "cyan";
    ctx.fillRect(t.x, t.y, 20, 20);
  });

  requestAnimationFrame(draw);
}

setInterval(() => {
  enemies.push({ x: 0, y: 50 + Math.random() * 300, speed: 1 + Math.random() * 2 });
}, 2000);

canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  if (coins >= 50) {
    towers.push({ x, y });
    coins -= 50;
    coinsEl.textContent = coins;
  }
});

draw();
