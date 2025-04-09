document.addEventListener('DOMContentLoaded', function() {
   const calendar = new Calendar({
        id: "#color-calendar",
        calendarSize: "small",
        eventsData: [
            {
                id: 1, // Добавлен уникальный ID для каждого события
                name: 'Ярмарка вакансий "Карьерный старт 2025"',
                start: '2025-04-17T06:00:00', // Исправлено: startDate, а не start
                end: '2025-04-18T20:30:00', // Исправлено: endDate, а не end
                location: 'Online', // Пример: можно добавить место проведения
                format: 'оффлайн',
                auditory: ' Студенты всех курсов, выпускники вузов',
                description: 'Крупнейшая ярмарка вакансий для студентов и выпускников! Встретьтесь с представителями ведущих компаний, узнайте о стажировках, вакансиях для начинающих специалистов и получите советы по трудоустройству от HR-экспертов.', // Пример: можно добавить описание
            },
            // {
            //     id: 2, // Добавлен уникальный ID для каждого события
            //     name: 'Мастер-класс "Как создать резюме, которое заметят" (Онлайн)',
            //     start: '2025-05-28T06:00:00', // Исправлено: startDate, а не start
            //     end: '2025-05-30T20:30:00', // Исправлено: endDate, а не end
            //     location: 'Online', // Пример: можно добавить место проведения
            //     format: 'оффлайн',
            //     auditory: ' Студенты всех курсов, выпускники вузов',
            //     description: 'Научитесь составлять резюме, которое выделится среди сотен других! HR-эксперт поделится секретами эффективного резюме, расскажет о распространенных ошибках и даст практические советы по оформлению и содержанию.', // Пример: можно добавить описание
            // },
        ]
      });

    const setEvent = function(event, description){
         const day = $('.calendar__day-event');
         
         day.each(function() {
            let element = $(this);

            element.attr('data-event-name', event);
            element.attr('data-event-description', description);
            let eventName = element.data('event-name');
            let eventDescription = element.data('event-description');
    
            if (!eventName) {
                eventName = "Событие";
            }
    
            if (!eventDescription) {
                eventDescription = "Нет описания";
            }
            
            element.attr('title', eventName + ': ' + eventDescription);
            element.attr('data-toggle', 'tooltip');
            element.attr('data-placement', 'left');
            $('[data-toggle="tooltip"]').tooltip();
        });
    }
   
    calendar.eventsData.forEach(event => {
        setEvent(event.name, event.description);
    });

    $('.calendar__arrow-inner').on('click', function() {
        calendar.eventsData.forEach(event => {
            setEvent(event.name, event.description);
        });
    });
});
