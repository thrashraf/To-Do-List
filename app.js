const inputContainer = document.querySelector('.body-container');
const input = document.querySelector('input');
const button = document.querySelector('[type = submit]');
const menu = document.querySelector('.menu');
const lists = JSON.parse(localStorage.getItem('lists')) || [];
const theme = document.querySelector('.change-theme');

const changeTheme = () => {

    const body = document.querySelector('body');

    body.classList.toggle('theme2');
    console.log('click');
};

const createListHandler = (e) => {

    e.preventDefault();
    console.log(true);

    if (input.value.trim() == '') {

        return;
    } 

    const list = {

        value: input.value,
        id: Math.random(),
        isActive: false
        
    };

    lists.push(list);
    renderList(list);
    localStorage.setItem('lists' , JSON.stringify(lists));


    input.value = '';
};

const renderList = (lists) => {


    const listEl = document.createElement('div');
    listEl.className = `list-container ${lists.isActive ? 'active' : ''}`;
    listElMarkup = `
         <button><img src="images/icon-check.svg" alt="" ></button>
         <p id=${lists.id} >${lists.value}</p>
        <i class="fas fa-trash-alt"></i>
    `;
    
    listEl.innerHTML = listElMarkup;
    inputContainer.append(listEl);

    listEl.addEventListener('click', () => {

        listEl.classList.toggle('active');
        const listId = listEl.children[1].id;
        console.log(listId);
        updateLists(listId);
        
    });

    listEl.addEventListener('click', deleteList);
    console.log(lists);

};

const updateLists = (listId) => {

    const input = inputContainer.children;
    let inputIndex = 0;

        for (const list of lists) {
         
            if (list.id == listId) {

                console.log(list);
                break;
            }
            inputIndex++;
        }

    for (const listEl of input) {
        
        if (listEl.classList.contains('active')) {
            console.log(lists[inputIndex].isActive = true);
        } else {
            console.log(lists[inputIndex].isActive = false);
        }
    }
    
    localStorage.setItem('lists' , JSON.stringify(lists));
};


const deleteList = (e) => {

    const item = e.target;
    const inputList = item.previousElementSibling.id;
    console.log(item);

    if (item.matches('.fa-trash-alt')) {

        let inputIndex = 0;
        console.log('click');
        for (const list of lists) {
            
            if (list.id == inputList) {

                item.parentNode.remove();
                break;

            }
            inputIndex++;
        }

        lists.splice(inputIndex, 1);
        localStorage.setItem('lists' , JSON.stringify(lists));
    }

};


const filterList = (e) => {

    const input = inputContainer.children;

    const filter = e.target.id;
    console.log(filter);
    for (const list of input) {
        
        switch (filter) {
            case 'all':
                list.style.display = 'grid';
                break;

            case 'active':
                if (list.classList.contains('active')){
                    
                    list.style.display = 'none';
                } else {

                    list.style.display = 'grid';
                }
                break;

            case 'completed':
                if (list.classList.contains('active')){
                    
                    list.style.display = 'grid';
                } else {

                    list.style.display = 'none';
                }
                break;
        }
    }
};


if (localStorage.getItem("lists")) {
    lists.map((lists) => {
      renderList(lists);
    });
}

button.addEventListener('click', createListHandler);
menu.addEventListener('click', filterList);
theme.addEventListener('click', changeTheme);
