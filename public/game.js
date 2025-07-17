const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const waveCounter = document.getElementById("waveCounter");

let coins = 100;
let enemies = [];
let towers = [];
let waveNumber = 1;
let isWaveInProgress = false;
let waveCooldown = 3000;

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpr, dpr);
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Игровой цикл
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Враги
  enemies.forEach(e => {
    ctx.fillStyle = "red";
    ctx.fillRect(e.x, e.y, 20, 20);
    e.x += e.speed;
    if (e.x > window.innerWidth) e.hp = 0;
  });

  // Башни
  towers.forEach(t => {
    ctx.fillStyle = "cyan";
    ctx.fillRect(t.x, t.y, 20, 20);

    const target = enemies.find(e => {
      const dx = e.x - t.x;
      const dy = e.y - t.y;
      return Math.sqrt(dx * dx + dy * dy) < t.range;
    });

    if (target) {
      target.hp -= t.damage;
      if (target.hp <= 0) {
        enemies = enemies.filter(e => e !== target);
        coins += 10;
        console.log("Монеты:", coins);
      }
    }
  });

  // Удаление мертвых врагов
  enemies = enemies.filter(e => e.hp > 0);

  requestAnimationFrame(draw);
}

// Установка башни
canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  if (coins >= 50) {
    towers.push({ x, y, damage: 10, range: 100 });
    coins -= 50;
    console.log("Поставлена башня. Осталось монет:", coins);
  }
});

// Волны врагов
function startWave() {
  isWaveInProgress = true;
  waveCounter.textContent = "Волна: " + waveNumber;

  let spawnCount = 0;
  const totalEnemies = 5 + waveNumber * 2;

  const spawnInterval = setInterval(() => {
    if (spawnCount >= totalEnemies) {
      clearInterval(spawnInterval);
      isWaveInProgress = false;
      waveNumber++;
      setTimeout(startWave, waveCooldown);
      return;
    }

    enemies.push({
      x: 0,
      y: 50 + Math.random() * (window.innerHeight - 100),
      speed: 1 + waveNumber * 0.2,
      hp: 20 + waveNumber * 5
    });

    spawnCount++;
  }, 400);
}

draw();
startWave();
