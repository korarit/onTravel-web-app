
type categoriesAnalysisType = {
    category:string
    severity:number
}

type AzureTextModerationType = {
    blocklistsMatch:string[]
    categoriesAnalysis:categoriesAnalysisType[]
}
/*
    ตรวจสอบความปลอดภัยของข้อความที่ผู้ใช้งานกรอกเข้ามา
    โดยจะตรวจสอบจาก Azure Text Analytics
    @param textContent ข้อความที่ต้องการตรวจสอบ
    @return ค่า true หากข้อความปลอดภัย และ false หากข้อความไม่ปลอดภัย เป็นคำหยาบ
*/
export default async function (textContent: string[], turnstileToken: string){
    const runtimeConfig = useRuntimeConfig();

    console.log(turnstileToken)
    try{
        const {data: check_result, pending: pending_data, error: error_data, refresh} = await useFetch(runtimeConfig.public.BACKEND_URL+'/contentSafety/text',
        {   
            method: 'POST',
            body: JSON.stringify({input: textContent})
        })
        if(pending_data.value === false ){
            //ตรวจสอบว่ามีการส่งค่าที่เป็นคำหยาบกลับมาหรือไม่
            let data_result:any = check_result.value
            console.log(data_result)
            let list_data:AzureTextModerationType[] = data_result

            var bad_input:boolean[] = []
            for (let item in list_data){
                let status:boolean|null = null
                for(let i in list_data[item].categoriesAnalysis){
                    if(list_data[item].categoriesAnalysis[i].severity > 1){
                         status = false
                    }
                }
                if(status === false){
                    bad_input.push(false)
                }else{
                    bad_input.push(true)
                }
            }
            console.log(bad_input)
            return bad_input
        }
    }catch(err){
        console.log(err)
        return null
    }
}