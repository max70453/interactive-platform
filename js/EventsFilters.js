// Функция для получения событий из localStorage
function getEventsFromStorage() {
    // Всегда используем актуальные данные из window.calendarEvents
    localStorage.setItem('events', JSON.stringify(window.calendarEvents || []));
    
    let events = localStorage.getItem('events');
    if (!events) {
        return [];
    }
    return JSON.parse(events);
}

// Функция для фильтрации событий
function filterEvents() {
    const events = getEventsFromStorage();

    const typeSelect = $('#typeFilter');
    const sphereSelect = $('#sphereFilter');
    const organizerSelect = $('#organizerFilter');
    const formatSelect = $('#formatFilter');
    
    if (!typeSelect || !sphereSelect || !organizerSelect || !formatSelect) {
        console.error('Один или несколько элементов фильтров не найдены');
        return;
    }
    
    // Проверяем, выбран ли хотя бы один фильтр
    const isAnyFilterSelected = 
        typeSelect[0].value !== 'Выбрать' || 
        sphereSelect[0].value !== 'Выбрать' || 
        organizerSelect[0].value !== 'Выбрать' || 
        formatSelect[0].value !== 'Выбрать';
    
    // Если ни один фильтр не выбран, отображаем пустой список
    if (!isAnyFilterSelected) {
        displayFilteredEvents([]);
        return;
    }

    const filteredEvents = events.filter(event => {
        // Проверяем, выбрано ли значение в фильтре или стоит "Выбрать"
        const formatMatch = formatSelect[0].value === 'Выбрать' || event.format === formatSelect[0].value;
        const typeMatch = typeSelect[0].value === 'Выбрать' || event.type === typeSelect[0].value;
        const sphereMatch = sphereSelect[0].value === 'Выбрать' || event.sfera === sphereSelect[0].value;
        const organizerMatch = organizerSelect[0].value === 'Выбрать' || event.organizer === organizerSelect[0].value;

        return typeMatch && sphereMatch && organizerMatch && formatMatch;
    });
    
    displayFilteredEvents(filteredEvents);
}

// Функция для отображения отфильтрованных событий
// function formatDate(date) {
//     return date.toLocaleString('ru-RU', {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit'
//     });
// }

function displayFilteredEvents(filteredEvents) {
    const $eventDetailsContainer = $('#event-details').empty();
    
    if (filteredEvents.length === 0) {
        $eventDetailsContainer.html('<p class="text-muted text-center">Мероприятия не найдены</p>');
        return;
    }

    filteredEvents.forEach(event => {
        const $eventCard = $('<div>', {
            class: 'event-card mb-3 p-3 bg-white rounded shadow-sm'
        }).html(`
            <h5 class="event-title text-primary mb-2">${event.name}</h5>
            <div class="event-info">
                <p class="mb-1"><i class="fa fa-calendar me-2"></i>${event.date}</p>
                <p class="mb-1"><i class="fa fa-briefcase me-2"></i>${event.sfera}</p>
                <p class="mb-1"><i class="fa fa-clock-o me-2"></i>${event.duration}</p>
                <p class="mb-1"><i class="fa fa-building me-2"></i>${event.organizer}</p>
                <p class="mb-2"><i class="fa fa-desktop me-2"></i>${event.format}</p>
            </div>
            <p class="event-description text-muted mb-2">${event.description}</p>
            <button class="btn btn-primary btn-sm">Подробнее</button>
        `);
        
            $eventDetailsContainer.append($eventCard);
        });
    }

// Инициализация фильтров
function initializeFilters() {
    const $filterSelects = $('select[aria-label="Default select example"]');
    
    // Добавляем стили для контейнера фильтров
    const $filterContainer = $('.row.mt-4.container.mb-4');
    $filterContainer.css('background-color', '#f8f9fa');
    $filterContainer.css('padding', '20px');
    $filterContainer.css('border-radius', '10px');
    $filterContainer.css('box-shadow', '0 2px 4px rgba(0,0,0,0.1)');

    // Улучшаем стили для select элементов
    $filterSelects.each(function() {
        $(this).css('transition', 'all 0.3s ease');
        $(this).css('cursor', 'pointer');
        $(this).css('border-radius', '5px');
        $(this).css('border', '1px solid #ced4da');
        $(this).css('padding', '8px 12px');

        // Добавляем эффекты при наведении и фокусе
        $(this).on('mouseover', function() {
            $(this).css('border-color', '#80bdff');
        });

        $(this).on('mouseout', function() {
            if (!$(this).is(':focus')) {
                $(this).css('border-color', '#ced4da');
            }
        });

        // Добавляем обработчик события изменения
        $('.form-select').each(function() {
            $(this).on('change', function() {
                filterEvents();
                $('html, body').animate({scrollTop: $('#event-details').offset().top - 100}, 300);
            });
        });
    });

    // При первой загрузке очищаем контейнер событий, чтобы не показывать события, если ни один фильтр не выбран
    $('#event-details').empty();
}

// Запускаем инициализацию после загрузки DOM
document.addEventListener('DOMContentLoaded', initializeFilters);
