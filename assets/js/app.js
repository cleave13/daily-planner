//variables
const textInputEls = $( 'input' );
const saveBtnEl = $( '.fa-save' );
const tableRowEls = $('tr');
let savedEntries = [];

console.log(tableRowEls);
//functions

function saveInput(event) {
    const target = $( event.target );
    const itemTime = $(target).parent().children().eq(0).text();
    const itemInput = $(target).prev().children().eq(0).val();
    const itemIndex = savedEntries.findIndex(item => item.time === itemTime);

    const calendarItem = {
        time: itemTime,
        input: itemInput
    };

    if(itemIndex === -1) {
        savedEntries.push(calendarItem);
    } else {
        savedEntries.splice(itemIndex, 1, calendarItem);  
    }

    localStorage.setItem('calendarItems', JSON.stringify(savedEntries));
}

function init() {
    const storedCalItems = JSON.parse(localStorage.getItem('calendarItems'));
    if (storedCalItems !== null) {
        savedEntries = storedCalItems;
        for (let i = 0; i < tableRowEls.length; i++) {
            const tableRow = tableRowEls[i];
            const rowInput = $(tableRow).children().eq(1).children().eq(0);
            for (let j = 0; j < savedEntries.length; j++) {
                const savedEntry = savedEntries[j];
                if ($(tableRow).children().eq(0).text() === savedEntry.time) {
                    rowInput.val(savedEntry.input);
                    break;
                }
            }
            
        }
    }
    return;
}

//special functions
saveBtnEl.click(saveInput);


//logic
init();