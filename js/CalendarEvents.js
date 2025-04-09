document.addEventListener('DOMContentLoaded', function() {
    const eventsData = [
        {
            id: 1,
            name: 'Ярмарка вакансий "Карьерный старт 2025"',
            start: '2025-04-17T06:00:00',
            end: '2025-04-18T20:30:00',
            location: 'Первомайская улица, 51',
            format: 'Оффлайн',
            auditory: 'Студенты всех курсов, выпускники вузов',
            description: 'Крупнейшая ярмарка вакансий для студентов и выпускников! Встретьтесь с представителями ведущих компаний, узнайте о стажировках, вакансиях для начинающих специалистов и получите советы по трудоустройству от HR-экспертов.',
        },
        {
            id: 2,
            name: 'Мастер-класс "Как создать резюме, которое заметят" (Онлайн)',
            start: '2025-05-28T06:00:00',
            end: '2025-05-30T20:30:00',
            location: 'Донецк, улица Артёма, 130',
            format: 'Оффлайн',
            auditory: 'Студенты всех курсов, выпускники вузов',
            description: 'Научитесь составлять резюме, которое выделится среди сотен других! HR-эксперт поделится секретами эффективного резюме, расскажет о распространенных ошибках и даст практические советы по оформлению и содержанию.',
        },
    ];

    const calendar = new Calendar({
        id: "#color-calendar-events",
        calendarSize: "large",
        eventsData: eventsData
    });

    function findEventsByDate(date) {
        return eventsData.filter(event => {
            const eventStart = new Date(event.start);
            const eventEnd = new Date(event.end);
            
            // Нормализуем даты для сравнения, устанавливая время в полночь
            const normalizedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            const normalizedStart = new Date(eventStart.getFullYear(), eventStart.getMonth(), eventStart.getDate());
            const normalizedEnd = new Date(eventEnd.getFullYear(), eventEnd.getMonth(), eventEnd.getDate());
            
            return normalizedDate >= normalizedStart && normalizedDate <= normalizedEnd;
        });
    }

    function formatDate(date) {
        return date.toLocaleString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    function displayEventDetails(events) {
        const eventDetailsContainer = document.getElementById('event-details');
        if (!eventDetailsContainer) return;

        if (events.length === 0) {
            eventDetailsContainer.innerHTML = '<p class="text-center">На выбранную дату мероприятий не найдено</p>';
            return;
        }

        let html = '';
        events.forEach(event => {
            html += `
                <div class="event-card mb-4">
                    <h3 class="event-title">${event.name}</h3>
                    <div class="event-info">
                        <p><strong>Время проведения:</strong><br>
                           ${formatDate(new Date(event.start))} - ${formatDate(new Date(event.end))}</p>
                        <p><strong>Место проведения:</strong> ${event.location}</p>
                        <p><strong>Формат:</strong> ${event.format}</p>
                        <p><strong>Аудитория:</strong> ${event.auditory}</p>
                        <p><strong>Описание:</strong><br>${event.description}</p>
                    </div>
                    <a href="eventDetail.html" class="btn btn-primary">Подробнее</a>
                </div>
            `;
            localStorage.setItem('event-id', JSON.stringify(event.id));
        });
        eventDetailsContainer.innerHTML = html;
    }

    function attachEventListeners() {
        // Удаляем старые обработчики
        const oldCalendarDays = document.querySelectorAll('.calendar__day-active');
        oldCalendarDays.forEach(element => {
            element.removeEventListener('click', handleDayClick);
        });

        // Добавляем новые обработчики
        const calendarDays = document.querySelectorAll('.calendar__day-active');
        calendarDays.forEach(element => {
            element.addEventListener('click', handleDayClick);
        });
    }

    function handleDayClick(event) {
        const day = parseInt(event.currentTarget.textContent);
        if (isNaN(day)) {
            console.error('Не удалось получить значение дня');
            return;
        }
        
        const selectedDate = new Date(calendar.getSelectedDate());
        selectedDate.setDate(day);
        const events = findEventsByDate(selectedDate);
        displayEventDetails(events);
    }

    // Добавляем обработчики при инициализации
    attachEventListeners();

    // Добавляем обработчик для обновления календаря при смене месяца
    const calendarElement = document.querySelector('#color-calendar-events');
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' || mutation.type === 'subtree') {
                attachEventListeners();
            }
        });
    });
    
    observer.observe(calendarElement, {
        childList: true,
        subtree: true
    });
});
 