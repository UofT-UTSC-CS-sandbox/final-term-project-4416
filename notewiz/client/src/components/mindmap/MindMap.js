import React, { useEffect, useRef } from "react";
import MindElixir from "mind-elixir";
import NodeMenu from "@mind-elixir/node-menu";
import "@mind-elixir/node-menu/dist/style.css";
import '@mdxeditor/editor/style.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createMindMap, deleteMindMap } from "./MindMapSlice";
import { map } from "@mdxeditor/editor";

const MindMap = () => {
  const m = useRef();
  const maps = useSelector((state) => state.mindMaps.maps);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let instance = null;
  useEffect(()=>{
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
    instance.init(MindElixir.new("new topic"));
    m.current = instance;
  });
  const handleSave = () =>{
    console.log("save");
    console.log(instance.getData());
    dispatch(createMindMap(
      {
        id:maps.length,
        ...instance.getData()
      }
    ));
    console.log(maps);
    alert("Successfully Created");
    // navigate('/Mind');
  }
  const handleQuit = () => {
    navigate('/Mind');
  }

  return (
    <div style={{display:"flex"}}>
      <div id="map" style={{ height: "800px", width: "80%" }} />
      <div>
        <button onClick={handleSave}>Save</button>
        <button onClick={handleQuit}>Quit</button>
      </div>
    </div>
  );
};


export default MindMap