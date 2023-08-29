const startBnt = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let colorLoop = null;

startBnt.addEventListener('click', () => {
    colorLoop = setInterval(changeColor, 1000);
    startBnt.disabled = true;
})

stopBtn.addEventListener('click', () => {
    clearInterval(colorLoop);
    startBnt.disabled = false;
}
)

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

function changeColor() {
    return document.querySelector('body').style.backgroundColor = getRandomHexColor();
    
}


