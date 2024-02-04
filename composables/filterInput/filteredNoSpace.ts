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