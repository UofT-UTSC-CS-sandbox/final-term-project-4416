import React, {useEffect, useRef, useState} from "react";
import MindElixir from "mind-elixir";
import NodeMenu from "@mind-elixir/node-menu";
import "@mind-elixir/node-menu/dist/style.css";
import '@mdxeditor/editor/style.css';

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


  useEffect(() => {
    const initialData = deepCopy(input);
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
    instance.init(initialData.input);
    m.current = instance;
  },[]);

  return (
      <div id="map" style={{ height: "300px", width: "800px" }}>
      </div>
  );
};


export default MindMapWindow