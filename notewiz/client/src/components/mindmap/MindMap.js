import React, {useEffect, useRef, useState} from "react";
import MindElixir from "mind-elixir";
import NodeMenu from "@mind-elixir/node-menu";
import "@mind-elixir/node-menu/dist/style.css";
import '@mdxeditor/editor/style.css';
import {useNavigate, useParams} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createMindMap, deleteMindMap } from "./MindMapSlice";
import {notifySuccess} from "../ToastNotification";

import axios from "axios";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import {deepCopy} from "./MindMapWindow";

const MindMap = () => {
  const m = useRef();
  const maps = useSelector((state) => state.mindMaps.maps);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  let instance = null;

  const {id} = useParams();
  const [initialMap, setInitialMap] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMapById() {
      if (id) {
        try {
          const response = await axios.get(`http://localhost:8000/api/fetchMindMapById/${id}`, { withCredentials: true });
          setInitialMap(response.data);
          setLoading(false); // Set loading to false once data is fetched
        } catch (error) {
          console.error('Error fetching the mind map:', error);
          setLoading(false); // Also set loading to false in case of error
        }
      } else {
        setLoading(false); // If no id, still set loading to false
      }
    }
    fetchMapById();
  }, [id]);

  useEffect(()=>{
    if (loading) return;
    //if (!initialMap) return;
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

    if(!id){
      if(data === null){
        instance.init(MindElixir.new("new topic"));
      }else{
        instance.init(data);
        console.log("Data: ", data)
        instance.refresh(data);
      }
    }else{
      instance.init(initialMap.content);
      instance.refresh(initialMap.content);
    }
    m.current = instance;
  }, [loading, id, initialMap]);

  const handleSubmit = async (e)=> {
    e.preventDefault();
    if(!id){
      try {
        notifySuccess("Successfully Created");
        const newMap = {id:maps.length, ...instance.getData()};
        setData(newMap);
        dispatch(createMindMap(
            {
              id:maps.length,
              ...instance.getData()
            }));
        const response = await axios.post("http://localhost:8000/api/createMindMap", newMap, {withCredentials: true});
      } catch (err) {
        console.log(err);
      }
    }else{
      notifySuccess("Successfully Created");
      const editMap = {id: initialMap.content.id, ...instance.getData()};
      const response = await axios.post("http://localhost:8000/MindMap/AutoSave", editMap,{withCredentials: true});
    }

  }

  const handleQuit = () => {
    navigate('/Mind');
  }

  const buttons = [
    <Button key={0} onClick={handleSubmit} className='NoteButtons'>Save</Button>,
    <Button key={1} onClick={handleQuit} className='NoteButtons'>Quit</Button>,
  ];

  return (
    <div style={{display:"flex",flexDirection: 'column'}}>
      <div id="map" style={{ height: "688px", width: "100%" }} />
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
      }}>
        <ButtonGroup size="large" aria-label="Small button group">
          {buttons}
        </ButtonGroup>
      </Box>
    </div>
  );
};


export default MindMap