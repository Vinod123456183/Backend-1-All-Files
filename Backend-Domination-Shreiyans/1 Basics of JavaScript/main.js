// let b = [1 , 2 , 3 , 4]
// let d = b; // here refernce copy hua h
// console.log(d);
// d.pop();
// console.log(d);
// console.log(b);






// let d = [1 , 2 , 3 , 4]
// let b = [...d] // copy ese krte h , [ ] called spread operator
// console.log(b);
// console.log(d);
// d.pop();
// console.log(d);
// console.log(b);



// let a = {x: 1 , y: 2}
// let b = a;
// b.x = 10;
// console.log(b);
// console.log(a);





let a = {x: 1 , y: 2}
let b = {...a} // copy ese krte h , [ ] called spread operator
console.log(a);
b.x = 10;
console.log(b);



// we can copy primitive data type by but for copying reference
// we have to use spread operator



// in javascript we can directly set value like xx = 5 but it is not good practice
// so we use let or const to declare variable



// 0 , null , undefined , NaN , null , document.all , false , "" , '' , `` , these are falsy value
// so while oring these value with any value it will return that value

// console.log(( "0" || 5));
// 0 is falsy value  but here it is in string so it will return "0" as string




console.log(1 && 2);


// for , while , foreach , do while ,  foin , these are loop in javascript

// foreach loop use krne k liye array hona chahiye

// let arr = [10,20,30,40,50];
// arr.forEach((item , i)=>{
//     console.log(item + 10 , i);    
// })


// we use forin loops in objects

const obj = {
    name: "sahil",
    age: 20,
    city: "delhi" 
}
for(const value in obj){
    console.log(value , obj[value]);
}



// 0 , null , undefined , NaN , null , document.all , false , "" , '' , `` , these are falsy value
// so y sare value if else condition me in false me chale jayenge


// console.log(5 === "5");


function F(){
    // function statement
}

function(){
    // anaonymous function
}

()=>{
    // fat arrow function
}

a =>{
    // aagar single value lete h tph we can remove ()  
    // fat arrow function with one parameter
}

()=>{
    // fat arrow function with return
    return 5;
}

()=> 5; 
// fat arrow function with return
// but dont use {}
