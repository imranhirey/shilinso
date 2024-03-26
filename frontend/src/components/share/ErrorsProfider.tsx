import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

function ErrorsProfider() {
  return (
    <Alert status='error'>
    <AlertIcon />
    <AlertTitle>
        Verify your email address or click this <Link color={"orange"} href={""}>Link</Link> to veriy 
    </AlertTitle>
  
  </Alert>
  )
}

export default ErrorsProfider
