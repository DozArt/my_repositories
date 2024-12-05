let repositories = []; // Глобальная переменная для хранения данных

// нужна функция обработчик ссылки window.location

// загрузка данных данных из storage
function getSessionPathname(){
  let pathname = sessionStorage.getItem('pathname')
  sessionStorage.removeItem('pathname')
  if (pathname) {
    let path_split = pathname.split('/');
    if (path_split.indexOf('') === 0) path_split.shift();
    console.log(path_split)
    window.history.pushState('', '', `/${path_split[0]}`);
    // window.location = (`/${path_split[0]}`)
  }
}
getSessionPathname()


async function loadData() {
  try {
    const search = window.location.pathname
    document.getElementById('search_user').value = search
    // generationElement(search)
    
  } catch (error) {
    console.error('Ошибка загрузки данных:', error);
  }
}

loadData();

// function reload(name){
//   // generationElement(name)
//   window.history.pushState({ page: 2 }, '', `/#${name}`);
//   console.log(window.location.href.split('#')[1])
//   localStorage.setItem('name' , name)
// }

// function generationElement(filter = "") {
//   clearInElementById('repositories')
//   repositories
//       .filter((repo) => repo.author.toLowerCase().indexOf(filter.toLowerCase()) > -1 )
//       .forEach((iter) => createInElementById('repositories', iter))
// }

function clearInElementById(id) {
  document.getElementById(id).innerHTML = ''
}

function createInElementById(id, array) {
  const addRepositories = document.getElementById(id)
  let data_update = new Date(array.updated_at);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const formattedDate = data_update.toLocaleDateString('en-US', options);

  // отдельно генерация списка пользователей по значению переменной search

  // добавить ссылку на репозиторий
  // Добавить имя пользователя
  const repository = createElement('li', {
    children: [
        createElement('h3', {
            text: `${array.name}`,
            children: [
              createElement('span', {
                  text: !array.private ? "Public" :'',
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
                    classes: ['circle', array.language?.toLowerCase()]
                  }),
                  createElement('span', {
                    classes: 'programmingLanguage',
                    text: array.language
                  }),
                  createElement('span', {
                    classes: 'date_updated',
                    text: `Updated on ${formattedDate}`,
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


const username = "DozArt";
const url = `https://api.github.com/users/${username}/repos`;

fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((repos) => {
    clearInElementById('repositories');
    repos.forEach((repo) => {
      createInElementById('repositories', repo);
    });
  })
  .catch((error) => console.error('Error:', error));