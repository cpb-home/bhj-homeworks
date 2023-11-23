const bit = document.getElementById('dead');
const miss = document.getElementById('lost');

for (let i = 1; i < 10; i++) {
  const hole = document.getElementById('hole'+i);
  hole.onclick = function() {
    if (hole.classList.contains('hole_has-mole')) {
      bit.textContent = Number(bit.textContent) + 1;
    } else {
      miss.textContent = Number(miss.textContent) + 1;
    }
  }
}