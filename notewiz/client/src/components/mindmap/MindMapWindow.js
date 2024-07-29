import React, {useEffect, useRef, useState} from "react";
import MindElixir from "mind-elixir";
import NodeMenu from "@mind-elixir/node-menu";
import "@mind-elixir/node-menu/dist/style.css";
import '@mdxeditor/editor/style.css';
import axios from "axios";
import Button from "@mui/material/Button";
import {notifySuccess} from "../ToastNotification";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";

export const deepCopy = (obj) => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => deepCopy(item));
  }

  const copy = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepCopy(obj[key]);
    }
  }
  return copy;
};

const MindMapWindow = (input) => {
  const m = useRef();
  let instance = null;
  const initialData = deepCopy(input);

  useEffect(() => {
    instance = new MindElixir({
      el: "#map",// bind an element
      direction: MindElixir.LEFT,
      draggable: true, // default true
      contextMenu: true, // default true
      toolBar: true, // default true
      nodeMenu: true, // default true
      keypress: true // default true
    });
    instance.install(NodeMenu);
    instance.init(initialData.input.content);
    m.current = instance;
  });

  async function autoSave (e){
    e.preventDefault();
    const newMap = {id: initialData.input.id, ...instance.getData()};
    const response = axios.post("http://localhost:5000/MindMap/AutoSave", newMap,{withCredentials: true});
  }

  async function jump (e) {
    e.preventDefault();
    const id = initialData.input._id;
    const url = `http://localhost:3000/create-new-mind-map/${id}`;
    try{
      await autoSave(e);
    }catch (e) {
      console.log(e);
    }finally {
      window.open(url, '_blank');  // Opens in a new window or tab
    }

  }

  return (
      <div >
        <div id="map" style={{height: "300px", width: "850px"}}/>
        <Box sx={{
          display: 'flex',
          alignItems: 'flex-end'
        }}>
          <Button variant="outlined" onClick={(e)=>{jump(e)}} className='NoteButtons' sx={{ marginRight: 2 }}>Edit</Button>
          <Button variant="outlined" onClick={(e)=>{autoSave(e)}} className='NoteButtons'>Save</Button>
        </Box>
      </div>
  )
};


export default MindMapWindow