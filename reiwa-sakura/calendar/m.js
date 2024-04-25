/*!
©2024 令和さくら高等学院
©2024 reiwa-sakura, one person Aoyama programming team.
*/
document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');
  var customButtonsContainer = document.getElementById('customButtons');
  var calendar = new FullCalendar.Calendar(calendarEl, {
    height: '90%',
    expandRows: true,
    slotMinTime: '09:00',
    slotMaxTime: '15:30',
    headerToolbar: {
      left: 'customButton',
      center: 'title',
      right: 'prev,next today'
    },
    customButtons: {
      customButton: {
        text: '自分カレンダー追加',
        click: function() {
          location.href = 'https://calendar.google.com/calendar/u/0?cid=YzRiZGE0M2MxY2VlMzQ5OWU0OWZmMTEwOGJmMjUyN2MwYmMzYjc3YWVmMGYzOTc4NzZmYWRiNzAzN2EzNzYwMkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t';
        }
      }
    },
    initialView: 'dayGridMonth',
    navLinks: true,
    editable: false,
    selectable: true,
    nowIndicator: true,
    dayMaxEvents: true,
    locale: 'ja',
    buttonText: {today: 'いま'},
    views: {
      dayGridMonth: {buttonText: '月'},
      timeGridWeek: {buttonText: '週'},
      timeGridDay: {buttonText: '日'},
      listWeek: {buttonText: '予定リスト'}
    },
    events: function(fetchInfo, successCallback, failureCallback) {
      var apiKey = 'AIzaSyBFQ_8h9qXWBhKnxcucXWzDbYs9mGRfY10';
        var calendarId = 'c4bda43c1cee3499e49ff1108bf2527c0bc3b77aef0f397876fadb7037a37602@group.calendar.google.com';
        var url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?key=${apiKey}&timeMin=${fetchInfo.start.toISOString()}&timeMax=${fetchInfo.end.toISOString()}&singleEvents=true&orderBy=startTime`;

        fetch(url)
        .then(response => response.json())
        .then(data => {
          var events = data.items.map(function(event) {
            return {
              id: event.id,
              title: event.summary,
              start: event.start.dateTime || event.start.date,
              end: event.end.dateTime || event.end.date,
              url: event.htmlLink,
              location: event.location,
              description: event.description
            };
          });
          successCallback(events);
        })
        .catch(error => {
          console.error('Error fetching events from Google Calendar:', error);
          failureCallback(error);
        });
    },
    eventClick: function(arg) {
      arg.jsEvent.preventDefault()
    }
  });

  var monthButton = document.createElement('button');
  monthButton.textContent = '月';
  monthButton.className = 'button';
  monthButton.addEventListener('click', function() {
    calendar.changeView('dayGridMonth');
  });
  customButtonsContainer.appendChild(monthButton);

  var weekButton = document.createElement('button');
  weekButton.textContent = '週';
  weekButton.className = 'button';
  weekButton.addEventListener('click', function() {
    calendar.changeView('timeGridWeek');
  });
  customButtonsContainer.appendChild(weekButton);

  var dayButton = document.createElement('button');
  dayButton.textContent = '日';
  dayButton.className = 'button';
  dayButton.addEventListener('click', function() {
    calendar.changeView('timeGridDay');
  });
  customButtonsContainer.appendChild(dayButton);

  var listButton = document.createElement('button');
  listButton.textContent = '予定リスト';
  listButton.className = 'button';
  listButton.addEventListener('click', function() {
    calendar.changeView('listWeek');
  });
  customButtonsContainer.appendChild(listButton);

  calendar.render();
});