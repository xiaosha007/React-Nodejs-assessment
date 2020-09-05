const express = require('express');
const fs = require('fs');
const formidable = require('express-formidable');
var uuid = require('uuid');
// express app
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(formidable());
app.listen(3000);

// allow the origin to pass through cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//to calculate wordCounts of each user in a chat log
app.post('/wordCounts', function(req,res){
    // read the file
    fs.readFile(req.files.file.path, function(err, data){
        const fileData = data.toString();
        // split it into sentence
        let textArray = fileData.split("\n");
        let result= {};
        let currentUser = null;
        for(let i=0;i<textArray.length;i++){
            // spread each words from sentence
            let words = textArray[i].split(" ");
            let wordLength = words.length;
            // check who is the current user chatting
            if(words[0].startsWith("<") && words[0].endsWith(">")){
                currentUser = words[0].replace('<',"").replace(">","");
                wordLength--;
            }
            if(currentUser!=null){
                // if the user hasn't been adding into the result dictionary
                if(!(currentUser in result)){
                    result[currentUser] = 0;
                }
                // update the word count
                result[currentUser]+=wordLength;
            }
        }
        //convert the result into proper format that is passing to front end for display
        finalResult = []
        for(let value in result)
            finalResult.push({user:value,wordCounts:result[value],id:uuid.v4()});
        res.status(200).json(finalResult);
    });
  });

// 404 response
app.use((req, res) => {
  res.status(404).json({ data: 'error',code:404 });
});
