import {Button, Spacer, Input, Text, FormElement, Image} from "@nextui-org/react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



export default function Func (){
    const navigate = useNavigate();

    const [state, setState] = useState({
      username: "",
      password: "",
    });

    function handleChange(e: React.ChangeEvent<FormElement>) {
      const value = e.target.value;
      setState({
        ...state,
        [e.target.name]: value,
      });
    }

    const handleClick = (e: React.MouseEvent<HTMLButtonElement,  MouseEvent>) => {
      //e.preventDefault();
    
    console.log('handleClick 👉️', state);

    axios.post("http://localhost:3001/users/login", state)
    .then( data =>{
      console.log(data.data)
      if (data.data.message){
        console.log(data.data)}
      else{
        navigate("/header")

        sessionStorage.setItem("rol", JSON.stringify(data.data.roles))
        console.log(sessionStorage.rol)
      }
      
    })

  }; 

  return(  
      <div className="wrapper">

      <Spacer y={2}/>

          <Image
              width={800}
              height={180}
              src="https://raw.githubusercontent.com/WsDoragon/Gestion_Usuarios/main/P%C3%A1gina-Gesti%C3%B3n/src/assets/logoA.png"
              objectFit="cover"
          />

        <Spacer y={0.5}/>

        <Text 
            h1 size={30}
            css={{color:"#fea858"}}
            weight="bold"
          >Funcionarios
          </Text> 

        <Spacer y={2} />

        <Input
          size="xl"
          width="200px"
          css={{$$inputPlaceholderColor:"#747574"}}
          labelPlaceholder="RUT"
          name="username"
          onChange={handleChange} 
          value={state.username}
          />

      <Spacer y={1} />

        <Input.Password
            clearable
            type="password"
            size= "xl"
            width="200px"
            placeholder="Contraseña"
            name="password"
            onChange={handleChange} 
            value={state.password}
            />

      <Spacer y={1.5} />

        <Button
          auto
          size="lg"
          css={{color:"#ffffff", fontWeight:"bold", background:"#ff5101", fontSize:"$lg"}}
          onClick={handleClick}
          >Iniciar Sesión
        </Button>
        
        <Spacer x={3}/>
        
        </div>
  )}







