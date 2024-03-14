interface APIresult {
    success: boolean
}

/*
    ลืมรหัสผ่าน
    @param username ชื่อผู้ใช้
    @param otp รหัส OTP
    @param otp_code รหัส OTP code
    @param new_password รหัสผ่านใหม่
    @return ค่า APIresult หากสำเร็จ และ null หากไม่สำเร็จ

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