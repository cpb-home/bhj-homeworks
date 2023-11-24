const bit = document.getElementById('dead');
const miss = document.getElementById('lost');

for (let i = 1; i < 10; i++) {
  const hole = document.getElementById('hole'+i);
  hole.onclick = function() {
    hole.classList.contains('hole_has-mole') ? up() : down();
  }
}

function up() {
  if (bit.textContent < 9) {
    bit.textContent = Number(bit.textContent) + 1;
  } else {
    if (bit.textContent < 10) {
      bit.textContent = Number(bit.textContent) + 1;
    }
    if (confirm(`Вы набрали ${bit.textContent} очков и победили. Хотите сыграть снова?`)) {
      restart();
    } else {
      for (let i = 1; i < 10; i++) {
        const hole = document.getElementById('hole'+i);
        hole.onclick = null;
      }
    }
  }
}

function down() {
  if (miss.textContent < 4) {
    miss.textContent = Number(miss.textContent) + 1;
  } else {
    if (miss.textContent < 5) {
      miss.textContent = Number(miss.textContent) + 1;
    }
    if (confirm(`Вы проиграли. Хотите сыграть снова?`)) {
      restart();
    } else {
      for (let i = 1; i < 10; i++) {
        const hole = document.getElementById('hole'+i);
        hole.onclick = null;
      }
    }
  }
}

function restart() {
  bit.textContent = 0;
  miss.textContent = 0;
}