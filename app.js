// === state & persistence ===
const state = {
  currentDate: new Date(),
  view: 'week',
  events: JSON.parse(localStorage.getItem('events')||'[]'),
};
function saveEvents() {
  localStorage.setItem('events', JSON.stringify(state.events));
}
function addEvent(ev) {
  state.events.push(ev);
  saveEvents();
}

// === recurrence logic ===
function getEventsForDate(date) {
  return state.events.filter(e => {
    const evDate = new Date(e.date);
    if (e.recurrence === 'none') {
      return date.toDateString() === evDate.toDateString();
    } else if (e.recurrence === 'daily') {
      return date >= evDate;
    } else if (e.recurrence === 'weekly') {
      return date >= evDate && date.getDay() === evDate.getDay();
    } else if (e.recurrence === 'monthly') {
      return date >= evDate && date.getDate() === evDate.getDate();
    }
  });
}

// === rendering ===
function render() {
  const cal = document.getElementById('calendar');
  cal.innerHTML = '';
  if (state.view === 'month')      renderMonth(cal);
  else if (state.view === 'week')  renderWeek(cal);
  else                             renderDay(cal);

  const label = document.getElementById('currentViewLabel');
  if (state.view==='month')
    label.textContent = `Month of ${state.currentDate.toLocaleString('default',{month:'long',year:'numeric'})}`;
  if (state.view==='week') {
    const start = startOfWeek(state.currentDate);
    label.textContent = `Week of ${start.toDateString()}`;
  }
  if (state.view==='day')
    label.textContent = state.currentDate.toDateString();
}

function startOfWeek(date) {
  const d = new Date(date);
  d.setDate(d.getDate() - d.getDay());
  return d;
}

function makeCell(date, monthFilter) {
  const cell = document.createElement('div');
  cell.className = 'cell';
  if (monthFilter!==undefined && date.getMonth() !== monthFilter) {
    cell.style.opacity = '0.4';
  }
  const lbl = document.createElement('div');
  lbl.className = 'date-label';
  lbl.textContent = date.getDate();
  cell.appendChild(lbl);

  const events = getEventsForDate(date).slice().sort((a,b) => (a.startTime || "").localeCompare(b.startTime || ""));
  events.forEach(ev => {
    const evEl = document.createElement("div");
    evEl.className = "event";
    evEl.textContent = (ev.startTime ? ev.startTime + " " : "") + ev.title;
    cell.appendChild(evEl);
  });
  return cell;
}

function renderWeek(container) {
  const grid = document.createElement('div');
  grid.className = 'week-grid';
  const start = startOfWeek(state.currentDate);
  for (let i=0; i<7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate()+i);
    grid.appendChild(makeCell(d));
  }
  container.appendChild(grid);
}

function renderMonth(container) {
  const year = state.currentDate.getFullYear();
  const month = state.currentDate.getMonth();
  const firstDay = new Date(year,month,1);
  const start = new Date(firstDay);
  start.setDate(firstDay.getDate() - firstDay.getDay());
  const grid = document.createElement('div');
  grid.className = 'month-grid';
  for (let i=0; i<42; i++) {
    const d = new Date(start);
    d.setDate(start.getDate()+i);
    grid.appendChild(makeCell(d, month));
  }
  container.appendChild(grid);
}

function renderDay(container) {
  const grid = document.createElement('div');
  grid.className = 'day-view';
  grid.appendChild(makeCell(state.currentDate));
  container.appendChild(grid);
}

// === UI wiring ===
document.getElementById('prevView').onclick = () => {
  if (state.view==='month') state.currentDate.setMonth(state.currentDate.getMonth()-1);
  if (state.view==='week')  state.currentDate.setDate(state.currentDate.getDate()-7);
  if (state.view==='day')   state.currentDate.setDate(state.currentDate.getDate()-1);
  render();
};
document.getElementById('nextView').onclick = () => {
  if (state.view==='month') state.currentDate.setMonth(state.currentDate.getMonth()+1);
  if (state.view==='week')  state.currentDate.setDate(state.currentDate.getDate()+7);
  if (state.view==='day')   state.currentDate.setDate(state.currentDate.getDate()+1);
  render();
};
document.getElementById('viewSelect').onchange = e => {
  state.view = e.target.value;
  render();
};

// modal logic
const modal = document.getElementById('eventModal');
document.getElementById('addEventBtn').onclick     = () => modal.classList.remove('hidden');
document.getElementById('cancelEventBtn').onclick  = () => modal.classList.add('hidden');
document.getElementById('saveEventBtn').onclick    = () => {
  const title      = document.getElementById('eventTitle').value.trim();
  const date       = document.getElementById('eventDate').value;
  const startTime = document.getElementById("eventStart").value;
  const duration = parseInt(document.getElementById("eventDuration").value,10)||0;
  const recurrence = document.getElementById('eventRecurrence').value;
  if (title && date) {
    addEvent({ id: Date.now(), title, date, startTime, duration, recurrence });
    modal.classList.add('hidden');
    render();
  }
};

// register service worker for offline
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}

// initial render
render();
