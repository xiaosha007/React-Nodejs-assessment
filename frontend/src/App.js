import React from 'react';
import FileContextProvider from './context/FileContext';
import Upload from './components/Upload'
import Result from './components/Result';

function App() {
  

  return (
    <div className="App">
      <FileContextProvider>
          <Upload/>
          <Result/>
      </FileContextProvider>
    </div>
  );
}

export default App;
