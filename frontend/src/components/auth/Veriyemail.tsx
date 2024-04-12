import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  Button,
  PinInput,
  PinInputField,
  Stack,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { userState } from "@/store";
import { Auth } from "@/api/auth";
import { useDispatch } from "react-redux";
import { verifyEmail } from "@/slices/authSlice";

function EmailVerification() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null); // Initialize with null
  const userka = useSelector((state: userState) => state.auth);
  const [pin, setPin] = useState(""); // State to store the pin
  const user=userka.user
  const toast = useToast();
  
  const dispatch = useDispatch();
  const handleSendVerificationEmail = async () => {
    onOpen();

    try {
      const Authinstance = new Auth();
      const response = await Authinstance.sendVerificationEmail(user.userId);

      if (response.iserror) {
        onClose();
        showToast("error", response.message);
      } else {
        showToast("success", response.message);
      }
    } catch (error) {
      showToast("error", "An error occurred during sending verification email");
    }
  };

  const handleVerifyOtp = async () => {

    if (!pin) {
      showToast("error", "Please enter the verification code");
      return;
    }
    if (pin.length < 6) {
      showToast("error", "Please enter a valid verification code");
      return;
    }
    try {
      const Authinstance = new Auth();
      const response = await Authinstance.verifyOtp(user.userId, pin);

      if (response.iserror) {
        showToast("error", response.message);
        // clear the pin
        setPin("");
      } else {
        onClose();
        // dispatch the action to update the user state

        dispatch(verifyEmail({ isEmailVerified: true }));

        
        showToast("success", response.message);
      }
    } catch (error) {
      showToast("error", "An error occurred during verification");
    }
  };

  const showToast = (status:any, message:any) => {
    toast({
      title: status === "success" ? "Success" : "Error",
      description: message,
      status: status,
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <>
      {!user.isEmailVerified && (
        <Alert status="warning" variant="left-accent" my={4}>
          <AlertIcon />
          <AlertTitle mr={2}>Email not verified!</AlertTitle>
          <AlertDescription>Please verify your email to access all features.</AlertDescription>
        </Alert>
      )}
      <Button colorScheme="orange" onClick={handleSendVerificationEmail}>Verify Email</Button>
      <AlertDialog
        motionPreset="slideInBottom"
        onClose={onClose}
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        isCentered
        closeOnOverlayClick={false}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Email Verification</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Please enter the verification code we sent to your email {user.email}
            <Stack direction="row" mt={4} justifyContent="center">
              <PinInput autoFocus onChange={(value) => setPin(value)}>
                {[...Array(6)].map((_, index) => (
                  <PinInputField key={index} boxSize="60px" bg="gray.200" />
                ))}
              </PinInput>
            </Stack>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="green" ml={3} onClick={handleVerifyOtp} disabled={!pin}>
              Verify
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );;
}

export default EmailVerification;
