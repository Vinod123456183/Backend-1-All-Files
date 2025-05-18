    const express = require('express');
    const app = express();
    const path = require('path');
    const fs = require('fs');


    app.set('view engine', 'ejs');
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static(path.join(__dirname, 'public')));



    // Create
    app.get('/create',(req,res)=>{

        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const year = currentDate.getFullYear();
        const fullDate = `${day}-${month}-${year}`;

        fs.writeFile(`files/${fullDate}.txt` , " Dynamic Content"  , (e)=>{
            if(e){
                console.log("Error")
            }else{
                console.log("File Created Succesfully");
            }
        })
        res.redirect('/')
    })



    // show
    app.get('/', (req, res) => {
        fs.readdir('./files', (err, files) => {
            if (err) {
                console.log("Error reading directory:", err); 
            } else {
                console.log(files);
            }
            res.render('index' , {files:files}); 
        });
    });
    
    
    
    
    
    // Read , _id  ki jagan kuch bhi naam ho skta h 
    app.get('/read/:_id', (req, res) => {    
        const fileName = req.params._id; 
        const filePath = path.join(__dirname, 'files', fileName);
        // console.log(fileName);
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.log("Error reading file:", err);
                return res.status(404).send("File not found");
            }
            res.render('read', { fileName , data }); 
        });
    });
    


    // Delete file route
    app.get('/delete/:fileName', (req, res) => {

        const fileName = req.params.fileName; 
        const filePath = path.join(__dirname, 'files', fileName);

        fs.unlink(filePath, (err) => {
            if (err) {
                console.log("Error deleting file:", err);
                return res.status(500).send("Error deleting file");
            }

            console.log(`File ${fileName} deleted successfully.`);
            res.redirect('/'); 
        });
    });




    app.listen(3000, () => {
        console.log('Server is running on port',3000);
    });
