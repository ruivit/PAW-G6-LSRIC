function updatedValue() {
    // Find which input is being updated
    var activeInput = document.activeElement.name;

    // Change the text color to orange only if the value is updated		
    var inputText = document.getElementsByName(activeInput);
    inputText[0].style.color = "orange";
}