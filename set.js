let repositories = []; // Глобальная переменная для хранения данных
async function loadData() {
  try {
    const response = await fetch('./data.json'); // Загрузка JSON-файла
    repositories = await response.json(); // Сохранение данных в переменную
    const search = window.location.hash.slice(1)
    // console.log(window.location.hash.slice(1))
    document.getElementById('search_user').value = search
    generationElement(search)
    
  } catch (error) {
    console.error('Ошибка загрузки данных:', error);
  }
}

loadData();

function reload(name){
  generationElement(name)
  window.history.pushState({ page: 2 }, '', `/#${name}`);
  console.log(window.location.href.split('#')[1])
  localStorage.setItem('name' , name)
}

function generationElement(filter = "") {
  clearInElementById('repositories')
  repositories
      .filter((repo) => repo.author.toLowerCase().indexOf(filter.toLowerCase()) > -1 )
      .forEach((iter) => createInElementById('repositories', iter))
}

function clearInElementById(id) {
  document.getElementById(id).innerHTML = ''
}

function createInElementById(id, array) {
  const addRepositories = document.getElementById(id)
  const repository = createElement('li', {
    children: [
        createElement('h3', {
            text: `${array.author}/${array.title}`,
            children: [
              createElement('span', {
                  text: array.public ? "Public" :'',
                  classes: 'label_type'
              }),
            ]
        }),
        createElement('div', {
            classes: 'lining',
            children: [
              createElement('span', {
                children: [
                  createElement('span', {
                    classes: ['circle', array.language.toLowerCase()]
                  }),
                  createElement('span', {
                    classes: 'programmingLanguage',
                    text: array.language
                  }),
                  createElement('span', {
                    classes: 'date_updated',
                    text: 'Updated 17 hours ago',
                  })
                ]
              })
            ],
        })
    ]
  });

  addRepositories.appendChild(repository);
}



/**
 * Универсальная функция для создания HTML-элементов.
 * @param {string} tagName - Тег элемента (например, 'div', 'span', 'button').
 * @param {Object} [options] - Опции для настройки элемента.
 * @param {Object} [options.attributes] - Атрибуты элемента (например, { id: 'myId', title: 'tooltip' }).
 * @param {Array|string} [options.classes] - Классы элемента (например, 'my-class' или ['class1', 'class2']).
 * @param {Array} [options.children] - Массив дочерних элементов (строки или созданные элементы).
 * @param {string} [options.text] - Текстовый контент элемента.
 * @returns {HTMLElement} Созданный HTML-элемент.
 */
function createElement(tagName, options = {}) {
  const element = document.createElement(tagName);

  // Установка атрибутов
  if (options.attributes) {
      for (const [key, value] of Object.entries(options.attributes)) {
          element.setAttribute(key, value);
      }
  }

  // Добавление классов
  if (options.classes) {
      if (Array.isArray(options.classes)) {
          element.classList.add(...options.classes);
      } else if (typeof options.classes === 'string') {
          element.classList.add(options.classes);
      }
  }

  // Установка текстового контента
  if (options.text) {
      element.textContent = options.text;
  }

  // Добавление дочерних элементов
  if (options.children) {
      options.children.forEach(child => {
          if (typeof child === 'string') {
              element.appendChild(document.createTextNode(child));
          } else if (child instanceof HTMLElement) {
              element.appendChild(child);
          }
      });
  }

  return element;
}
