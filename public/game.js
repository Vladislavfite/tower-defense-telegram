const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const heroHpEl = document.getElementById("heroHp");

let heroHp = 100;
let enemies = [];
let path = [
  {x: 160, y: 0},
  {x: 160, y: 200},
  {x: 300, y: 200},
  {x: 300, y: 350},
  {x: window.innerWidth / 2, y: window.innerHeight - 50}
];

let selectedHero = localStorage.getItem("selectedHero") || "hero1.png";
let heroImg = new Image();
heroImg.src = "assets/" + selectedHero;

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpr, dpr);
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function spawnEnemy() {
  enemies.push({
    pathIndex: 0,
    x: path[0].x,
    y: path[0].y,
    speed: 1,
    hp: 10
  });
}

function updateEnemies() {
  enemies.forEach(enemy => {
    const target = path[enemy.pathIndex + 1];
    if (!target) {
      // Враг добрался до героя
      heroHp -= 10;
      heroHpEl.textContent = heroHp;
      enemy.hp = 0;
      return;
    }
    const dx = target.x - enemy.x;
    const dy = target.y - enemy.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 2) {
      enemy.pathIndex++;
    } else {
      enemy.x += (dx / dist) * enemy.speed;
      enemy.y += (dy / dist) * enemy.speed;
    }
  });

  // Удаляем мёртвых врагов
  enemies = enemies.filter(e => e.hp > 0);
}

function drawPath() {
  ctx.strokeStyle = "#555";
  ctx.lineWidth = 20;
  ctx.beginPath();
  ctx.moveTo(path[0].x, path[0].y);
  for (let i = 1; i < path.length; i++) {
    ctx.lineTo(path[i].x, path[i].y);
  }
  ctx.stroke();
}

function drawEnemies() {
  enemies.forEach(e => {
    ctx.fillStyle = "red";
    ctx.fillRect(e.x - 10, e.y - 10, 20, 20);
  });
}

function drawHero() {
  const target = path[path.length - 1];
  ctx.drawImage(heroImg, target.x - 25, target.y, 50, 50);
}

function gameLoop() {
  if (heroHp <= 0) {
    alert("🛑 Игра окончена! Герой погиб.");
    window.location.href = "index.html";
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPath();
  updateEnemies();
  drawEnemies();
  drawHero();

  requestAnimationFrame(gameLoop);
}

setInterval(spawnEnemy, 2000);
gameLoop();
