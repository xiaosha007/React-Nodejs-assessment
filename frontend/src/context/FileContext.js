import React,{useState,createContext} from 'react';
export const FileContext = createContext();


const FileContextProvider = (props) => {
    const [file,setFile] = useState(null);
    const [result,setResult] = useState([]);
    const addResult = (result)=>{
        setResult(()=>{
            return result;
        });
    }
    const addFile= (file)=>{
        setFile(()=>{
            return file;
        });
    }
    const deleteFile = ()=>{
        setFile(()=>{
            return null;
        });
    }
    return ( 
        <FileContext.Provider value={{file,addFile,deleteFile,result,addResult}}>
            {props.children}
        </FileContext.Provider>
     );
}
 
export default FileContextProvider;