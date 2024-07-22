import React, {useEffect, useRef, useState} from "react";
import MindElixir from "mind-elixir";
import NodeMenu from "@mind-elixir/node-menu";
import "@mind-elixir/node-menu/dist/style.css";
import '@mdxeditor/editor/style.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createMindMap, deleteMindMap } from "./MindMapSlice";
import { map } from "@mdxeditor/editor";
import {notifySuccess} from "../ToastNotification";

import axios from "axios";

const MindMap = () => {
  const m = useRef();
  const maps = useSelector((state) => state.mindMaps.maps);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
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
    if(data === null){
      instance.init(MindElixir.new("new topic"));
    }else{
      instance.init(data);
      instance.refresh(data);
    }

    m.current = instance;
  });

  const handleSubmit = async (e)=> {
    e.preventDefault();
      try {
        notifySuccess("Successfully Created");
        const newMap = {id:maps.length, ...instance.getData()};
        setData(newMap);
        dispatch(createMindMap(
            {
              id:maps.length,
              ...instance.getData()
            }));
        const response = await axios.post("http://localhost:5000/api/createMindMap", newMap, {withCredentials: true});
      } catch (err) {
        console.log(err);
      }
    }

  const handleQuit = () => {
    navigate('/Mind');
  }

  return (
    <div style={{display:"flex"}}>
      <div id="map" style={{ height: "800px", width: "80%" }} />
      <div>
        <button onClick={handleSubmit}>Save</button>
        <button onClick={handleQuit}>Quit</button>
      </div>
    </div>
  );
};


export default MindMap