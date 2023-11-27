const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab__content');

tabs.forEach((el, index) => {
  el.addEventListener('click', ev => {
    tabs.forEach(tab => {
      tab.classList.remove('tab_active');
    });
    tabContents.forEach(cont => {
      cont.classList.remove('tab__content_active');
    });
    tabs[index].classList.add('tab_active');
    tabContents[index].classList.add('tab__content_active');
  });
});