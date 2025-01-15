// resp.send means To show data on the screen
import express from 'express';
const app = express();

// app.get('/profile/:userName' , function(req ,res){
//     console.log(req.params);
//     res.send('Profile Page of '+ req.params.userName);
    
// })


app.get('/profile/:userName/article/:slug' , function(req ,res){
    console.log(req.params);
    const HIPHENIGNORE = req.params.slug.replace(/-/g, ' ');
    res.send('Profile Page of '+ req.params.userName + ' is EQULA to '  + HIPHENIGNORE);
    
})



app.listen(4000, () => {
    console.log('Server is running on port 3000');
})
