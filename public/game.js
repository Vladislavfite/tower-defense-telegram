const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let coins = 100;
let enemies = [];
let towers = [];

// Размеры и масштаб под мобилки
function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  ctx.setTransform(1, 0, 0, 1, 0, 0); // сброс трансформации
  ctx.scale(dpr, dpr);
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Отрисовка
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Враги
  enemies.forEach(e => {
    ctx.fillStyle = "red";
    ctx.fillRect(e.x, e.y, 20, 20);
    e.x += e.speed;

    // Если враг добрался до правого края
    if (e.x > window.innerWidth) e.hp = 0;
  });

  // Башни
  towers.forEach(t => {
    ctx.fillStyle = "cyan";
    ctx.fillRect(t.x, t.y, 20, 20);

    // Поиск ближайшего врага в радиусе
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

  requestAnimationFrame(draw);
}

// Спавн врагов
setInterval(() => {
  enemies.push({
    x: 0,
    y: 50 + Math.random() * (window.innerHeight - 100),
    speed: 1 + Math.random(),
    hp: 20
  });
}, 2000);

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

draw();
