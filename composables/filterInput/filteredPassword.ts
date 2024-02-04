type type_check_password = {
    more_8:boolean,
    number:boolean,
    lowercase:boolean,
    uppercase:boolean,
    special:boolean

}
export default function (inputElement:any , check_password:type_check_password) {
    var inputValue:string = inputElement.target.value;
    var pattern:any = /^[A-Za-z0-9!@#$%^&*+?]+$/;

    var filteredValue:any = "";
    for (var i = 0; i < inputValue.length; i++) {
        if (pattern.test(inputValue[i])) {
        filteredValue += inputValue[i];
        }
    }

    inputElement.target.value = filteredValue;

    //เช็คความยาว
    if(inputElement.target.value.length >= 8){
        //เปลี่ยนค่าใน check_password
        check_password.more_8 = true;
    }else{
        //เปลี่ยนค่าใน check_password
        check_password.more_8 = false;

    }

    //เช็คตัวเลข
    var pattern_num = /[0-9]/;
    if(pattern_num.test(inputElement.target.value)){
        //เปลี่ยนค่าใน check_password
        check_password.number = true;
    }else{
        //เปลี่ยนค่าใน check_password
        check_password.number = false;
    }


    //เช็คตัวพิมพ์เล็ก
    var pattern_lower = /[a-z]/;
    if(pattern_lower.test(inputElement.target.value)){
        //เปลี่ยนค่าใน check_password
        check_password.lowercase = true;
    }else{
        //เปลี่ยนค่าใน check_password
        check_password.lowercase = false;
    }

    //เช็คตัวพิมพ์ใหญ่
    var pattern_upper = /[A-Z]/;
    if(pattern_upper.test(inputElement.target.value)){
        //เปลี่ยนค่าใน check_password
        check_password.uppercase = true;
    }else{
        //เปลี่ยนค่าใน check_password
        check_password.uppercase = false;
    }

    //เช็คอักขระพิเศษ
    var pattern_spacial = /[!@#$%^&*+?]/;
    if(pattern_spacial.test(inputElement.target.value)){
        //เปลี่ยนค่าใน check_password
        check_password.special = true;
    }else{
        //เปลี่ยนค่าใน check_password
        check_password.special = false;
    }
}