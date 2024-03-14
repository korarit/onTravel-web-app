
/*
    แก้ไขรูปภาพโปรไฟล์
    @param LoginToken โทเคนที่ใช้ในการยืนยันตัวตน
    @param profile_img รูปภาพที่ต้องการแก้ไข
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