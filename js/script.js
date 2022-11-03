const changeTemplate = document.querySelectorAll("input[name='grid']")

const addButtonElements = document.querySelectorAll('.add-btn')

// console.log(addButtonElements)
for(const addButton of addButtonElements){
    addButton.addEventListener('click', (event) => {
        const chooseBlock = event.target.parentNode
        let chooseButtonElement = document.querySelector(`.${chooseBlock.classList[0]} .choose-elem`)
        if(chooseBlock.classList[0] == "content")
            chooseButtonElement = document.querySelector(`.${chooseBlock.classList[1]} .choose-elem`)
        chooseButtonElement.classList.toggle('hidden')
        // console.log(chooseButtonElement.children)
    })
}

const chooseTemplate = chageElement => {
    const layout = document.querySelector(".layout")
    layout.classList.remove(layout.classList[1])
    layout.classList.add(`layout--${chageElement.target.value}`)
    // console.log(layout)
}


changeTemplate.forEach(
    (chageElement) => chageElement.addEventListener("change", chooseTemplate)
)
// console.log(changeTemplate)
const chooseElemBtn = document.querySelectorAll('.choose-elem__btn')
// console.log(chooseElemBtn)
function deleteElem(event){
    let deletedElem = event.target.parentNode
    // console.log(deletedElem)
    
    const block = deletedElem.parentNode;
    // console.log(block)
    deletedElem.remove()
    const wrapperItems = block.querySelectorAll('.element');
    // когда в *__elements-wrapper нет элементов, 
    // добавить класс *--empty его родителю
    if (wrapperItems.length === 0) {
       
      if (block.classList.contains('header')) {
        block.classList.add('header--empty');
      } 
  
      if (block.classList.contains('content')) {
        block.classList.add('content--empty');
      }
  
      if (block.classList.contains('footer')) {
        block.classList.add('footer--empty');
      }
    }
}

const updateElem = function(evt){
    const modal = document.createElement('div')
    modal.classList.add('modal')
    const updWindow = document.createElement('textarea')
    if(evt.target.tagName == 'img' || evt.target.tagName == 'IMG'){
        updWindow.value = evt.target.src
    } else {
        updWindow.value = evt.target.textContent
    }
    const sucessBtn = document.createElement('button')
    sucessBtn.textContent = "Отправить"
    const modalBody = document.createElement('div')
    modalBody.classList.add('modal-body')
    modalBody.append(updWindow)
    modalBody.append(sucessBtn)
    modal.append(modalBody)
    document.body.prepend(modal)
    
    sucessBtn.addEventListener('click',()=> {
        let textarea = document.querySelector('.modal textarea')
        console.log(evt.target.tagName)
        if(evt.target.tagName == 'img' || evt.target.tagName == 'IMG'){
            evt.target.src = textarea.value
        } else {
            evt.target.textContent = textarea.value
        }
        // console.log(textarea.parentElement)
        textarea.parentElement.parentElement.remove()
    })
    // console.log(evt.target)
}
for (const elementChooseMenu of chooseElemBtn) {
    elementChooseMenu.addEventListener('click', evtElementsChooseMenu => {
        const chooseBlockMenu = evtElementsChooseMenu.target
        const contentElement = document.querySelector(`.${chooseBlockMenu.dataset.container}`)  
        const template = document.querySelector("#"+chooseBlockMenu.dataset.type+"-template").content.cloneNode(true)
        template.querySelector('.delete-btn').addEventListener('click',deleteElem)
        template.querySelector('.template-content').addEventListener('dblclick',updateElem)
        contentElement.append(template)
        contentElement.classList.remove(`${contentElement.classList[0]}--empty`)
        // console.log(chooseBlockMenu.dataset.type)
    })
}
