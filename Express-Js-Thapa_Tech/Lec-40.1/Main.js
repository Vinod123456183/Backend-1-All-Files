import {z , ZodError} from 'zod'
import {Port} from '.env.js';   

const userAge = z.number().min(18).max(100).int();
const personAge = 19;

try {
    const ans = userAge.parse(personAge);
    console.log(ans);
    } catch (e) {
    if(e instanceof ZodError){
        console.log(e.issues[0].message);   
    }else{
        console.log('Unexpected Error',e);    
    }
}

// or we can use safeParse method to handle the error
