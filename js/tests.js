/**
 * Файл с логикой тестов по профориентации
 * Использует jQuery и localStorage для сохранения результатов
 */

$(document).ready(function() {
    // Данные тестов
    const personalityTest = {
        name: 'Личностный тест',
        questions: [
            {
                question: 'Как вы предпочитаете проводить свободное время?',
                options: [
                    'В компании друзей, общаясь и развлекаясь',
                    'Читая книгу или занимаясь саморазвитием',
                    'Занимаясь спортом или активным отдыхом',
                    'Создавая что-то своими руками или занимаясь творчеством'
                ]
            },
            {
                question: 'Как вы обычно решаете проблемы?',
                options: [
                    'Полагаюсь на логику и анализ',
                    'Доверяю интуиции и чувствам',
                    'Советуюсь с другими людьми',
                    'Ищу проверенные методы решения'
                ]
            },
            {
                question: 'Что для вас важнее в работе?',
                options: [
                    'Высокая зарплата и материальные блага',
                    'Возможность помогать другим и приносить пользу',
                    'Творческая самореализация и свобода действий',
                    'Стабильность и надежность'
                ]
            },
            {
                question: 'Как вы реагируете на новые ситуации?',
                options: [
                    'С энтузиазмом, люблю новые вызовы',
                    'С осторожностью, предпочитаю сначала все обдумать',
                    'Адаптируюсь по ситуации',
                    'Стараюсь избегать резких перемен'
                ]
            },
            {
                question: 'Какая рабочая среда вам больше подходит?',
                options: [
                    'Динамичная, с постоянными изменениями',
                    'Структурированная и организованная',
                    'Творческая и свободная',
                    'Спокойная и предсказуемая'
                ]
            },
            {
                question: 'Как вы предпочитаете работать?',
                options: [
                    'В команде, взаимодействуя с коллегами',
                    'Самостоятельно, в своем темпе',
                    'Под руководством опытного наставника',
                    'В паре с единомышленником'
                ]
            },
            {
                question: 'Что вас мотивирует больше всего?',
                options: [
                    'Признание и похвала окружающих',
                    'Личное удовлетворение от хорошо выполненной работы',
                    'Возможность профессионального роста',
                    'Материальное вознаграждение'
                ]
            },
            {
                question: 'Как вы относитесь к правилам и инструкциям?',
                options: [
                    'Стараюсь всегда следовать правилам',
                    'Следую правилам, но могу их адаптировать при необходимости',
                    'Предпочитаю сам устанавливать правила',
                    'Часто ставлю под сомнение необходимость правил'
                ]
            },
            {
                question: 'Что вам больше нравится?',
                options: [
                    'Работать с людьми',
                    'Работать с информацией и данными',
                    'Работать с материальными объектами',
                    'Работать с идеями и концепциями'
                ]
            },
            {
                question: 'Как вы принимаете важные решения?',
                options: [
                    'Взвешиваю все за и против, анализирую',
                    'Полагаюсь на интуицию и внутренние ощущения',
                    'Советуюсь с близкими или экспертами',
                    'Основываюсь на прошлом опыте'
                ]
            }
        ],
        results: [
            {
                type: 'Аналитик',
                description: 'Вы логичны, рациональны и любите анализировать информацию. Вам подходят профессии, требующие аналитического мышления и работы с данными.',
                professions: [
                    'Аналитик данных',
                    'Программист',
                    'Финансовый аналитик',
                    'Инженер',
                    'Исследователь',
                    'Системный администратор'
                ]
            },
            {
                type: 'Коммуникатор',
                description: 'Вы общительны, эмоциональны и хорошо понимаете людей. Вам подходят профессии, связанные с коммуникацией и взаимодействием с людьми.',
                professions: [
                    'Менеджер по работе с клиентами',
                    'PR-специалист',
                    'Психолог',
                    'Учитель',
                    'HR-менеджер',
                    'Журналист'
                ]
            },
            {
                type: 'Организатор',
                description: 'Вы практичны, организованы и внимательны к деталям. Вам подходят профессии, требующие структурированного подхода и организационных навыков.',
                professions: [
                    'Проектный менеджер',
                    'Администратор',
                    'Логист',
                    'Бухгалтер',
                    'Юрист',
                    'Операционный директор'
                ]
            },
            {
                type: 'Творец',
                description: 'Вы креативны, оригинальны и любите нестандартные решения. Вам подходят профессии, связанные с творчеством и инновациями.',
                professions: [
                    'Дизайнер',
                    'Архитектор',
                    'Маркетолог',
                    'Писатель',
                    'Режиссер',
                    'Предприниматель'
                ]
            }
        ]
    };

    const professionalTest = {
        name: 'Тест на профессиональные склонности',
        questions: [
            {
                question: 'Мне нравится работать с техникой и механизмами',
                options: [
                    'Полностью согласен',
                    'Скорее согласен',
                    'Затрудняюсь ответить',
                    'Скорее не согласен',
                    'Полностью не согласен'
                ]
            },
            {
                question: 'Мне интересно изучать живую природу',
                options: [
                    'Полностью согласен',
                    'Скорее согласен',
                    'Затрудняюсь ответить',
                    'Скорее не согласен',
                    'Полностью не согласен'
                ]
            },
            {
                question: 'Я люблю общаться и помогать людям',
                options: [
                    'Полностью согласен',
                    'Скорее согласен',
                    'Затрудняюсь ответить',
                    'Скорее не согласен',
                    'Полностью не согласен'
                ]
            },
            {
                question: 'Мне нравится создавать художественные произведения',
                options: [
                    'Полностью согласен',
                    'Скорее согласен',
                    'Затрудняюсь ответить',
                    'Скорее не согласен',
                    'Полностью не согласен'
                ]
            },
            {
                question: 'Я предпочитаю работать с цифрами и фактами',
                options: [
                    'Полностью согласен',
                    'Скорее согласен',
                    'Затрудняюсь ответить',
                    'Скорее не согласен',
                    'Полностью не согласен'
                ]
            },
            {
                question: 'Мне интересно организовывать и планировать работу других людей',
                options: [
                    'Полностью согласен',
                    'Скорее согласен',
                    'Затрудняюсь ответить',
                    'Скорее не согласен',
                    'Полностью не согласен'
                ]
            },
            {
                question: 'Я люблю работать руками, создавать или чинить вещи',
                options: [
                    'Полностью согласен',
                    'Скорее согласен',
                    'Затрудняюсь ответить',
                    'Скорее не согласен',
                    'Полностью не согласен'
                ]
            },
            {
                question: 'Мне нравится проводить исследования и эксперименты',
                options: [
                    'Полностью согласен',
                    'Скорее согласен',
                    'Затрудняюсь ответить',
                    'Скорее не согласен',
                    'Полностью не согласен'
                ]
            },
            {
                question: 'Я хорошо понимаю чувства и мотивы других людей',
                options: [
                    'Полностью согласен',
                    'Скорее согласен',
                    'Затрудняюсь ответить',
                    'Скорее не согласен',
                    'Полностью не согласен'
                ]
            },
            {
                question: 'Мне важно иметь возможность самовыражения в работе',
                options: [
                    'Полностью согласен',
                    'Скорее согласен',
                    'Затрудняюсь ответить',
                    'Скорее не согласен',
                    'Полностью не согласен'
                ]
            },
            {
                question: 'Я люблю анализировать информацию и решать сложные задачи',
                options: [
                    'Полностью согласен',
                    'Скорее согласен',
                    'Затрудняюсь ответить',
                    'Скорее не согласен',
                    'Полностью не согласен'
                ]
            },
            {
                question: 'Мне нравится убеждать людей и влиять на их мнение',
                options: [
                    'Полностью согласен',
                    'Скорее согласен',
                    'Затрудняюсь ответить',
                    'Скорее не согласен',
                    'Полностью не согласен'
                ]
            }
        ],
        results: [
            {
                type: 'Технический тип',
                description: 'Вы склонны к работе с техникой, механизмами и физическими объектами. Вам нравится создавать, строить и ремонтировать вещи.',
                professions: [
                    'Инженер',
                    'Механик',
                    'Электрик',
                    'Программист',
                    'Архитектор',
                    'Пилот'
                ]
            },
            {
                type: 'Естественнонаучный тип',
                description: 'Вы интересуетесь природой, наукой и исследованиями. Вам нравится изучать, анализировать и экспериментировать.',
                professions: [
                    'Биолог',
                    'Химик',
                    'Эколог',
                    'Врач',
                    'Фармацевт',
                    'Лаборант'
                ]
            },
            {
                type: 'Социальный тип',
                description: 'Вы ориентированы на работу с людьми. Вам нравится помогать, обучать и консультировать других.',
                professions: [
                    'Психолог',
                    'Учитель',
                    'Социальный работник',
                    'Врач',
                    'Консультант',
                    'HR-специалист'
                ]
            },
            {
                type: 'Артистический тип',
                description: 'Вы креативны и стремитесь к самовыражению. Вам нравится создавать художественные произведения и работать в творческой среде.',
                professions: [
                    'Дизайнер',
                    'Художник',
                    'Музыкант',
                    'Писатель',
                    'Актер',
                    'Фотограф'
                ]
            },
            {
                type: 'Интеллектуальный тип',
                description: 'Вы аналитичны и любите работать с информацией. Вам нравится решать сложные задачи и анализировать данные.',
                professions: [
                    'Аналитик',
                    'Ученый',
                    'Математик',
                    'Программист',
                    'Экономист',
                    'Исследователь'
                ]
            },
            {
                type: 'Предпринимательский тип',
                description: 'Вы ориентированы на лидерство и управление. Вам нравится организовывать, убеждать и руководить другими.',
                professions: [
                    'Менеджер',
                    'Предприниматель',
                    'Директор',
                    'Маркетолог',
                    'Политик',
                    'Юрист'
                ]
            }
        ]
    };

    const skillsTest = {
        name: 'Тест навыков',
        questions: [
            {
                question: 'Я легко нахожу общий язык с разными людьми',
                options: [
                    'Полностью согласен',
                    'Скорее согласен',
                    'Затрудняюсь ответить',
                    'Скорее не согласен',
                    'Полностью не согласен'
                ]
            },
            {
                question: 'Мне нравится решать логические задачи и головоломки',
                options: [
                    'Полностью согласен',
                    'Скорее согласен',
                    'Затрудняюсь ответить',
                    'Скорее не согласен',
                    'Полностью не согласен'
                ]
            },
            {
                question: 'Я хорошо выражаю свои мысли в письменной форме',
                options: [
                    'Полностью согласен',
                    'Скорее согласен',
                    'Затрудняюсь ответить',
                    'Скорее не согласен',
                    'Полностью не согласен'
                ]
            },
            {
                question: 'Я умею хорошо планировать свое время',
                options: [
                    'Полностью согласен',
                    'Скорее согласен',
                    'Затрудняюсь ответить',
                    'Скорее не согласен',
                    'Полностью не согласен'
                ]
            },
            {
                question: 'Мне легко дается изучение иностранных языков',
                options: [
                    'Полностью согласен',
                    'Скорее согласен',
                    'Затрудняюсь ответить',
                    'Скорее не согласен',
                    'Полностью не согласен'
                ]
            },
            {
                question: 'Я хорошо разбираюсь в технике и компьютерах',
                options: [
                    'Полностью согласен',
                    'Скорее согласен',
                    'Затрудняюсь ответить',
                    'Скорее не согласен',
                    'Полностью не согласен'
                ]
            },
            {
                question: 'Я умею убеждать людей и отстаивать свою точку зрения',
                options: [
                    'Полностью согласен',
                    'Скорее согласен',
                    'Затрудняюсь ответить',
                    'Скорее не согласен',
                    'Полностью не согласен'
                ]
            },
            {
                question: 'Я хорошо справляюсь с работой в условиях стресса и дедлайнов',
                options: [
                    'Полностью согласен',
                    'Скорее согласен',
                    'Затрудняюсь ответить',
                    'Скорее не согласен',
                    'Полностью не согласен'
                ]
            },
            {
                question: 'Я обладаю хорошими творческими способностями',
                options: [
                    'Полностью согласен',
                    'Скорее согласен',
                    'Затрудняюсь ответить',
                    'Скорее не согласен',
                    'Полностью не согласен'
                ]
            },
            {
                question: 'Я умею работать в команде и учитывать мнение других',
                options: [
                    'Полностью согласен',
                    'Скорее согласен',
                    'Затрудняюсь ответить',
                    'Скорее не согласен',
                    'Полностью не согласен'
                ]
            }
        ],
        results: [
            {
                type: 'Коммуникативные навыки',
                description: 'У вас хорошо развиты навыки общения и взаимодействия с людьми. Вы умеете слушать, убеждать и находить общий язык с разными людьми.',
                professions: [
                    'Менеджер по продажам',
                    'PR-специалист',
                    'HR-менеджер',
                    'Психолог',
                    'Учитель',
                    'Журналист'
                ]
            },
            {
                type: 'Аналитические навыки',
                description: 'У вас хорошо развиты навыки анализа информации и логического мышления. Вы умеете решать сложные задачи и находить закономерности.',
                professions: [
                    'Аналитик данных',
                    'Программист',
                    'Финансовый аналитик',
                    'Исследователь',
                    'Инженер',
                    'Математик'
                ]
            },
            {
                type: 'Организационные навыки',
                description: 'У вас хорошо развиты навыки планирования и организации. Вы умеете эффективно управлять временем и ресурсами.',
                professions: [
                    'Проектный менеджер',
                    'Администратор',
                    'Логист',
                    'Операционный директор',
                    'Координатор мероприятий',
                    'Офис-менеджер'
                ]
            },
            {
                type: 'Творческие навыки',
                description: 'У вас хорошо развиты творческие способности и креативное мышление. Вы умеете генерировать новые идеи и нестандартно подходить к решению задач.',
                professions: [
                    'Дизайнер',
                    'Копирайтер',
                    'Маркетолог',
                    'Архитектор',
                    'Режиссер',
                    'Художник'
                ]
            },
            {
                type: 'Технические навыки',
                description: 'У вас хорошо развиты технические навыки и понимание технологий. Вы умеете работать с техникой и осваивать новые технологии.',
                professions: [
                    'Программист',
                    'Системный администратор',
                    'Инженер',
                    'Веб-разработчик',
                    'Специалист по информационной безопасности',
                    'Технический специалист'
                ]
            }
        ]
    };

    // Переменные для отслеживания текущего состояния тестов
    let currentPersonalityQuestion = 0;
    let currentProfessionalQuestion = 0;
    let currentSkillsQuestion = 0;
    let personalityAnswers = Array(personalityTest.questions.length).fill(null);
    let professionalAnswers = Array(professionalTest.questions.length).fill(null);
    let skillsAnswers = Array(skillsTest.questions.length).fill(null);

    // Инициализация тестов
    initTest('personality', personalityTest);
    initTest('professional', professionalTest);
    initTest('skills', skillsTest);
    loadSavedResults();

    // Обработчики событий для кнопок тестов
    $('#personality-next').click(function() {
        nextQuestion('personality');
    });

    $('#professional-next').click(function() {
        nextQuestion('professional');
    });

    $('#skills-next').click(function() {
        nextQuestion('skills');
    });

    $('#personality-submit').click(function() {
        showResults('personality');
    });

    $('#professional-submit').click(function() {
        showResults('professional');
    });

    $('#skills-submit').click(function() {
        showResults('skills');
    });

    $('#personality-restart').click(function() {
        restartTest('personality');
    });

    $('#professional-restart').click(function() {
        restartTest('professional');
    });

    $('#skills-restart').click(function() {
        restartTest('skills');
    });

    $('#personality-save-result').click(function() {
        saveResult('personality');
    });

    $('#professional-save-result').click(function() {
        saveResult('professional');
    });

    $('#skills-save-result').click(function() {
        saveResult('skills');
    });

    $('#clear-results').click(function() {
        clearAllResults();
    });

    // Функция инициализации теста
    function initTest(testType, testData) {
        const questionsContainer = $(`#${testType}-questions`);
        questionsContainer.empty();

        if (testType === 'personality') {
            renderQuestion(testType, currentPersonalityQuestion, personalityTest);
            updateProgress(testType, currentPersonalityQuestion, personalityTest.questions.length);
        } else if (testType === 'professional') {
            renderQuestion(testType, currentProfessionalQuestion, professionalTest);
            updateProgress(testType, currentProfessionalQuestion, professionalTest.questions.length);
        } else if (testType === 'skills') {
            renderQuestion(testType, currentSkillsQuestion, skillsTest);
            updateProgress(testType, currentSkillsQuestion, skillsTest.questions.length);
        }
    }

    // Функция отображения вопроса
    function renderQuestion(testType, questionIndex, testData) {
        const questionsContainer = $(`#${testType}-questions`);
        questionsContainer.empty();

        if (questionIndex < testData.questions.length) {
            const question = testData.questions[questionIndex];
            const questionElement = $('<div class="test-question"></div>');
            questionElement.append(`<h4>${questionIndex + 1}. ${question.question}</h4>`);

            const optionsContainer = $('<div class="test-options"></div>');
            question.options.forEach((option, index) => {
                optionsContainer.append(`
                    <label>
                        <input type="radio" name="${testType}-q${questionIndex}" value="${index}">
                        ${option}
                    </label>
                `);
            });

            questionElement.append(optionsContainer);
            questionsContainer.append(questionElement);
        }
    }

    // Функция перехода к следующему вопросу
    function nextQuestion(testType) {
        let currentQuestion, testData, answers;

        if (testType === 'personality') {
            currentQuestion = currentPersonalityQuestion;
            testData = personalityTest;
            answers = personalityAnswers;
        } else if (testType === 'professional') {
            currentQuestion = currentProfessionalQuestion;
            testData = professionalTest;
            answers = professionalAnswers;
        } else if (testType === 'skills') {
            currentQuestion = currentSkillsQuestion;
            testData = skillsTest;
            answers = skillsAnswers;
        }

        // Проверка, выбран ли ответ
        const selectedOption = $(`input[name="${testType}-q${currentQuestion}"]:checked`).val();
        if (selectedOption === undefined) {
            alert('Пожалуйста, выберите один из вариантов ответа.');
            return;
        }

        // Сохранение ответа
        answers[currentQuestion] = parseInt(selectedOption);

        // Переход к следующему вопросу или завершение теста
        if (currentQuestion < testData.questions.length - 1) {
            if (testType === 'personality') {
                currentPersonalityQuestion++;
                renderQuestion(testType, currentPersonalityQuestion, testData);
                updateProgress(testType, currentPersonalityQuestion, testData.questions.length);
            } else if (testType === 'professional') {
                currentProfessionalQuestion++;
                renderQuestion(testType, currentProfessionalQuestion, testData);
                updateProgress(testType, currentProfessionalQuestion, testData.questions.length);
            } else if (testType === 'skills') {
                currentSkillsQuestion++;
                renderQuestion(testType, currentSkillsQuestion, testData);
                updateProgress(testType, currentSkillsQuestion, testData.questions.length);
            }
        } else {
            // Последний вопрос, показываем кнопку завершения
            $(`#${testType}-next`).hide();
            $(`#${testType}-submit`).show();
        }
    }

    // Функция обновления прогресса
    function updateProgress(testType, currentQuestion, totalQuestions) {
        const progressPercentage = (currentQuestion / totalQuestions) * 100;
        $(`#${testType}-progress`).css('width', `${progressPercentage}%`);
    }

    // Функция отображения результатов
    function showResults(testType) {
        let answers, testData, resultContainer, resultContent, currentQuestion;

        if (testType === 'personality') {
            answers = personalityAnswers;
            testData = personalityTest;
            resultContainer = $('#personality-result');
            resultContent = $('#personality-result-content');
            currentQuestion = currentPersonalityQuestion;
        } else if (testType === 'professional') {
            answers = professionalAnswers;
            testData = professionalTest;
            resultContainer = $('#professional-result');
            resultContent = $('#professional-result-content');
            currentQuestion = currentProfessionalQuestion;
        } else if (testType === 'skills') {
            answers = skillsAnswers;
            testData = skillsTest;
            resultContainer = $('#skills-result');
            resultContent = $('#skills-result-content');
            currentQuestion = currentSkillsQuestion;
        }
        
        // Проверка, выбран ли ответ на последний вопрос
        const selectedOption = $(`input[name="${testType}-q${currentQuestion}"]:checked`).val();
        if (selectedOption === undefined) {
            alert('Пожалуйста, выберите один из вариантов ответа.');
            return;
        }
        
        // Сохранение ответа на последний вопрос
        answers[currentQuestion] = parseInt(selectedOption);

        // Скрываем тест и показываем результаты
        $(`#${testType}-test`).hide();
        resultContainer.show();

        // Анализ ответов и определение результата
        const result = analyzeResults(testType, answers, testData);

        // Отображение результата
        let resultHTML = `
            <div class="result-description">
                <p><strong>Ваш тип:</strong> ${result.type}</p>
                <p>${result.description}</p>
            </div>
            <h4>Рекомендуемые профессии:</h4>
            <div class="profession-list">
        `;

        result.professions.forEach(profession => {
            resultHTML += `<div class="profession-item">${profession}</div>`;
        });

        resultHTML += '</div>';
        resultContent.html(resultHTML);
    }

    // Функция анализа результатов
    function analyzeResults(testType, answers, testData) {
        if (testType === 'personality') {
            // Подсчет баллов для каждого типа личности
            const scores = [0, 0, 0, 0]; // Аналитик, Коммуникатор, Организатор, Творец

            answers.forEach((answer, index) => {
                if (index === 0) { // Вопрос о свободном времени
                    scores[answer]++;
                } else if (index === 1) { // Вопрос о решении проблем
                    if (answer === 0) scores[0]++; // Логика - Аналитик
                    if (answer === 1) scores[3]++; // Интуиция - Творец
                    if (answer === 2) scores[1]++; // Советы - Коммуникатор
                    if (answer === 3) scores[2]++; // Проверенные методы - Организатор
                } else if (index === 2) { // Вопрос о важности в работе
                    if (answer === 0) scores[0]++; // Зарплата - Аналитик
                    if (answer === 1) scores[1]++; // Помощь - Коммуникатор
                    if (answer === 2) scores[3]++; // Творчество - Творец
                    if (answer === 3) scores[2]++; // Стабильность - Организатор
                } else if (index === 3) { // Вопрос о новых ситуациях
                    if (answer === 0) scores[3]++; // Энтузиазм - Творец
                    if (answer === 1) scores[0]++; // Осторожность - Аналитик
                    if (answer === 2) scores[1]++; // Адаптация - Коммуникатор
                    if (answer === 3) scores[2]++; // Избегание - Организатор
                } else if (index === 4) { // Вопрос о рабочей среде
                    if (answer === 0) scores[3]++; // Динамичная - Творец
                    if (answer === 1) scores[2]++; // Структурированная - Организатор
                    if (answer === 2) scores[3]++; // Творческая - Творец
                    if (answer === 3) scores[2]++; // Спокойная - Организатор
                } else if (index === 5) { // Вопрос о предпочтениях в работе
                    if (answer === 0) scores[1]++; // В команде - Коммуникатор
                    if (answer === 1) scores[0]++; // Самостоятельно - Аналитик
                    if (answer === 2) scores[2]++; // Под руководством - Организатор
                    if (answer === 3) scores[3]++; // В паре - Творец
                } else if (index === 6) { // Вопрос о мотивации
                    if (answer === 0) scores[1]++; // Признание - Коммуникатор
                    if (answer === 1) scores[0]++; // Личное удовлетворение - Аналитик
                    if (answer === 2) scores[3]++; // Профессиональный рост - Творец
                    if (answer === 3) scores[2]++; // Материальное - Организатор
                } else if (index === 7) { // Вопрос о правилах
                    if (answer === 0) scores[2]++; // Следовать правилам - Организатор
                    if (answer === 1) scores[0]++; // Адаптировать - Аналитик
                    if (answer === 2) scores[3]++; // Устанавливать - Творец
                    if (answer === 3) scores[1]++; // Сомневаться - Коммуникатор
                } else if (index === 8) { // Вопрос о предпочтениях в работе
                    if (answer === 0) scores[1]++; // С людьми - Коммуникатор
                    if (answer === 1) scores[0]++; // С информацией - Аналитик
                    if (answer === 2) scores[2]++; // С объектами - Организатор
                    if (answer === 3) scores[3]++; // С идеями - Творец
                } else if (index === 9) { // Вопрос о принятии решений
                    if (answer === 0) scores[0]++; // Анализ - Аналитик
                    if (answer === 1) scores[3]++; // Интуиция - Творец
                    if (answer === 2) scores[1]++; // Советы - Коммуникатор
                    if (answer === 3) scores[2]++; // Опыт - Организатор
                }
            });

            // Определение доминирующего типа
            const maxScore = Math.max(...scores);
            const dominantTypeIndex = scores.indexOf(maxScore);

            return testData.results[dominantTypeIndex];
        } else if (testType === 'professional') {
            // Подсчет баллов для каждого профессионального типа
            const scores = [0, 0, 0, 0, 0, 0]; // Технический, Естественнонаучный, Социальный, Артистический, Интеллектуальный, Предпринимательский

            answers.forEach((answer, index) => {
                // Инвертируем значения для отрицательных ответов (4 - answer для шкалы 0-4)
                const value = 4 - answer;

                if (index === 0 || index === 6) { // Вопросы о технике и работе руками
                    scores[0] += value;
                } else if (index === 1 || index === 7) { // Вопросы о природе и исследованиях
                    scores[1] += value;
                } else if (index === 2 || index === 8) { // Вопросы о людях
                    scores[2] += value;
                } else if (index === 3 || index === 9) { // Вопросы о творчестве и самовыражении
                    scores[3] += value;
                } else if (index === 4 || index === 10) { // Вопросы о цифрах и анализе
                    scores[4] += value;
                } else if (index === 5 || index === 11) { // Вопросы об организации и убеждении
                    scores[5] += value;
                }
            });

            // Определение доминирующего типа
            const maxScore = Math.max(...scores);
            const dominantTypeIndex = scores.indexOf(maxScore);

            return testData.results[dominantTypeIndex];
        } else if (testType === 'skills') {
            // Подсчет баллов для каждого типа навыков
            const scores = [0, 0, 0, 0, 0]; // Коммуникативные, Аналитические, Организационные, Творческие, Технические

            answers.forEach((answer, index) => {
                // Инвертируем значения для отрицательных ответов (4 - answer для шкалы 0-4)
                const value = 4 - answer;

                if (index === 0 || index === 6 || index === 9) { // Вопросы о коммуникации
                    scores[0] += value;
                } else if (index === 1 || index === 10) { // Вопросы о логике и анализе
                    scores[1] += value;
                } else if (index === 3 || index === 7) { // Вопросы о планировании и стрессе
                    scores[2] += value;
                } else if (index === 2 || index === 8) { // Вопросы о письме и творчестве
                    scores[3] += value;
                } else if (index === 4 || index === 5) { // Вопросы о языках и технике
                    scores[4] += value;
                }
            });

            // Определение доминирующего типа
            const maxScore = Math.max(...scores);
            const dominantTypeIndex = scores.indexOf(maxScore);

            return testData.results[dominantTypeIndex];
        }
    }

    // Функция перезапуска теста
    function restartTest(testType) {
        if (testType === 'personality') {
            currentPersonalityQuestion = 0;
            personalityAnswers = Array(personalityTest.questions.length).fill(null);
        } else if (testType === 'professional') {
            currentProfessionalQuestion = 0;
            professionalAnswers = Array(professionalTest.questions.length).fill(null);
        } else if (testType === 'skills') {
            currentSkillsQuestion = 0;
            skillsAnswers = Array(skillsTest.questions.length).fill(null);
        }

        // Скрываем результаты и показываем тест
        $(`#${testType}-result`).hide();
        $(`#${testType}-test`).show();
        $(`#${testType}-next`).show();
        $(`#${testType}-submit`).hide();

        // Инициализируем тест заново
        initTest(testType, testType === 'personality' ? personalityTest : (testType === 'professional' ? professionalTest : skillsTest));
    }

    // Функция сохранения результата
    function saveResult(testType) {
        let result, testName;

        if (testType === 'personality') {
            result = analyzeResults(testType, personalityAnswers, personalityTest);
            testName = personalityTest.name;
        } else if (testType === 'professional') {
            result = analyzeResults(testType, professionalAnswers, professionalTest);
            testName = professionalTest.name;
        } else if (testType === 'skills') {
            result = analyzeResults(testType, skillsAnswers, skillsTest);
            testName = skillsTest.name;
        }

        // Создаем объект с результатом и датой
        const savedResult = {
            testType: testType,
            testName: testName,
            result: result,
            date: new Date().toLocaleString()
        };

        // Получаем существующие результаты из localStorage
        let savedResults = JSON.parse(localStorage.getItem('testResults')) || [];

        // Добавляем новый результат
        savedResults.push(savedResult);

        // Сохраняем обновленный массив результатов
        localStorage.setItem('testResults', JSON.stringify(savedResults));

        // Обновляем отображение сохраненных результатов
        loadSavedResults();

        // Показываем сообщение об успешном сохранении
        alert('Результат успешно сохранен!');
    }

    // Функция загрузки сохраненных результатов
    function loadSavedResults() {
        const savedResultsList = $('#saved-results-list');
        const savedResults = JSON.parse(localStorage.getItem('testResults')) || [];

        if (savedResults.length === 0) {
            savedResultsList.html('<p>У вас пока нет сохраненных результатов.</p>');
            return;
        }

        let resultsHTML = '';

        // Отображаем результаты в обратном порядке (новые сверху)
        for (let i = savedResults.length - 1; i >= 0; i--) {
            const savedResult = savedResults[i];
            resultsHTML += `
                <div class="saved-result-item">
                    <div class="saved-result-date">${savedResult.date}</div>
                    <h4>${savedResult.testName}</h4>
                    <p><strong>Ваш тип:</strong> ${savedResult.result.type}</p>
                    <p>${savedResult.result.description}</p>
                    <button class="btn btn-sm btn-danger delete-result" data-index="${i}">Удалить</button>
                </div>
            `;
        }

        savedResultsList.html(resultsHTML);

        // Добавляем обработчики для кнопок удаления
        $('.delete-result').click(function() {
            const index = $(this).data('index');
            deleteResult(index);
        });
    }

    // Функция удаления результата
    function deleteResult(index) {
        let savedResults = JSON.parse(localStorage.getItem('testResults')) || [];

        // Удаляем результат по индексу
        savedResults.splice(index, 1);

        // Сохраняем обновленный массив результатов
        localStorage.setItem('testResults', JSON.stringify(savedResults));

        // Обновляем отображение сохраненных результатов
        loadSavedResults();
    }

    // Функция очистки всех результатов
    function clearAllResults() {
        if (confirm('Вы уверены, что хотите удалить все сохраненные результаты?')) {
            localStorage.removeItem('testResults');
            loadSavedResults();
        }
    }});
