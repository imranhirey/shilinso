import Appsidebar from '@/components/share/Sidebar'
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useBreakpointValue } from '@chakra-ui/react'
import Router  from 'next/router';
import React from 'react'

function logout() {
  const modalSize = useBreakpointValue({ base: "xs", md: "md" });

  return (
    <Appsidebar>
      <Modal
        onClose={()=>{}}
        isOpen
        motionPreset='slideInBottom'
        size={modalSize}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Logout
          </ModalHeader>
          <ModalBody>
           <p>
                Are you sure you want to logout?
           </p>
          </ModalBody>
          <ModalFooter>
            <Button  onClick={()=>{
                localStorage.removeItem('token');
                Router.push('/auth/login')

            }} colorScheme='blue' mr={3} >
                Logout
            </Button>
            <Button variant='ghost'>
                Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Appsidebar>
  );
}

export default logout;