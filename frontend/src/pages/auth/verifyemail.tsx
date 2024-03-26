'use client'

import { Box, Center, Heading, useToast } from '@chakra-ui/react'
import {
  Button,
  FormControl,
  Flex,
  Input,
  Stack,
  useColorModeValue,
  HStack,
} from '@chakra-ui/react'
import { PinInput, PinInputField } from '@chakra-ui/react'
import Image from 'next/image'
import { useState } from 'react'

export default function VerifyEmailForm() {
    const toast = useToast()
    const [pin, setPin] = useState("");
    const [checking,setchecking]=useState(false)

const handlePinChange = (value: string) => {
  setPin(value);
};

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={"white"}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'lg'}
        bg={"white"}
        p={6}
        my={10}>
             <Box style={{
          display:"flex",
          justifyContent:"center",
          alignItems:"center"
        }}>
        <Image
      src={"/images/logo.png"}
      alt="shilinso logo"
      width={250}
      height={300}
      />
        </Box>
        <Center>
       
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
            Verify your Email
          </Heading>
        </Center>
        <Center
          fontSize={{ base: 'sm', sm: 'md' }}
          color={useColorModeValue('gray.800', 'gray.400')}>
          We have sent code to your email
        </Center>
        <Center
          fontSize={{ base: 'lg', sm: 'lg' }}
          fontWeight="bold"
          color={"white"}>
          username@mail.com
        </Center>
        <FormControl>
          <Center>
            <HStack>
              
<PinInput  isDisabled={checking} onChange={handlePinChange} value={pin}>
  <PinInputField width={50} height={50} />
  <PinInputField width={50} height={50} />
  <PinInputField width={50} height={50} />
  <PinInputField width={50} height={50} />
  <PinInputField width={50} height={50} />
  <PinInputField width={50} height={50} />
</PinInput>
            </HStack>
          </Center>
        </FormControl>
        <Stack spacing={6}>
          <Button
          onClick={()=>{
            toast.closeAll()
            if (pin!="123456"){
                toast({
                    status:"error",
                    title:"invalid code ",
                    description:"please check your email and try again",
                    isClosable:true,
                    duration:3000,
            
                })
                setPin("")
            }
            else{
                toast({
                    status:"success",
                    title:"Email Verified ",
                    description:"Yur email address has been verified successfuly",
                    isClosable:true,
                    duration:3000,
            
                })
            
            }
          }}
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}>
            Verify
          </Button>
        </Stack>
      </Stack>
    </Flex>
  )
}
