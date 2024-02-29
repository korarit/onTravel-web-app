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
export default async function (LoginToken: string, profile_img: Blob){

    const runtimeConfig = useRuntimeConfig();

    const register_data: FormData = new FormData();
    register_data.append('image', profile_img);

    console.log('test', LoginToken)
    try{
        const send_tobacked = await fetch(runtimeConfig.public.BACKEND_URL+'/authentication/user/edit_img',
        {   
            method: 'PUT',
            headers: {
                'Authorization': "Bearer "+LoginToken
            },
            body: register_data
        });
        if(send_tobacked.status === 200){
            let data_result = await send_tobacked.json()
            //console.log('test 2',data_result)
            let result = data_result

            //console.log(result)
            return result
        }else {
            console.log(send_tobacked.text())
            return null
        }
    }catch(err){
        return null
    }
}