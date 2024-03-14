interface APIresult {
    success: boolean
}

/*
    แก้ไขข้อมูลผู้ใช้
    @param LoginToken โทเคนที่ใช้ในการยืนยันตัวตน
    @param key ชื่อข้อมูลที่ต้องการแก้ไข
    @param value ค่าที่ต้องการแก้ไข
    @return ค่า APIresult หากสำเร็จ และ null หากไม่สำเร็จ

*/
export default async function (LoginToken: string, key: string, value: string){

    const runtimeConfig = useRuntimeConfig();

    console.log('test', "Bearer "+LoginToken)

    //console.log('test', turnstileToken)
    try{
        const data = await fetch(runtimeConfig.public.BACKEND_URL+'/authentication/user',
        {   
            method: 'PUT',
            headers: {
                'Authorization': "Bearer "+LoginToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"data_key": key, "new_value": value})
        })
        if(data.status === 200){
            //ตรวจสอบว่ามีการส่งค่าที่เป็นคำหยาบกลับมาหรือไม่
            let data_result:any = data.json()
            //console.log('test 2',data_result)
            let result:APIresult = data_result

            return result
        }else{
            console.log(data.text())
            return data.text()
        }
    }catch(err: any){
        console.log(err.text())
        return null
    }
}