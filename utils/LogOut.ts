interface APIresult {
    success: boolean
}

/*
    ออกจากระบบ
    @param LoginToken โทเคนที่ใช้ในการยืนยันตัวตน
    @return ค่า APIresult หากสำเร็จ และ null หากไม่สำเร็จ

*/
export default async function (LoginToken: string){

    const runtimeConfig = useRuntimeConfig();

    const myHeaders:Headers = new Headers();
    myHeaders.append("Authorization", LoginToken);


    //console.log('test', turnstileToken)
    try{
        const data = await fetch(runtimeConfig.public.BACKEND_URL+'/authentication/logout',
        {   
            method: 'GET',
            headers: myHeaders
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