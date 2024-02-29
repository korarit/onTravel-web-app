interface APIresult {
    OTPCode: string
    NowTime: number
    ExpireTime: number
}

/*
    ส่งข้อความ OTP ไปยังเบอร์โทรศัพท์ที่ผู้ใช้กรอกเข้ามา
    @param type ประเภทของ OTP ที่ต้องการส่ง (sms, email)
    @param receiver เบอร์โทรศัพท์ที่ต้องการส่ง OTP
    @param use_for วัตถุประสงค์ที่ต้องการใช้ OTP
    @param turnstileToken โทเคนของ Turnstile
    @return ค่า APIresult หากสำเร็จ และ null หากไม่สำเร็จ

*/
export default async function (type: string,receiver: string, use_for: string, turnstileToken: string){

    const runtimeConfig = useRuntimeConfig();

    //console.log('test', turnstileToken)
    try{
        const {data: check_result, pending: pending_data, error: error_data, refresh} = await useFetch(runtimeConfig.public.BACKEND_URL+'/security/otp',
        {   
            method: 'POST',
            headers: {
                'Turnstile-Token': `${turnstileToken}`
            },
            body: JSON.stringify({type: type, receiver: receiver, use_for: use_for})
        })
        if(pending_data.value === false && error_data.value === null){
            //ตรวจสอบว่ามีการส่งค่าที่เป็นคำหยาบกลับมาหรือไม่
            let data_result:any = check_result.value
            console.log('test 2',data_result)
            let result:APIresult = data_result

            return result
        }else if(error_data.value !== null){
            console.log(error_data)
            return error_data
        }
    }catch(err){
        console.log(err)
        return null
    }
}