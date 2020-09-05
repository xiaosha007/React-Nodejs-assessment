import React,{useContext} from 'react';
import { FileContext } from '../context/FileContext';
import DragAndDrop from './DragAndDrop';
import axios from 'axios';


const Upload = () => {
    const {addFile,file,addResult}=useContext(FileContext);

    const uploadFile = () =>{
        if(file==null || !file.name.endsWith(".txt")){
            alert("Please upload a .txt file");
            return;
        }
        const formData = new FormData();
        formData.append('file', file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        axios.post('http://localhost:3000/wordCounts', formData,config).then(res => {
            console.log(res.data);
            addResult(res.data);
        })
    }

    return ( 
        <>
            <div style={{paddingLeft:'50px',paddingTop:'20px','width':250,height:300}}>
                <p style={{textAlign:'center'}}>Upload a log file (.txt)</p>
                <DragAndDrop handleDrop = {addFile}>  
                    <div style={{height: 300, width: 250,border: 'solid black 4px',textAlign:'center'}}>
                        {file===null?"Put your file here":file.name}
                    </div>
                    
                </DragAndDrop>
                <div  style={{textAlign:'center',paddingTop:'10px'}}>
                    <button  onClick={uploadFile}>Upload</button>
                </div>
            </div>
        </>
     );
}
 
export default Upload;