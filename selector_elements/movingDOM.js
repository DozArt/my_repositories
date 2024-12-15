class SelectElement {
  constructor() {
    this.div_control_unit = document.createElement("div");
    this.div_control_unit.classList.add('selector_control_unit')
    this.div_control_unit.id = "start_select"
    document.body.appendChild(this.div_control_unit);

    this.element = document.getElementById('start_select');

    let add_style = createElement("link")
    add_style.rel = "stylesheet";
    add_style.href = "./selector_elements/styles_control_unit.css";
    document.head.appendChild(add_style)
    
    if (this.element instanceof HTMLElement) {
      this.select();
      this.renderControls();
    } else {
      console.error('Element with id "repositories" not found or is not an HTML element.');
    }
  }
  
  select() {
    if (this.element) {
      this.element.classList.add('select_element')
    }
  };

  reject() {
    if (this.element) {
      this.element.classList.remove('select_element')
      
    }
  };
  
  transition(new_element) {
    if(new_element instanceof HTMLElement) {
      this.reject()
      this.element = new_element
      this.element.scrollIntoView()
      this.select()
      console.log(this.element)
    }
  };

  navigate(getNewElement) {
    const newElement = getNewElement(this.element);
    this.transition(newElement);
  }

  next() {
    this.navigate((el) => el.nextElementSibling);
  }

  back() {
    this.navigate((el) => el.previousElementSibling);
  }

  down() {
    this.navigate((el) => el.firstElementChild);
  }

  up() {
    this.navigate((el) => el.parentElement);
  }

  createNavigationButton(text, onClick) {
    const button = document.createElement("a");
    button.textContent = text;
    button.addEventListener("click", onClick);
    this.div_control_unit.appendChild(button);
  }

  renderControls() {
    this.createNavigationButton('⬅️', () => this.back());
    this.createNavigationButton('⬆️', () => this.up());
    this.createNavigationButton('⬇️', () => this.down());
    this.createNavigationButton('➡️', () => this.next());
  }
};
  
// const select_element = new SelectElement();

document.addEventListener('DOMContentLoaded', () => {
  new SelectElement();
});
