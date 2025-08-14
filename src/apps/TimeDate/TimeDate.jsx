import React, { useEffect, useRef, useState } from 'react';
import './TimeDate.css';

// Helper to format digital time
const formatDigitalTime = (date) => {
  const hours12 = date.getHours() % 12 || 12;
  const minutesStr = date.getMinutes().toString().padStart(2, '0');
  const secondsStr = date.getSeconds().toString().padStart(2, '0');
  const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
  return `${hours12}:${minutesStr}:${secondsStr} ${ampm}`;
};

// Helper to calculate rotation degrees for clock hands
const calculateHandAngles = (date) => {
  const seconds = date.getSeconds() + date.getMilliseconds() / 1000;
  const minutes = date.getMinutes() + seconds / 60;
  const hours = (date.getHours() % 12) + minutes / 60;

  return {
    secondsDeg: seconds * 6, // 360 / 60
    minutesDeg: minutes * 6,
    hoursDeg: hours * 30, // 360 / 12
  };
};

// ClockHand component for hour, minute, second hands
const ClockHand = React.forwardRef(({ className, rotation }, ref) => (
  <div
    ref={ref}
    className={className}
    style={{ transform: `rotate(${rotation}deg)` }}
  />
));

// ClockNumbers (1-12) around the clock face
const ClockNumbers = () => {
  return (
    <>
      {[...Array(12)].map((_, i) => {
        const angle = (i + 1) * 30;
        return (
          <div
            key={i}
            className="time-date-container__number"
            style={{
              transform: `translate(-50%, -50%) rotate(${angle}deg) translate(115px) rotate(-${angle}deg) rotateZ(90deg)`,
              top: '50%',
              left: '50%',
            }}
          >
            {i + 1}
          </div>
        );
      })}
    </>
  );
};

// DigitalClock component displaying HH:MM:SS AM/PM
const DigitalClock = ({ timeString }) => (
  <div className="time-date-container__digital-time">{timeString}</div>
);

const AnalogClock = () => {
  const hourRef = useRef(null);
  const minuteRef = useRef(null);
  const secondRef = useRef(null);
  const [digitalTime, setDigitalTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();

      setDigitalTime(formatDigitalTime(now));

      const { secondsDeg, minutesDeg, hoursDeg } = calculateHandAngles(now);

      if (secondRef.current) {
        if (Math.floor(secondsDeg) === 0) {
          secondRef.current.style.transition = 'none';
        } else {
          secondRef.current.style.transition = 'transform 0.05s cubic-bezier(0.4, 2.3, 0.3, 1)';
        }
        secondRef.current.style.transform = `rotate(${secondsDeg}deg)`;
      }
      if (minuteRef.current) {
        minuteRef.current.style.transform = `rotate(${minutesDeg}deg)`;
      }
      if (hourRef.current) {
        hourRef.current.style.transform = `rotate(${hoursDeg}deg)`;
      }
    };

    const interval = setInterval(updateClock, 50);
    updateClock();

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="time-date-container__clock-wrapper">
      <div className="time-date-container__clock">
        <ClockHand ref={hourRef} className="time-date-container__hand time-date-container__hand--hour" />
        <ClockHand ref={minuteRef} className="time-date-container__hand time-date-container__hand--minute" />
        <ClockHand ref={secondRef} className="time-date-container__hand time-date-container__hand--second" />
        <div className="time-date-container__center"></div>
        <ClockNumbers />
      </div>
      <DigitalClock timeString={digitalTime} />
    </div>
  );
};

const DaysOfWeek = () => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days.map(dayName => (
    <div key={dayName} className="time-date-container__calendar-day-name">
      {dayName}
    </div>
  ));
};

const CalendarCell = ({ day, isToday }) => (
  <div
    className={`time-date-container__calendar-cell ${
      isToday ? 'time-date-container__calendar-cell--today' : ''
    }`}
  >
    {day || ''}
  </div>
);

const CurrentMonthCalendar = () => {
  const [currentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarCells = [];

  for (let i = 0; i < firstDay; i++) {
    calendarCells.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarCells.push(day);
  }

  return (
    <div className="time-date-container__calendar">
      <h2 className="time-date-container__calendar-title">
        {currentDate.toLocaleString('default', { month: 'long' })} {year}
      </h2>
      <div className="time-date-container__calendar-grid">
        <DaysOfWeek />
        {calendarCells.map((day, idx) => (
          <CalendarCell
            key={idx}
            day={day}
            isToday={day === currentDate.getDate()}
          />
        ))}
      </div>
    </div>
  );
};

const TimeDate = () => {
  return (
    <div className="time-date-container">
      <AnalogClock />
      <CurrentMonthCalendar />
    </div>
  );
};

export default TimeDate;
