import React,{useState,useEffect} from 'react'
import { Stack, Button } from '@mantine/core';
import {Avatar} from '@mantine/core'
import Service from '../utils/http';
const service=new Service();
export default function Profile() {
    const[user,setUser]=useState({});
    async function getMyData(){
        try{
            let data=await service.get("user/me");
            setUser(data);
        }
        catch(error){
            console.log(error);

        }
    }
    useEffect(()=>{
        getMyData();
    },[])
  return (
    <div>
      <Stack
      h={300}
      bg="var(--mantine-color-body)"
      align="center"
      justify="center"
      gap="lg"
    >
      <Avatar src={user.avatar} alt="it's me" />
      <p variant="default">{user.name}</p>
      <p variant="default">{user.email}</p>
      <p variant="default">User Id:{user._id}</p>
    </Stack>

    </div>
  )
}