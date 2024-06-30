document.addEventListener('DOMContentLoaded', (event) => {
    let sessionLength = 25;
    let breakLength = 5;
    let isSession = true;
    let isRunning = false;
    let timeLeft = sessionLength * 60;
    let timerInterval;
    const timerDisplay = document.getElementById('timer-display-time');
    const statusDisplay = document.getElementById('status');
    const startButton = document.getElementById('start-timer');
    const resetButton = document.getElementById('reset-timer');
    const setTimerDisplay = document.getElementById('set-timer-display');
    const setBreakDisplay = document.getElementById('set-break-display');
  
    setTimerDisplay.textContent = sessionLength;
    setBreakDisplay.textContent = breakLength;
  
    document.getElementById('minus-timer').addEventListener('click', () => {
      if (sessionLength > 1) {
        sessionLength--;
        setTimerDisplay.textContent = sessionLength;
        if (!isRunning) {
          timeLeft = sessionLength * 60;
          updateDisplay();
        }
      }
    });
  
    document.getElementById('add-timer').addEventListener('click', () => {
      sessionLength++;
      setTimerDisplay.textContent = sessionLength;
      if (!isRunning) {
        timeLeft = sessionLength * 60;
        updateDisplay();
      }
    });
  
    document.getElementById('minus-break').addEventListener('click', () => {
      if (breakLength > 1) {
        breakLength--;
        setBreakDisplay.textContent = breakLength;
      }
    });
  
    document.getElementById('add-break').addEventListener('click', () => {
      breakLength++;
      setBreakDisplay.textContent = breakLength;
    });
  
    startButton.addEventListener('click', () => {
      if (isRunning) {
        clearInterval(timerInterval);
        startButton.textContent = 'START';
      } else {
        timerInterval = setInterval(countDown, 1000);
        startButton.textContent = 'PAUSE';
      }
      isRunning = !isRunning;
    });
  
    resetButton.addEventListener('click', () => {
      clearInterval(timerInterval);
      isSession = true;
      isRunning = false;
      sessionLength = 25;
      breakLength = 5;
      timeLeft = sessionLength * 60;
      setTimerDisplay.textContent = sessionLength;
      setBreakDisplay.textContent = breakLength;
      startButton.textContent = 'START';
      updateDisplay();
    });
  
    function countDown() {
      if (timeLeft <= 0) {
        isSession = !isSession;
        timeLeft = (isSession ? sessionLength : breakLength) * 60;
      } else {
        timeLeft--;
      }
      updateDisplay();
    }
  
    function updateDisplay() {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      statusDisplay.textContent = isSession ? 'SESSION' : 'BREAK';
    }
  });
  