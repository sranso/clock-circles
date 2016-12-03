const state = {
  alarm: {
    $el: document.getElementById('alarm'),
    hours: 0,
    minutes: 0,
    shouldGoOff: false
  },
  time: {
    $el: document.getElementById('current-time'),
    time: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    formatted: ''
  },
  canvas: {
    $el: document.getElementById('canvas'),
    fillStyle: {
      am: 'rgba(255, 183, 0, 0.75)',
      pm: 'rgba(53, 126, 221, 0.75)',
      alarm: 'rgba(213, 0, 143, 0.65)'
    },
    strokeStyle: {
      am: 'rgba(255, 222, 55, 0.90)',
      pm: 'rgba(150, 204, 255, 0.90)',
      alarm: 'rgba(255, 128, 204, 0.90)'
    },
  }
};

const startApp = () => {
  // immediately set clock and draw circles
  updateCurrentTime();
  draw();

  setInterval(updateCurrentTime, 1000);
  setInterval(checkAlarm, 1000);
  setInterval(drawCircles, 1000);
};

const formatTime = (hours, minutes, seconds, amPm) => {
  if (hours > 12) { // edge case: midnight; destructure
    hours = hours - 12;
  }
  const formattedUnits = [hours, minutes, seconds].map(unit => {
    unit = unit.toString();
    if (unit.length < 2) {
      unit = `0${unit}`;
    }
    return unit;
  });

  return `${formattedUnits.join(':')} ${amPm}`;
};

const updateCurrentTime = () => {
  const stateTime = state.time;
  stateTime.time = new Date();
  stateTime.hours = stateTime.time.getHours();
  stateTime.minutes = stateTime.time.getMinutes();
  stateTime.seconds = stateTime.time.getSeconds();
  stateTime.amPm = stateTime.hours > 11 ? 'PM' : 'AM';
  stateTime.formatted = formatTime(stateTime.hours,
                                   stateTime.minutes,
                                   stateTime.seconds,
                                   stateTime.amPm);

  stateTime.$el.innerHTML = stateTime.formatted;
};

const checkAlarm = () => {
  const stateAlarm = state.alarm;
  const stateTime = state.time;
  const alarmValue = stateAlarm.$el.value;
  if (!alarmValue.length) {
    return;
  }
  stateAlarm.hours = parseInt(alarmValue.slice(0, 2), 10);
  stateAlarm.minutes = parseInt(alarmValue.slice(3));

  if (stateAlarm.minutes === stateTime.minutes && stateAlarm.hours === stateTime.hours) {
    stateAlarm.shouldGoOff = true;
  } else {
    stateAlarm.shouldGoOff = false;
  }
};

const draw = () => {
  const stateCanvas = state.canvas;
  if (!stateCanvas.$el.getContext) {
    throw new Error('This browser does not support canvas')
  }

  const resizeCanvas = () => {
    const spaceForTimeAndAlarm = 250;
    const heightAndWidth = Math.min(window.innerHeight, window.innerWidth) - spaceForTimeAndAlarm;
    stateCanvas.$el.width = heightAndWidth;
    stateCanvas.$el.height = heightAndWidth;

    drawCircles();
  }
  resizeCanvas();

  window.addEventListener('resize', resizeCanvas, false);
};

const drawCircles = () => {
  const $canvas = state.canvas.$el;
  const ctx = $canvas.getContext('2d');
  ctx.clearRect(0, 0, $canvas.width, $canvas.height);

  const HOURS_RADIUS_MIN = 120;
  const MINUTES_RADIUS_MIN = 60;
  const SECONDS_RADIUS_MIN = 0;

  const currentTime = state.time.$el.innerText;
  const hours = parseInt(currentTime.slice(0,2), 10);
  const minutes = parseInt(currentTime.slice(3,5), 10);
  const seconds = parseInt(currentTime.slice(6,8), 10);

  const hoursRadius = hours + HOURS_RADIUS_MIN;
  const minutesRadius = minutes + MINUTES_RADIUS_MIN;
  const secondsRadius = seconds + SECONDS_RADIUS_MIN;

  [hoursRadius, minutesRadius, secondsRadius].forEach(radius => {
    drawCircle(ctx, radius);
  });
};

const drawCircle = (ctx, radius) => {
  const stateCanvas = state.canvas;
  const center = stateCanvas.$el.height / 2;
  const colorStyle = state.alarm.shouldGoOff ? 'alarm' : state.time.amPm.toLowerCase();
  const fillStyle = stateCanvas.fillStyle[colorStyle];
  const strokeStyle = stateCanvas.strokeStyle[colorStyle];

  ctx.beginPath();
  ctx.arc(center, center, radius, 0, Math.PI*2, true);
  ctx.fillStyle = fillStyle;
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.strokeStyle = strokeStyle;
  ctx.stroke();
};


startApp();
