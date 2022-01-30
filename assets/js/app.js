//variables

const textInputEls = $('input');
const saveBtnEl = $('.fa-save');
const tableRowEls = $('tr');
const tableInputEls = $('input');
let savedEntries = [];

//functions

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
    styleRows();
    return;
};

function styleRows() {
    const currentHour = parseInt(moment().format("H"));
    for (let i = 0; i < tableInputEls.length; i++) {
        const inputRow = tableInputEls[i];
        const inputHour = parseInt($(inputRow).attr('data-hour'));
        console.log(inputHour);
        if (inputHour === currentHour) {
            $(inputRow).addClass('present');
        } else if (inputHour < currentHour) {
            $(inputRow).addClass('past');
        } else {
            $(inputRow).addClass('future');
        }
    }
};

function saveInput(event) {
    const target = $(event.target);
    const itemTime = $(target).parent().children().eq(0).text();
    const itemInput = $(target).prev().children().eq(0).val();
    const itemIndex = savedEntries.findIndex(item => item.time === itemTime);

    const calendarItem = {
        time: itemTime,
        input: itemInput
    };

    if (itemIndex === -1) {
        savedEntries.push(calendarItem);
    } else {
        savedEntries.splice(itemIndex, 1, calendarItem);
    }

    localStorage.setItem('calendarItems', JSON.stringify(savedEntries));
};

//special functions
saveBtnEl.click(saveInput);


//logic
init();