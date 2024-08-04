import { Alert, AlertIcon, Button, Input } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react';
import { Select } from '@chakra-ui/react';
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword";

const Signup = () => {
  
  const [inputs , setInputs] = useState({
    fullname:"",
    username:"",
		email: "",
		password: "",
    university:""
	})
  const {loading,error,signup}= useSignUpWithEmailAndPassword()
  return (
    <>
      <Input
						placeholder="Email"
						fontSize={14}
						type='email'
						value={inputs.email}
						onChange={(e)=>setInputs({...inputs, email: e.target.value})}
					/>
					<Input
						placeholder="Username"
						fontSize={14}
						type='text'
						value={inputs.username}
						onChange={(e)=>setInputs({...inputs, username: e.target.value})}
					/>
          <Input
						placeholder="Full Name"
						fontSize={14}
						type='text'
						value={inputs.fullname}
						onChange={(e)=>setInputs({...inputs, fullname: e.target.value})}
					/>
          <Input
						placeholder="Password"
						fontSize={14}
						type='password'
						value={inputs.password}
						onChange={(e)=>setInputs({...inputs, password: e.target.value})}
					/>
          <Select  placeholder="Select Your University or College" onChange={(e)=>setInputs({...inputs, university: e.target.value})}>
            <option value='ANITS'>ANITS</option>
            <option value='AU'>AU</option>
            <option value='ADITYA'>ADITYA</option>
          </Select>
          {error && (
				<Alert status='error' fontSize={13} p={2} borderRadius={4}>
					<AlertIcon fontSize={12} />
					{error.message}
				</Alert>
			)}
          <Button w={"full"} colorScheme='blue' size={'sm'} fontSize={14} 
          isLoading={loading}
          onClick={()=> signup(inputs)}
          > 
						Sign Up
					</Button>
    </>
  )
}

export default Signup