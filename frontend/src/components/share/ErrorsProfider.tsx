import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

function ErrorsProfider(props: {message: string}) {
  return (
    <Alert style={{
        // make goo styling here

      
       // make it
    

    }} status='warning'>
    <AlertIcon />
    <AlertDescription>
       {
          props.message
       }
    </AlertDescription>
  
  </Alert>
  )
}

export default ErrorsProfider
