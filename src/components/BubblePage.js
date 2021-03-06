import React, { useEffect, useState } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import {fetchColorService} from '../services/fetchColorService';

const BubblePage = () => {
  const [colors, setColors] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    async function fetchColors() {
      let response = await fetchColorService.fetchColors()
      setColors(response)
    }
    fetchColors()
  }, [])  

  const toggleEdit = (value) => {
    setEditing(value);
  };

  const saveEdit = async (editColor) => {
    const updatedColor = await fetchColorService.saveEdit(editColor)
    setColors(colors.map(item => {
      return item.id === updatedColor.id ? {...item, color: updatedColor.color, code: { hex: updatedColor.code}} : item
    }))    
  };

  const deleteColor = (colorToDelete) => {
    fetchColorService.deleteColor(colorToDelete)
  };

  return (
    <div className="container">
      <ColorList colors={colors} editing={editing} toggleEdit={toggleEdit} saveEdit={saveEdit} deleteColor={deleteColor}/>
      <Bubbles colors={colors}/>
    </div>
  );
};

export default BubblePage;

//Task List:
//1. When the component mounts, make an axios call to retrieve all color data and push to state.
//2. Complete toggleEdit, saveEdit, deleteColor and functions
