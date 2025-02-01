let timer;
let timeLeft = 25 * 60; 
let isRunning = false;
let isWorkTime = true;

const timeDisplay = document.getElementById('time');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const workDurationInput = document.getElementById('work-duration');
const breakDurationInput = document.getElementById('break-duration');

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(() => {
      timeLeft--;
      updateTimerDisplay();
      if (timeLeft === 0) {
        clearInterval(timer);
        isRunning = false;
        alert(isWorkTime ? 'Time for a break!' : 'Time to work!');
        switchMode();
      }
    }, 1000);
  }
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  isWorkTime = true;
  timeLeft = workDurationInput.value * 60;
  updateTimerDisplay();
}

function switchMode() {
  isWorkTime = !isWorkTime;
  timeLeft = (isWorkTime ? workDurationInput.value : breakDurationInput.value) * 60;
  updateTimerDisplay();
  startTimer();
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

workDurationInput.addEventListener('change', () => {
  if (!isRunning && isWorkTime) {
    timeLeft = workDurationInput.value * 60;
    updateTimerDisplay();
  }
});

breakDurationInput.addEventListener('change', () => {
  if (!isRunning && !isWorkTime) {
    timeLeft = breakDurationInput.value * 60;
    updateTimerDisplay();
  }
});

updateTimerDisplay();
