// emmiter means emit ko call krna ya signal produce krna 
const EventEmmiter = require('events')
const emmiter = new EventEmmiter(); 


const eventCount = {
    'user-login':0,
    'user-purchased':0,
    'profile-update':0,
    'user-logged':0
}
// if these event will triger then i will count++

emmiter.on('user-login' , (username ) =>{
    eventCount['user-login']++;
    console.log(`${username} logged in`);
})
emmiter.on('user-purchased' , (username , item)=>{
    eventCount['user-purchased']++;
    console.log(`${username} purchased ${item}`);
})
emmiter.on('profile-update' , (username , upd)=>{
    eventCount['profile-update']++;
    console.log(`${username} updated ${upd}`);
})

emmiter.on('profile-logut' , (username)=>{
    eventCount['user-logged']++;
    console.log(`logged out  ${username}`);
})

emmiter.emit('user-login' ,'thapa' )
emmiter.emit('user-purchased' , 'thapa' , 'MacBook');
emmiter.emit('profile-update' , 'thapa' , 'email');
emmiter.emit('profile-logut' , 'thapa' );


emmiter.on('example',()=>{
    console.log(eventCount);
})
// above event and arguments

emmiter.emit('example')