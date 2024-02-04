/*
    This function is used to filter out all the spaces from the input value
    It takes in an event and returns the filtered value
    It is used to filter out spaces from the input value
    @param event: Event - The event that is being passed in
    @returns void
*/
export default function (event:any) {
    var inputValue:string = event.target.value;
    var filteredValue:string = "";
    for (var i = 0; i < inputValue.length; i++) {
            if (inputValue[i] != " ") {
            filteredValue += inputValue[i];
        }
    }

     event.target.value = filteredValue;
}