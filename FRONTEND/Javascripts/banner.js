const images = document.querySelectorAll(".banner-image");

const size = images.length;
let currentindex = 0;

function showImage(currentindex) {
  for (let i = 0; i < size; i++) {
    images[i].classList.remove("active");
  }

  images[currentindex].classList.add("active");
}
showImage(currentindex);

document.querySelector(".next").addEventListener("click", function () {
  currentindex = (currentindex + 1) % size;
  showImage(currentindex);
});

document.querySelector(".prev").addEventListener("click", () => {
  currentindex = (currentindex - 1 + size) % size;

  showImage(currentindex);
});

setInterval(() => {
  currentindex = (currentindex + 1) % size;

  showImage(currentindex);
}, 4000);
