import th from '~/assets/language/th.json'
import en from '~/assets/language/en.json'
import zh from '~/assets/language/zh.json'
/*

*/
export default async function (language: string){   
    if(language === 'th'){
        return th
    }else if(language === 'en'){
        return en
    }else if(language === 'zh'){
        return zh
    }else{
        return th
    }
}