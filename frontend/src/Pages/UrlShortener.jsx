import React from 'react'
import { useState,useEffect } from 'react';
import { TextInput } from '@mantine/core';
import { Stack, Button } from '@mantine/core';
import { Container } from '@mantine/core';
import { Text } from '@mantine/core';
import Service from '../utils/http';
const service=new Service();

export default function UrlShortener() {
    async function generateShortUrl(){
        try{
        let data=await service.post("s",input);
        setResponse(data);
        console.log(data);
    }
    catch(error){
        console.log(error);
    }
    }
    const[input,setInput]=useState({
        "originalUrl":"",
        "expiresAt":"",
        "title":"",
        "customUrl":""
    })

const [response,setResponse]=useState(null);

  return (
    <Container size={"xs"}>
        {response ?<>{ service.getBaseURL() +"/api/s/" + response.shortCode}</>:
        <Stack>
    <Text size="30px" style={{"textShadow":"1px 2px 10px"}}>Shorten your URL here</Text>        
    <TextInput onChange={(e)=>{
        setInput({...input,originalUrl:e.target.value});
    }}
      size="md"
      radius="md"
      label="Original URL"
      withAsterisk
      placeholder="Paste Original URL"
    />
    <TextInput
    onChange={(e)=>{
        setInput({...input,customUrl:e.target.value});
    }}
      size="md"
      radius="md"
      label="Customize your link(Optional)"
      placeholder="Customize your link"
    />
    <TextInput
    onChange={(e)=>{
        setInput({...input,title:e.target.value});
    }}
      size="md"
      radius="md"
      label="Title(Optional)"
      placeholder="Title of URL"
    />
    <TextInput
    onChange={(e)=>{
        setInput({...input,expiresAt:e.target.value});
    }}
      size="md"
      radius="md"
      type="date"
      label="Date of Expiry(Optional)"
      placeholder="Date of Expiry"
    />
    <Button disabled={input.originalUrl.length<5} onClick={()=>{generateShortUrl()}}>Generate Short Url</Button>
    </Stack>}
    </Container>
  )
}