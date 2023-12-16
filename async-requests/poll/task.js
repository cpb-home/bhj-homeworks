const pollTitleEl = document.querySelector('.poll__title');
const pollAnswersEl = document.querySelector('.poll__answers');
const message = document.querySelector('.message__cover');

const xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
  if (xhr.readyState === this.DONE) {
    const newData = JSON.parse(xhr.response);
    pollTitleEl.textContent = newData.data.title;
    const pollAnswers = newData.data.answers;
    pollAnswers.forEach(answer => {
      const btn = document.createElement('button');
      btn.className = 'poll__answer';
      btn.textContent = answer;
      pollAnswersEl.append(btn);
    });

    const allAnswers = pollAnswersEl.querySelectorAll('.poll__answer');
    allAnswers.forEach((answer, index) => {
      answer.addEventListener('click', () => {
        allAnswers.forEach(el => el.classList.remove('poll__answer_active'));
        answer.classList.add('poll__answer_active');
        message.style.display = 'flex';
        const messageBtn = message.querySelector('.message__button');
        messageBtn.addEventListener('click', () => {
          message.style.display = 'none';
          const xhr2 = new XMLHttpRequest();

          xhr2.open('POST', 'https://students.netoservices.ru/nestjs-backend/poll');
          xhr2.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
          xhr2.send(`vote=${newData.id}&answer=${index}`);
          
          xhr2.onreadystatechange = function() {
            if (xhr2.readyState === this.DONE) {
              const reply = JSON.parse(xhr2.response);
              pollAnswersEl.textContent = '';
              pollAnswersEl.style.flexDirection = 'column';

              const summOfVotes = reply.stat.reduce((acc, item) => acc + item.votes, 0);

              reply.stat.forEach((item) => {
                const rep = document.createElement('div');
                rep.className = 'stat__answer';
                
                const repLeftSide = document.createElement('span');
                repLeftSide.textContent = item.answer + ': ';

                const repRightSide = document.createElement('span');
                repRightSide.style.fontWeight = 'bold';
                //let a = (item.votes * 100) / Number(summOfVotes); console.log(a);
                repRightSide.textContent = (item.votes * 100 / summOfVotes).toFixed(1) + '%';

                rep.append(repLeftSide);
                rep.append(repRightSide);
                pollAnswersEl.append(rep);
              });
            }
          }

        });
      });
    });
  }
}

xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/poll');
xhr.send();


function getResults() {
  
}