interface APIresult {
    success: boolean
    Message: string
    name: string
    last_name: string
    profile_img: number
}

/*
    ส่งข้อความ OTP ไปยังเบอร์โทรศัพท์ที่ผู้ใช้กรอกเข้ามา
    @param type ประเภทของ OTP ที่ต้องการส่ง (sms, email)
    @param receiver เบอร์โทรศัพท์ที่ต้องการส่ง OTP
    @param use_for วัตถุประสงค์ที่ต้องการใช้ OTP
    @param turnstileToken โทเคนของ Turnstile
    @return ค่า APIresult หากสำเร็จ และ null หากไม่สำเร็จ

*/
export default async function (data: any){

    const runtimeConfig = useRuntimeConfig();

    const register_data: FormData = new FormData();
    register_data.append('username', data.username );
    register_data.append('name', data.name );
    register_data.append('last_name', data.last_name );
    register_data.append('province', data.province );
    register_data.append('phone_number', data.phone_number);
    register_data.append('email', data.email);
    register_data.append('password', data.password );
    register_data.append('interests', data.interests);
    register_data.append('otp', data.otp );
    register_data.append('otp_code', data.otp_code );
    register_data.append('profile_img', data.profile_img as blob);

    //console.log('test', turnstileToken)
    const request = {
        method: "POST",
        body: register_data,
        redirect: "manual"
    };
    try{
        const send_tobacked = await fetch("http://localhost:5000/authentication/register_user", request)
        if(send_tobacked.status === 200){
            //ตรวจสอบว่ามีการส่งค่าที่เป็นคำหยาบกลับมาหรือไม่
            let data_result = await send_tobacked.json()
            //console.log('test 2',data_result)
            let result = data_result

            console.log(result)
            return result
        }else {
            console.log(send_tobacked.text())
            return null
        }
    }catch(err){
        console.log(err)
        return null
    }
}