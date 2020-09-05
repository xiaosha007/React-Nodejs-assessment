import React,{useContext} from 'react';
import { FileContext } from '../context/FileContext';


const Result = () => {
    const {result}=useContext(FileContext);
    return ( 
        <div style={{float:'right',height: 300, width: 250,
        border: 'solid orange 4px',textAlign:'center',
        position:'absolute',left:400,top:70}}>
            <p>
                Result
            </p>
                {result.length===0?<p>No result</p>:(result.map((data)=>{
                    return <p key={data.id}>{data.user + " : " + data.wordCounts + " words"}</p>
                }))}
        </div>
     );
}
 
export default Result;