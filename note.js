let Input = document.querySelector('.container1 input');
let Table = document.querySelector('.container2 table');

let allTR;
let localStorageItems;
let localStorageKeys;
let localStorageValues;
let noteItems;
let heartItems;

window.addEventListener('beforeunload', (e) => {
    deleteFilteredItems('noteItem');
    deleteFilteredItems('heartNote');
    allTR = Array.from(document.querySelectorAll('table tr'));
    if(allTR.length > 0) {
        allTR.forEach((item, index) => {
            localStorage.setItem(`noteItem${index+1}`, item.innerText)
            if(item.childNodes[0].childNodes[0].src.includes('regular')) {
                localStorage.setItem(`heartNote${index+1}`, 'heart-regular.svg');
            }
            else {
                localStorage.setItem(`heartNote${index+1}`, 'heart-solid.svg');
            }
        });
    }
})

window.addEventListener('load', function() {
    filterItems();
    noteItems.forEach((item, index) => {
        let newTableRow = document.createElement('tr');

        let heartTableData = document.createElement('td');
        let newTableData = document.createElement('td');
        let newTableData1 = document.createElement('td');
        let newTableData2 = document.createElement('td');
        let newTableData3 = document.createElement('td');
    
        let heartImg = document.createElement('img');
        let Img1 = document.createElement('img');
        let Img2 = document.createElement('img');
        let Img3 = document.createElement('img');
    
        newTableData.innerHTML = item[1]
    
        heartImg.src = heartItems[index][1];
        heartItems[index][1] == 'heart-regular.svg' ? heartImg.classList.add('buttons', 'heart0') : heartImg.classList.add('buttons', 'heart1');

        Img1.src = 'check-circle-regular.svg';
        Img2.src = 'edit-regular.svg';
        Img3.src = 'times-circle-regular.svg';
    
        Img1.classList.add('buttons', 'update');
        Img2.classList.add('buttons', 'edit');
        Img3.classList.add('buttons', 'delete');
    
        heartTableData.classList.add('tableButtons');
        newTableData1.classList.add('tableButtons');
        newTableData2.classList.add('tableButtons');
        newTableData3.classList.add('tableButtons');
    
        heartTableData.appendChild(heartImg);
        newTableData1.appendChild(Img1);
        newTableData2.appendChild(Img2);
        newTableData3.appendChild(Img3);
    
        newTableRow.appendChild(heartTableData);
        newTableRow.appendChild(newTableData);
        newTableRow.appendChild(newTableData1);
        newTableRow.appendChild(newTableData2);
        newTableRow.appendChild(newTableData3);
    
        Table.appendChild(newTableRow);
    });
});

Input.addEventListener('keydown', function(e) {
    if(e.keyCode === 13) {
        addNewNote();
    }
});

document.querySelector('.container1 button').addEventListener('click', addNewNote);


function addNewNote() {
    if(Input.value.replace(/\s/g, '').length > 0) {
        let newTableRow = document.createElement('tr');

        let heartTableData = document.createElement('td');
        let newTableData = document.createElement('td');
        let newTableData1 = document.createElement('td');
        let newTableData2 = document.createElement('td');
        let newTableData3 = document.createElement('td');

        let heartImg = document.createElement('img');
        let Img1 = document.createElement('img');
        let Img2 = document.createElement('img');
        let Img3 = document.createElement('img');

        newTableData.innerHTML = Input.value;

        heartImg.src = 'heart-regular.svg';
        Img1.src = 'check-circle-regular.svg';
        Img2.src = 'edit-regular.svg';
        Img3.src = 'times-circle-regular.svg';

        heartImg.classList.add('buttons', 'heart0');
        Img1.classList.add('buttons', 'update');
        Img2.classList.add('buttons', 'edit');
        Img3.classList.add('buttons', 'delete');

        heartTableData.classList.add('tableButtons');
        newTableData1.classList.add('tableButtons');
        newTableData2.classList.add('tableButtons');
        newTableData3.classList.add('tableButtons');

        heartTableData.appendChild(heartImg);
        newTableData1.appendChild(Img1);
        newTableData2.appendChild(Img2);
        newTableData3.appendChild(Img3);

        newTableRow.appendChild(heartTableData);
        newTableRow.appendChild(newTableData);
        newTableRow.appendChild(newTableData1);
        newTableRow.appendChild(newTableData2);
        newTableRow.appendChild(newTableData3);

        Table.appendChild(newTableRow);

        Input.value = '';
        Input.focus();
    }
    else {
        Input.value = '';
        Input.focus();
    }
}

Table.addEventListener('click', function(e) {
    let shouldBeTR = e.target.parentElement.parentElement;
    switch(e.target.classList.value) {
        case 'buttons heart0':
            e.target.classList.replace('heart0', 'heart1');
            e.target.src = 'heart-solid.svg';
            break;
        case 'buttons heart1':
            e.target.classList.replace('heart1', 'heart0');
            e.target.src = 'heart-regular.svg';
            break;
        case 'buttons update':
            shouldBeTR.childNodes[3].childNodes[0].style.display = 'block';
            shouldBeTR.childNodes[2].childNodes[0].style.display = 'none';

            let string1 = shouldBeTR.childNodes[1].value;
            let newTD = document.createElement('td');
            shouldBeTR.replaceChild(newTD, shouldBeTR.childNodes[1]);
            newTD.innerHTML = string1;

            Input.focus();
            break;
        case 'buttons edit':
            shouldBeTR.childNodes[2].childNodes[0].style.display = 'block';
            shouldBeTR.childNodes[3].childNodes[0].style.display = 'none';

            let string2 = shouldBeTR.childNodes[1].innerText;
            let newInput = document.createElement('input');
            newInput.classList.add('editInput')
            shouldBeTR.replaceChild(newInput, shouldBeTR.childNodes[1]);
            newInput.value = string2;

            newInput.focus();

            break;
        case 'buttons delete':
            let string3 = shouldBeTR.childNodes[1].innerText;
            Table.removeChild(shouldBeTR);

            break;
    }
});

document.querySelector('.clear').addEventListener('click', function() {
    deleteFilteredItems('noteItem');
    deleteFilteredItems('heartNote');
    Table.innerHTML = '';
});

function filterNumber(string) {
    let stringArray = string.split('');
    let filteredArray = stringArray.filter(item => item == 0 || item == 1 || item == 2 || item == 3 || item == 4 || item == 5 || item == 6 || item == 7 || item == 8 || item == 9);
    return filteredArray.join('');
}

function filterItems() {
    localStorageItems = {...localStorage};
    localStorageKeys = Object.keys(localStorageItems);
    localStorageValues = Object.values(localStorageItems);
    noteItems = [];
    heartItems = [];

    for(let i = 0; i < localStorageKeys.length; i++) {
        if(localStorageKeys[i].includes('noteItem')) {
            let newArray = [filterNumber(localStorageKeys[i]), localStorageValues[i]];
            noteItems.push(newArray);
        }
        else if(localStorageKeys[i].includes('heartNote')) {
            let newArray = [filterNumber(localStorageKeys[i]), localStorageValues[i]];
            heartItems.push(newArray);
        }
    }
    noteItems.sort((item1, item2) => Number(item1[0]) > Number(item2[0]) ? 1 : -1);
    heartItems.sort((item1, item2) => Number(item1[0]) > Number(item2[0]) ? 1 : -1);
}

function deleteFilteredItems(params) {
    localStorageItems = {...localStorage};
    localStorageKeys = Object.keys(localStorageItems);
    localStorageValues = Object.values(localStorageItems);
    noteItems = []

    for(let i = 0; i < localStorageKeys.length; i++) {
        if(localStorageKeys[i].includes(params)) {
            let newArray = [localStorageKeys[i], localStorageValues[i]];
            noteItems.push(newArray);
        }
    }
    noteItems.forEach(item => localStorage.removeItem(item[0]))
}