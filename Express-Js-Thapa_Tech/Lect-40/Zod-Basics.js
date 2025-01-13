import {z} from 'zod'
// export const Port = isNaN( process.env.PORT ) ? 3200 : process.env.PORT;


const ageScemaForVote = z.number().min(18).max(100).int();
const useAge = 22;

//given function name k saath parse krna hota h shortcut parse menas paar 
const ans = ageScemaForVote.parse(useAge); 
console.log(ans); // 2
// we can also use try catch block to handle the error or to print the error
