import React, { useEffect, useRef } from "react";
import MindElixir from "mind-elixir";
import NodeMenu from "@mind-elixir/node-menu";
import "@mind-elixir/node-menu/dist/style.css";
import '@mdxeditor/editor/style.css';

const MindMapWindow = (data) => {
  const m = useRef();
  useEffect(() => {
    const instance = new MindElixir({
      el: "#map",// bind an element
      direction: MindElixir.LEFT,
      draggable: false, // default true
      contextMenu: true, // default true
      toolBar: true, // default true
      nodeMenu: true, // default true
      keypress: true // default true
    });
    instance.install(NodeMenu);
    instance.init(data.nodeData);
    console.log(data.data.nodeData);
    m.current = instance;
  });

  return (
      <div id="map" style={{ height: "300px", width: "800px" }} />
  );
};


export default MindMapWindow