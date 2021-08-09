const inputContainer = document.querySelector('.body-container');
const input = document.querySelector('input');
const button = document.querySelector('[type = submit]');
const menu = document.querySelector('.menu');
const lists = JSON.parse(localStorage.getItem('lists')) || [];
const theme = document.querySelector('.change-theme');

const changeTheme = () => {

    const body = document.querySelector('body');

    body.classList.toggle('theme2');
    // console.log('click');
};

const createListHandler = (e) => {

    e.preventDefault();
    // console.log(true);

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
        updateLists();

        
    });

    
    // console.log(lists);

};

const updateLists = () => {

    
    const input = inputContainer.children;
    
    let inputIndex = 0;

    //* this is want to loop enitre list to find element with active class
    //* and if its contains active, it isActive = true else = false
    for (const listEl of input) {

        if (listEl.classList.contains('active')) {
            lists[inputIndex].isActive = true;
            
            localStorage.setItem('lists' , JSON.stringify(lists));
            
        } else {
            lists[inputIndex].isActive = false;
            localStorage.setItem('lists' , JSON.stringify(lists));
            
        }
        inputIndex++;
    }
    
    
};


const deleteList = (e) => {

    //? for future ashraf, if u see id is null in dev tool ignore it
    //? your code is working, and you dont know how to fix it rn

    const input = inputContainer.children;
    const item = e.target;
    const inputList = item.previousElementSibling.id;
    // console.log(item);

    if (item.matches('.fa-trash-alt')) {

        let inputIndex = 0;
        
        for (const list of input) {
            
            //* this is want to target id on second child
            const listId = list.children[1].id;

            if (listId == inputList) {

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
    // console.log(filter);
    for (const list of input) {
        
        //* this is for filter lists
        switch (filter) {
            case 'all':
                list.style.display = 'grid';
                break;

            case 'active':
                if (!list.classList.contains('active')){
                    
                    list.style.display = 'grid';
                } else {

                    list.style.display = 'none';
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

//* this is want to load lists from the local storage
if (localStorage.getItem("lists")) {
    lists.map((lists) => {
      renderList(lists);
    });
}

button.addEventListener('click', createListHandler);
menu.addEventListener('click', filterList);
theme.addEventListener('click', changeTheme);
inputContainer.addEventListener('click', deleteList);