import { translate } from '@vitalets/google-translate-api';

/*
    แปลภาษาจากภาษาอัตโนมัติ โดยใช้ google translate
    @param text ข้อความที่ต้องการแปล
    @param target ภาษาที่ต้องการแปลเป็น

    @return ข้อความแปลเป็นภาษาที่ต้องการ หากไม่สำเร็จจะ return null
*/
export default async function (textOriginal: string, target: string){

    //ถ้าเป็นภาษาไทย ให้ return ข้อความเดิม
    if(target === 'th'){
        return textOriginal
    }

    var text_url:string = encodeURI(textOriginal)

    //แปลภาษา
    try{
        const data:Response = await fetch('https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl='+target+'&dt=t&q='+text_url)
        if(data.status === 200){
            let data_result:any = await data.json()
            let result = data_result[0][0][0]
            return result
        }
    }catch(err: any){
        console.log(err)
        return null
    }
    
}