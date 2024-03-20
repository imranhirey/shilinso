import React, { useEffect, useState } from 'react';
import { Flex, Box, FormControl, FormLabel, Input, InputGroup, HStack, InputRightElement, Stack, Button, Heading, Text, useColorModeValue, Select, useToast } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import axios from 'axios';
import UserInfo from '@/interfaces/Signup';
import CheckSignupForm from '@/lib/checkers/Registration';



export default function SignUpForm() {

  useEffect(()=>{

     axios.get("http://192.168.0.24:3001/get/countrylist").then((res)=>{

    console.log(res)
    setcountries(res.data.countrylist)
     })
     .catch((err)=>{
      console.log(err)
     })


  },[])
  const [showPassword, setShowPassword] = useState(false);
  const [countries,setcountries]=useState([])
  const [cities,setcities]=useState([])

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toast = useToast()
  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "male",
    country: "",
    email: "",
    dateOfBirth: "",
    password: "",
    city: "",
    confirmPassword: ""
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    
    const { name, value } = event.target;
    setUserInfo(prevState => ({
      ...prevState,
      [name]: value
    }));

    
  };


  useEffect(()=>{
    if(userInfo.country){
      axios.get(`http://192.168.0.24:3001/get/cities/${userInfo.country}?authkey=yaamaalik4321?`).then((res)=>{

      setcities(res.data.cities)
    })
    .catch((e)=>{
      console.log(e)
    })
  }

  },[userInfo])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission here
    let res=CheckSignupForm(userInfo)
    console.log(res)
    if (res.status=="error"){
      toast({
        title: 'Validation Error',
        description:res.message ,
        status: 'error',
        duration: 9000,
        position:"top-right"
      })
    }
    else{
      toast({
        title: 'Account Created',
        description:res.message ,
        status: 'success',
        duration: 9000,
        position:"top-right"
      })

    }


  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      width={"100%"}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            Register for Exclusive Access to Somalia's Premier Payment Platform ✌️ 
            
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={7}>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input name="firstName" type="text" onChange={handleInputChange} />
                </FormControl>
              </Box>
              <HStack>
                <Box>
                  <FormControl id="middleName">
                    <FormLabel>Middle Name</FormLabel>
                    <Input name="middleName" type="text" onChange={handleInputChange} />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName" isRequired>
                    <FormLabel>Last Name</FormLabel>
                    <Input  name="lastName" type="text" onChange={handleInputChange} />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="dateOfBirth" isRequired>
                <FormLabel>Date of Birth</FormLabel>
                <Input name="dateOfBirth" type="date" onChange={handleInputChange} />
              </FormControl>
              <HStack>
                <Box>
                  <FormControl  id="country" isRequired>
                    <FormLabel>Country</FormLabel>
                    <Select name="country" placeholder="Select gender" onChange={
                      handleInputChange
                     
                    
                    
                      
                     
                      
                }>
    {
      countries?.map((x)=>{
        return <option value={x}>{x}</option> // Incorrect return value
      })
    }
</Select>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="city">
                    <FormLabel>City</FormLabel>
                    {/* <Input name="city" type="text" onChange={handleInputChange} /> */}
                    <Select name="city" placeholder="Select gender" onChange={
                      handleInputChange
                     
                    
                    
                      
                     
                      
                }>
                  
    {
      cities?.map((x)=>{
        return <option value={x}>{x}</option> // Incorrect return value
      })
    }
    </Select>
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input name="email" type="email" onChange={handleInputChange} />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input name="password" type={showPassword ? 'text' : 'password'} onChange={handleInputChange} />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl id="confirmPassword" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <Input name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} onChange={handleInputChange} />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                      {showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl id="gender" isRequired>
                <FormLabel>Gender</FormLabel>
                <Select name="gender" placeholder="Select gender" onChange={handleInputChange}>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </Select>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  type="submit"
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign up
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
