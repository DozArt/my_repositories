let search_value = '';
let user = "";
let repos = "";

window.addEventListener('DOMContentLoaded', () => {
  getSearchFromLocation();
  getUserAndReposFromSession();
  getUserAndReposFromLocation();
  
  if(repos) renderPage({ page: 'repos_detail' });
  else if(user) renderPage({ page: 'repositories' });
  else if(search_value) renderPage({page: 'search_user'})
  // else if(repos) renderPage({ page: 'search_user' });
});

window.addEventListener('popstate', (event) => {
  getSearchFromLocation();
  getUserAndReposFromLocation();
  if (event.state) {
    console.log(event.state)
    renderPage(event.state);
  } else {
    console.log('нет состояния')
    // renderPage({ page: "default" });
  }
});


function getSearchFromLocation() {
  let url_string = window.location.href;
  let url_full = new URL(url_string);
  search_value = url_full.searchParams.get("username");
  document.getElementById("search_user").value = search_value;
}

function getUserAndReposFromLocation() {
  let pathname = window.location.pathname;
  let path_split = pathname.split("/").filter(item => item !== "" && item !== "my_repositories");
  user = path_split[0];
  repos = path_split[1];
  console.log('получили пользователя из location')
}

function getUserAndReposFromSession() {
  let search = ""; // window.location.search  // пока не требуется

  let pathname = sessionStorage.getItem("pathname");
  sessionStorage.removeItem("pathname");
  if (pathname) {
    let path_split = pathname.split("/").filter(item => item !== "" && item !== "my_repositories");
    console.log('даннные из session', path_split);
    window.history.pushState({ page: 'repositories' }, "", `${pathname}${search}`);
  }
}


function submitSearch(value) {
  window.history.pushState(
    { page: 'search_user' },
    "",
    `/my_repositories/?username=${value}`
  );
  searchUsers(value);
  console.log("run SubmitSearchUsers");
}

const submitUser = function (value) {
  user = value;
  window.history.pushState({ page: 'repositories' }, "", `/my_repositories/${value}`);
  console.log("run submitUser");
  
  loadRepos(value);
};

const submitRepos = function (name, repo) {
  user = name;
  repos = repo
  window.history.pushState({ page: 'repositories' }, "", `/my_repositories/${name}/${repo}`);
  console.log("run submitRepos");
  
  searchReposDetail(user, repos);
};

function clearInElementById(id) {
  document.getElementById(id).innerHTML = "";
}

function setTitleUserName(user_name = '', repos_name = '') {
  const title = document.getElementById("title_name");
  title ? title.remove() : '';
  if (user_name) {
    const existingElement = document.getElementById("repositories");
    const parent = existingElement.parentNode;
    const newElement = document.createElement("h1");
    if (repos_name) newElement.textContent = `${user_name}/${repos_name}`
    else newElement.textContent = user_name;
    newElement.id = "title_name"
    parent.insertBefore(newElement, existingElement);
  }

}


function createListUsers(id, array) {
  const addUsers = document.getElementById(id);

  const user = createElement("li", {
    children: [
      createElement("h3", {
        children: [
          createElement("a", {
            attributes: { onclick: `submitUser("${array.login}")` },
            text: `${array.login}`,
          }),
        ],
      }),
      createElement("img", {
        attributes: { src: array.avatar_url },
        classes: "avatar",
      }),
    ],
  });

  addUsers.appendChild(user);
}


function createListRepositories(id, array) {
  const addRepositories = document.getElementById(id);
  let data_update = new Date(array.updated_at);
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = data_update.toLocaleDateString("en-US", options);

  // добавить ссылку на репозиторий
  const repository = createElement("li", {
    children: [
      createElement("h3", {
        children: [
          createElement("a", {
            attributes: { onclick: `submitRepos("${array.owner.login}", "${array.name}")` },
            text: `${array.name}`,
          }),
          createElement("span", {
            text: !array.private ? "Public" : "",
            classes: "label_type",
          }),
        ],
      }),
      createElement("div", {
        classes: "lining",
        children: [
          createElement("span", {
            children: [
              createElement("span", {
                classes: [
                  "circle",
                  array.language?.toLowerCase().replaceAll(" ", "_"),
                ],
              }),
              createElement("span", {
                classes: "programmingLanguage",
                text: array.language,
              }),
              createElement("span", {
                classes: "date_updated",
                text: `Updated on ${formattedDate}`,
              }),
            ],
          }),
        ],
      }),
    ],
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
      // Если атрибут - событие (например, onclick), добавляем как слушатель
      if (key.startsWith("on") && typeof value === "function") {
        const eventName = key.slice(2).toLowerCase(); // "onclick" -> "click"
        element.addEventListener(eventName, value);
      } else {
        element.setAttribute(key, value); // Для обычных атрибутов
      }
    }
  }

  // Добавление классов
  if (options.classes) {
    if (Array.isArray(options.classes)) {
      element.classList.add(...options.classes);
    } else if (typeof options.classes === "string") {
      element.classList.add(options.classes);
    }
  }

  // Установка текстового контента
  if (options.text) {
    element.textContent = options.text;
  }

  // Добавление дочерних элементов
  if (options.children) {
    options.children.forEach((child) => {
      if (typeof child === "string") {
        element.appendChild(document.createTextNode(child));
      } else if (child instanceof HTMLElement) {
        element.appendChild(child);
      }
    });
  }

  return element;
}


function renderPage(state) {

  switch (state.page) {
    case 'repositories':
      loadRepos(user)  // но надо эти данные взять из адресной строки
      break;
    case 'search_user':
      searchUsers(search_value);
      break;
    case 'repos_detail':
      searchReposDetail(user, repos)
      // content.innerHTML = `<h1>Контакты</h1>`;
      break;
    // default:
    //   content.innerHTML = `<h1>Страница по умолчанию</h1>`;
  }
}


function searchReposDetail(owner, repo) {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((users) => {
      clearInElementById("repositories");
      setTitleUserName(owner, repo);
      // users.items.forEach((user) => {
      //   createListUsers("repositories", user);
      // });
    })
    .catch((error) => console.error("Error:", error));
}


function searchUsers(search_query) {
  const url = `https://api.github.com/search/users?q=${search_query}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((users) => {
      clearInElementById("repositories");
      setTitleUserName();
      users.items.forEach((user) => {
        createListUsers("repositories", user);
      });
    })
    .catch((error) => console.error("Error:", error));
}


function loadRepos(username = "DozArt") {
  const url = `https://api.github.com/users/${username}/repos`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((repos) => {
      clearInElementById("repositories");
      setTitleUserName(username);
      repos.forEach((repo) => {
        createListRepositories("repositories", repo);
      });
    })
    .catch((error) => console.error("Error:", error));
}


// кнопка назад
// репозиторий подробнее
// изменение состояния loader
// pointer на ссылки