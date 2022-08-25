function checkForDate(inputText) {
    console.log("::: Running checkForDate :::", inputText);
    if (inputText == "") {
        alert("Please choose a departing date")
        return
    }

    let date_1 = new Date(inputText);
    let date_2 = new Date();
    if (date_1 < date_2) {
        alert("Please choose a date start from today!")
    }
}

export { checkForDate }