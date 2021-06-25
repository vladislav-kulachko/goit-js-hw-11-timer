function templateTimer(id) {
  return `<div class="timer" id=${id}
    <div class="field">
      <span class="value" data-value="days">
        0
      </span>
      <span class="label">Days</span>
    </div>

    <div class="field">
      <span class="value" data-value="hours">
        0
      </span>
      <span class="label">Hours</span>
    </div>

    <div class="field">
      <span class="value" data-value="mins">
        0
      </span>
      <span class="label">Minutes</span>
    </div>

    <div class="field">
      <span class="value" data-value="secs">
        0
      </span>
      <span class="label">Seconds</span>
    </div>
  </div>`;
}

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.id = null;

    document
      .querySelector(selector)
      .insertAdjacentHTML("beforeend", templateTimer(this.id));
    this.days = document.querySelector(`${selector} [data-value="days"]`);
    this.hours = document.querySelector(`${selector} [data-value="hours"]`);
    this.mins = document.querySelector(`${selector} [data-value="mins"]`);
    this.secs = document.querySelector(`${selector} [data-value="secs"]`);

    this.start(targetDate);
  }
  start(targetDate, selector) {
    const targetDateMsec = Date.parse(targetDate);
    this.id = setInterval(() => {
      const currentDateMsec = Date.now();
      const time = targetDateMsec - currentDateMsec;
      this.createTimerElem(time);
      console.log(time);
      const { days, hours, mins, secs } = this.createTimerElem(time);
      this.days.textContent = days;
      this.hours.textContent = hours;
      this.mins.textContent = mins;
      this.secs.textContent = secs;
    }, 1000);
  }

  createTimerElem(time) {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((time % (1000 * 60)) / 1000);
    return { days, hours, mins, secs };
  }
}

const timer1 = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("Jul 11, 2021"),
});
const timer2 = new CountdownTimer({
  selector: "#timer-2",
  targetDate: new Date("Jun 27, 2021"),
});
