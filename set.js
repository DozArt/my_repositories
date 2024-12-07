let url_string = window.location.href;
let url_full = new URL(url_string);
let search_value = url_full.searchParams.get("username");

if (search_value) {
  document.getElementById("search_user").value = search_value;
  searchUsers(search_value);
}


let search = ""; // window.location.search  // пока не требуется
let user = "";
let repos = "";
let pathname = sessionStorage.getItem("pathname");
sessionStorage.removeItem("pathname");

if (pathname) {
  let path_split = pathname.split("/");
  if (path_split.indexOf("") === 0) path_split.shift();
  if (path_split.indexOf("my_repositories") === 0) path_split.shift();
  user = path_split[0];
  if (user) loadRepos(user);
  repos = path_split[1]; // а он есть?
  console.log(path_split);
  window.history.pushState({ page: 2 }, "", `${pathname}${search}`);
}


function submitSearch(value) {
  window.history.pushState(
    { page: 2 },
    "",
    `/my_repositories/?username=${value}`
  );
  searchUsers(value);
  console.log("run SubmitSearchUsers");
}

const submitUser = function (value) {
  window.history.pushState({ page: 2 }, "", `/my_repositories/${value}`);
  console.log("run submitUser");
  loadRepos(value);
};

function clearInElementById(id) {
  document.getElementById(id).innerHTML = "";
}

function setTitleUserName(user_name) {
  const elementTitle = document.getElementById("user_name");
  elementTitle.textContent = user_name;
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
        text: `${array.name}`,
        children: [
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
                  array.language?.toLowerCase().replace(" ", "_"),
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
      setTitleUserName(repos[0].owner.login);
      repos.forEach((repo) => {
        createListRepositories("repositories", repo);
      });
    })
    .catch((error) => console.error("Error:", error));
}
