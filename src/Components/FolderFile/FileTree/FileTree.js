import React,{useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import Label from '@material-ui/icons/Label';
import Folder from "@material-ui/icons/Folder";
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import InfoIcon from '@material-ui/icons/Info';
import ForumIcon from '@material-ui/icons/Forum';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { Link } from "react-router-dom";
import "./FileTree.css"

// function FileTree() {

  const useTreeItemStyles = makeStyles((theme) => ({
    root: {
      color: theme.palette.text.secondary,
      '&:hover > $content': {
        backgroundColor: theme.palette.action.hover,
      },
      '&:focus > $content, &$selected > $content': {
        backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
        color: 'var(--tree-view-color)',
      },
      '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
        backgroundColor: 'transparent',
      },
    },
    content: {
      color: theme.palette.text.secondary,
      borderTopRightRadius: theme.spacing(2),
      borderBottomRightRadius: theme.spacing(2),
      paddingRight: theme.spacing(1),
      fontWeight: theme.typography.fontWeightMedium,
      '$expanded > &': {
        fontWeight: theme.typography.fontWeightRegular,
      },
    },
    group: {
      marginLeft: 0,
      '& $content': {
        paddingLeft: theme.spacing(2),
      },
    },
    expanded: {},
    selected: {},
    label: {
      fontWeight: 'inherit',
      color: 'inherit',
    },
    labelRoot: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0.5, 0),
    },
    labelIcon: {
      marginRight: theme.spacing(1),
    },
    labelText: {
      fontWeight: 'inherit',
      flexGrow: 1,
    },
  }));
  

  function StyledTreeItem(props) {
    const classes = useTreeItemStyles();
    const { labelText, labelIcon: LabelIcon, labelInfo, color, bgColor, ...other } = props;
  
    return (
      <TreeItem
        label={
          <div className={classes.labelRoot}>
            <LabelIcon color="inherit" className={classes.labelIcon} />
            <Typography variant="body2" className={classes.labelText}>
              {labelText}
            </Typography>
            <Typography variant="caption" color="inherit">
              {labelInfo}
            </Typography>
          </div>
        }
        style={{
          '--tree-view-color': color,
          '--tree-view-bg-color': bgColor,
        }}
        classes={{
          root: classes.root,
          content: classes.content,
          expanded: classes.expanded,
          selected: classes.selected,
          group: classes.group,
          label: classes.label,
        }}
        {...other}
      />
    );
  }
  
  StyledTreeItem.propTypes = {
    bgColor: PropTypes.string,
    color: PropTypes.string,
    labelIcon: PropTypes.elementType.isRequired,
    labelInfo: PropTypes.string,
    labelText: PropTypes.string.isRequired,
  };
  
  const useStyles = makeStyles({
    root: {
      height: 264,
      flexGrow: 1,
      maxWidth: 400,
    },
  });
  

function FileTree(props) {

        const classes = useStyles();

     const getFile=(item)=>{
       let tempFiles= []
       tempFiles.push(item)
      props.setFile(tempFiles)
      props.setFolder([])
     }

     const getFolder=(item)=>{
      props.setFolder(item)
      let tempFolder = []
       if(item.type === "folder"){
        item.children.map((files)=>{
        tempFolder.push(files)
        })
       }
       props.setFile(tempFolder)
     }

        return (
          <TreeView
            className={classes.root}
            expanded={["3","7"]}
            defaultCollapseIcon={<ArrowDropDownIcon />}
            defaultExpandIcon={<ArrowRightIcon />}
            defaultEndIcon={<div style={{ width: 24 }} />}
          >
            { props.data.map((item)=>{
              if(item.type==="file"){
              return (
                <Link to={`/${item.name}`} >
                <a key={item.id} onClick={()=>getFile(item)} >
                  <StyledTreeItem nodeId={item.id} labelText={item.name} labelIcon={Label} />
                </a>
                </Link>
              )
              }
              else{
              return  (
                <Link to={`/${item.name}`} >
                <a key={item.id} onClick={()=>getFolder(item)}>
              <StyledTreeItem key={item.id} nodeId={item.id} labelText={item.name} labelIcon={Folder} labelInfo={`${item.children.length} files`} >
                  {item.children.map((files)=>(
                    <Link to={`/${item.name}/${files.name}`} >
                       <a key={files.id} onClick={()=>getFile(files)}>
                           <StyledTreeItem key={files.id} nodeId={files.id} labelText={files.name} labelIcon={Label} />
                       </a>
                    </Link>
                  ))}
              </StyledTreeItem>
               </a>
               </Link>
              )
              }
              })}
          </TreeView>
        );
      }
      
export default FileTree
  