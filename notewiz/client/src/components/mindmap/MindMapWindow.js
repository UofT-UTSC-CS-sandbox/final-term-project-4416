import React, {useEffect, useRef, useState} from "react";
import MindElixir from "mind-elixir";
import NodeMenu from "@mind-elixir/node-menu";
import "@mind-elixir/node-menu/dist/style.css";
import '@mdxeditor/editor/style.css';
import axios from "axios";

const MindMapWindow = (input) => {
  const m = useRef();
  let instance = null;
  const deepCopy = (obj) => {
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
    const newMap = {id: initialData.input.id, content: {...instance.getData()}};
    console.log(newMap);
    const response = axios.post("http://localhost:8000/MindMap/AutoSave", newMap,{withCredentials: true});
  }

  return (
      <div>
        <div id="map" style={{height: "300px", width: "800px"}}/>
        <div>
          <button onClick={autoSave}>Save</button>
        </div>
      </div>
  )
      ;
};


export default MindMapWindow