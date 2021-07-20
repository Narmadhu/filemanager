import React,{useState,useEffect} from 'react';
import "./FolderFile.css"
import FileTree from './FileTree/FileTree';
import ShowFile from "./ShowFile/ShowFile";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function FolderFile() {

  const [data, setData] = useState([])
  const [file, setFile] = useState([])
  const [folder, setFolder] = useState([])

  function getData(){

     fetch('Api.json'
     ,{
       headers : { 
         'Content-Type': 'application/json',
         'Accept': 'application/json'
        }
     }
     )
       .then(function(response){
         return response.json();
       })
       .then(function(myJson) {
         if(myJson)setData(myJson)
       });
   }

useEffect(()=>{
   getData()
},[])

const changeUpdateValue = (newValue) =>{
  const arr = file.map(obj=>[newValue].find(o=>o.id===obj.id) || obj)
  setFile(arr)
  // if (data) {
  //   const arr = data.map(obj=>[newValue].find(o=>o.id===obj.id) || obj)
  //   setData(arr)
  // }
 
}

const deleteFile = (newValue) =>{
  console.log(newValue);
  if(newValue.type==="file"){
    setFile(file.filter((filee) => filee.id !== newValue.id));
  }else{
    setFile([])
  }
}

  return (
    <Router>
    <div className="fileStructure" >
    <Switch>
      <Route path="/" exact render={()=><FileTree className="fileTree" data={data} setFile={setFile} setFolder={setFolder} />} />
      {/* <FileTree className="fileTree" data={data} setFile={setFile} setFolder={setFolder} /> */}
      <Route render={()=><ShowFile className="showFile" file={file} folder={folder} updatedFile={changeUpdateValue} deleteFile={deleteFile} />} />
      {/* <ShowFile className="showFile" file={file} folder={folder} updatedFile={changeUpdateValue} deleteFile={deleteFile} /> */}
    </Switch>
    </div>
    </Router>
  );
}

export default FolderFile;
