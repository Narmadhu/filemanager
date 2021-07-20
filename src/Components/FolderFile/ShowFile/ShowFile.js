import React,{useState} from 'react';
import "./ShowFile.css"
import DeleteIcon from "@material-ui/icons/Delete";
import Info from "../Icons/Info";
import Edit from "../Icons/Edit";
import Delete from "../Icons/Delete";

function ShowFile(props) {

  console.log(props);

  const Files = props.file.map((files)=>(
    <tbody key={files.id}>
    <tr>
    {/* <input type="checkbox" name="" id="" onClick={()=>getSeletedFiles(files)} /> */}
    <td>{files.name}</td>
    <td>{files.type}</td>
    <td><Info file={files} /></td>
    <td><Edit file={files} updatedFile={props.updatedFile} /></td>
    <td><Delete file={files} deleteFile={props.deleteFile} /></td>
  </tr> 
  </tbody>
  ))

  const deletFolder = ()=>{}

  return (
    <div>
      <div className="folder-grid" >
        {console.log(props.file)}
      {props.folder.name ? <h2> { props.folder.name} <DeleteIcon onClick={()=>props.deleteFile(props.file)} /> </h2> : <h2>File</h2> }
      </div>
    <table>
    <thead>
    <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Info</th>
        <th>Edit</th>
        <th>Delete</th>
     </tr>
     </thead>
     {Files.length ? Files : <h5 className="noFiles">No Files</h5>}
      {/* {files.name} */}
      </table>
    </div>
  );
}

export default ShowFile;

