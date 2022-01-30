//VARIABLES

//Declare all variables from DOM and local storage elements using jQuery.
const textInputEls = $('input');
const saveBtnEl = $('.fa-save');
const tableRowEls = $('tr');
const tableInputEls = $('input');
let savedEntries = [];

//FUNCTIONS

//Initializes the application
function init() {
    //retrieves all stored calendar items in local storage and assigns to a variable.
    const storedCalItems = JSON.parse(localStorage.getItem('calendarItems'));

    //Protects against assignment of null value to items in the loop
    if (storedCalItems !== null) {
        savedEntries = storedCalItems; 
        //loop through all of the table rows defined in the HTML table
        for (let i = 0; i < tableRowEls.length; i++) {
            const tableRow = tableRowEls[i];
            const rowInput = $(tableRow).children().eq(1).children().eq(0);
            //loop through all of the saved entries from local storage.
            for (let j = 0; j < savedEntries.length; j++) {
                const savedEntry = savedEntries[j];
                // If the content of the row's first element (th) equals the key from the object in local storage, populate the text input with the value of the input property in local storage.
                if ($(tableRow).children().eq(0).text() === savedEntry.time) {
                    rowInput.val(savedEntry.input);
                    break; // break the loop to avoid unnecessary iterations.
                }
            }

        }
    }
    styleRows();
    return;
};

//Applies CSS classes depending on whether the row is in the past, present or future.
function styleRows() {
    //Uses the moment.js library to initialize a variable with the current hour for comparison against the HTML table's rows.
    const currentHour = parseInt(moment().format("H"));

    //loops all table input elements and applies certain CSS classes based on the conditionals
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

//Stores the text from one of the input fields to local storage.
function saveInput(event) {
    //Assign DOM elements to variables using jQuery based on the save button that was clicked.
    const target = $(event.target);
    const itemTime = $(target).parent().children().eq(0).text();
    const itemInput = $(target).prev().children().eq(0).val();
    //Retrieves the index of the item where the time element matches the table row's header.
    const itemIndex = savedEntries.findIndex(item => item.time === itemTime);

    //Creates a new object with the function variables.
    const calendarItem = {
        time: itemTime,
        input: itemInput
    };

    //If an entry for that row doesn't exist in local storage, the new object is pushed to the end of the local storage array. Else the existing value is replaced. 
    if (itemIndex === -1) {
        savedEntries.push(calendarItem);
    } else {
        savedEntries.splice(itemIndex, 1, calendarItem);
    }

    localStorage.setItem('calendarItems', JSON.stringify(savedEntries));
};

//EVENT LISTENERS
saveBtnEl.click(saveInput);


//LOGIC
init();