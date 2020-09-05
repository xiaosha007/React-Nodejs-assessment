const express = require('express');
const fs = require('fs');
const formidable = require('express-formidable');
var uuid = require('uuid');
// express app
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(formidable());
app.listen(3000);
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


app.post('/wordCounts', function(req,res){
    fs.readFile(req.files.file.path, function(err, data){
        const fileData = data.toString();
        let textArray = fileData.split("\n");
        let result= {};
        let currentUser = null;
        for(let i=0;i<textArray.length;i++){
            let words = textArray[i].split(" ");
            let wordLength = words.length;
            if(words[0].startsWith("<") && words[0].endsWith(">")){
                currentUser = words[0].replace('<',"").replace(">","");
                wordLength--;
            }
            if(currentUser!=null){
                if(!(currentUser in result)){
                    result[currentUser] = 0;
                }
                result[currentUser]+=wordLength;
            }
        }
        finalResult = []
        for(let value in result)
            finalResult.push({user:value,wordCounts:result[value],id:uuid.v4()});
        finalResult.sort((a, b) => (b.wordCounts) - (a.wordCounts));
        res.status(200).json(finalResult);
    });
  });

// 404 page
app.use((req, res) => {
  res.status(404).json({ data: 'error',code:404 });
});
