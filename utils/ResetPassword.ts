interface APIresult {
    success: boolean
}

/*
    ส่งข้อความ OTP ไปยังเบอร์โทรศัพท์ที่ผู้ใช้กรอกเข้ามา
    @param type ประเภทของ OTP ที่ต้องการส่ง (sms, email)

*/
export default async function (username:string, otp:string, otp_code:string, new_password:string){

    const runtimeConfig = useRuntimeConfig();

    //console.log('test', turnstileToken)
    try{
        const send_tobacked = await fetch(runtimeConfig.public.BACKEND_URL+"/authentication/forgotpassword", {   
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                type: "phone", 
                username: username, 
                otp: otp,
                otp_code: otp_code,
                new_password: new_password 
            })
        })
        if(send_tobacked.status === 200){
            let data_result = await send_tobacked.json()
            let result = data_result
            return result.success
        }else {
            return (await send_tobacked.text()).toLocaleLowerCase()
        }        
    }catch(err){
        console.log(err)
        return false
    }
}