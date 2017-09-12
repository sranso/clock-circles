const state = {
  alarm: {
    $el: document.getElementById('alarm'),
    hours: 0,
    minutes: 0,
    shouldGoOff: false
  },
  time: {
    $el: document.getElementById('current-time'),
    date: {},
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
  updateCurrentTime();
  draw();

  setInterval(updateCurrentTime, 1000);
  setInterval(checkAlarm, 1000);
  setInterval(drawCircles, 1000);
};

const formatTime = (hours, minutes, seconds, amPm) => {
  if (hours === 0) {
    hours = 12;
  } else if (hours > 12) {
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
  const { time } = state;
  time.date = new Date();
  time.hours = time.date.getHours();
  time.minutes = time.date.getMinutes();
  time.seconds = time.date.getSeconds();
  time.amPm = time.hours > 11 ? 'PM' : 'AM';
  time.formatted = formatTime(time.hours,
                              time.minutes,
                              time.seconds,
                              time.amPm);

  time.$el.innerHTML = time.formatted;
};

const checkAlarm = () => {
  const { alarm, time } = state;
  if (!alarm.$el.value.length) {
    return;
  }
  alarm.hours = parseInt(alarm.$el.value.slice(0, 2), 10);
  alarm.minutes = parseInt(alarm.$el.value.slice(3), 10);
  alarm.shouldGoOff = alarm.minutes === time.minutes && alarm.hours === time.hours;
};

const draw = () => {
  const { canvas } = state;
  if (!canvas.$el.getContext) {
    throw new Error('This browser does not support canvas')
  }

  const resizeCanvas = () => {
    const spaceForTimeAndAlarm = 250;
    const heightAndWidth = Math.min(window.innerHeight, window.innerWidth) - spaceForTimeAndAlarm;
    canvas.$el.width = heightAndWidth;
    canvas.$el.height = heightAndWidth;

    drawCircles();
  }
  resizeCanvas();

  window.addEventListener('resize', resizeCanvas, false);
};

const drawCircles = () => {
  const { canvas: { $el }, time: { hours, minutes, seconds } } = state;
  const ctx = $el.getContext('2d');
  ctx.clearRect(0, 0, $el.width, $el.height);

  const HOURS_RADIUS_MIN = 120;
  const MINUTES_RADIUS_MIN = 60;
  const SECONDS_RADIUS_MIN = 0;

  const hoursRadius = hours + HOURS_RADIUS_MIN;
  const minutesRadius = minutes + MINUTES_RADIUS_MIN;
  const secondsRadius = seconds + SECONDS_RADIUS_MIN;

  [hoursRadius, minutesRadius, secondsRadius].forEach(radius => {
    drawCircle(ctx, radius);
  });
};

const drawCircle = (ctx, radius) => {
  const { canvas, alarm, time } = state;
  const center = canvas.$el.height / 2;
  const colorStyle = alarm.shouldGoOff ? 'alarm' : time.amPm.toLowerCase();
  const fillStyle = canvas.fillStyle[colorStyle];
  const strokeStyle = canvas.strokeStyle[colorStyle];

  ctx.beginPath();
  ctx.arc(center, center, radius, 0, Math.PI*2, true);
  ctx.fillStyle = fillStyle;
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.strokeStyle = strokeStyle;
  ctx.stroke();
};


startApp();
