// Event means = > onClick , onchange , onsubmit
// do always
const EventEmmiter = require('events')
const emmiter = new EventEmmiter(); 

// greet is an event
// define an event listner 
// emmiter.on('greet' , ()=>{
//     console.log('Hello Vinod');
    
// })
// emmiter.emit('greet')



// runtime
// emmiter.on('greet' , (userName , WEbDev)=>{
//     console.log(`name is ${userName} , profession is ${WEbDev} `);
// })
// emmiter.emit('greet' , 'MrVinod' , 'WEbDev')




// More better method by using single argument 
emmiter.on('greet', (data) => {
    console.log(`name is ${data.userName}, profession is ${data.WEbDev}`);
});
// Emit event with an object
emmiter.emit('greet', { userName: 'MrVinod', WEbDev: 'Ai' });
