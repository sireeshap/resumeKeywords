const express = require('express');
const uploadFiles = require('./scripts/upload-files/upload-files')
const parseResumes= require('./scripts/upload-files/resume-parser')
const fs = require('fs');
const app = express ();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
  });
  
app.get('/', (request, response) => {
    const status = {
       'Status': 'Running'
    };
    
    response.send(status);
 });
 app.post('/upload', uploadFiles,(req, res)=>{
    // Handle the uploaded files
  const files = req.files;
  console.log(req.files)

  // Process and store the files as required
  // For example, save the files to a specific directory using fs module
  files.forEach((file) => {
    const filePath = `uploads/${file.filename}`;
    fs.rename(file.path, filePath, (err) => {
      if (err) {
        // Handle error appropriately and send an error response
        return res.status(500).json({ error: 'Failed to store the file' });
      }
      else{
        console.log("PATH:"+file.path)
        parseResumes(file.path).then(data=>{
          console.log(data);
          if(data){
          res.status(200).json(
            {'in_strCountry':'India',
            'in_strCriteria_Type':'Keyword',
            'in_strInput_Criteria':data.join(',')
          });
        }
        else{
          res.status(200).json("Failed");
        }
            
        })
        
      }
    });
  });
    
  // Send an appropriate response to the client
  
 });