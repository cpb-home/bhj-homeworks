const progressBar = document.getElementById('progress');
const form = document.getElementById('form');

form.addEventListener('submit', (el) => {
  el.preventDefault();

  const files = document.querySelector('[name=file]').files;
  const formData = new FormData();
  formData.append("file", files[0]);
  
  const xhr = new XMLHttpRequest();

  xhr.upload.onprogress = function(e) {
    const percentLoaded = (e.loaded / e.total).toFixed(1);

    progressBar.value = percentLoaded;
  }

  xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload');
  xhr.send(formData);
  
});
