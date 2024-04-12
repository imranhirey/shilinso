import React, { useState } from 'react'
import { Stack, Text, Button } from '@chakra-ui/react'
import { FcLock } from 'react-icons/fc'

export default function SimpleCookiePreference(props: { style: React.CSSProperties}) {
    const [isVisible, setIsVisible] = useState(true);
  
    const handleClose = () => {
      setIsVisible(false);
      
    };
  
    if (!isVisible) {
      return null;
    }
  
    return (
      <>
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          zIndex: 9999,
        }} />
        <Stack style={{ ...props.style, color: 'white' }} p="4" boxShadow="lg" m="4" borderRadius="sm" zIndex={10000}>
          <Stack direction="row" alignItems="center">
            <Text fontWeight="semibold">Your Privacy</Text>
            <FcLock />
          </Stack>
  
          <Stack direction={{ base: 'column', md: 'row' }} justifyContent="space-between">
            <Text fontSize={{ base: 'sm' }} textAlign={'left'} maxW={'4xl'}>
              We use cookies and similar technologies to help personalise content, tailor and
              measure ads, and provide a better experience. By clicking OK or turning an
              option on in Cookie Preferences, you agree to this, as outlined in our Cookie
              Policy. To change preferences or withdraw consent, please update your Cookie
              Preferences.
            </Text>
            <Stack direction={{ base: 'column', md: 'row' }}>
              <Button variant="outline" colorScheme="green" onClick={handleClose}>
                Cookie Preferences
              </Button>
              <Button colorScheme="green" onClick={()=>{
                localStorage.setItem('cookieAccepted', 'true')
                handleClose()
              
              }}>OK</Button>
            </Stack>
          </Stack>
        </Stack>
      </>
    )
  }