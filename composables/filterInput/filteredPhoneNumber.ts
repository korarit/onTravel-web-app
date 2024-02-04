export default function (event:any) {
    var inputValue = event.target.value;
    var filteredValue = "";

    var pattern = /[0-9]/;
    for (var i = 0; i < inputValue.length; i++) {
        if (pattern.test(inputValue[i]) && inputValue[i] != " ") {
            filteredValue += inputValue[i];
        }
    }

    event.target.value = filteredValue;
}