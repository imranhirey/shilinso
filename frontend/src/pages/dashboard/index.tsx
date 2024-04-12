import { User } from "@/@types/user";
import EmailVerification from "@/components/auth/Veriyemail";
import Appsidebar from "@/components/share/Sidebar";
import UserInfo from "@/interfaces/Signup";
import { userState } from "@/store";
import { Button, Box, Text } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";

function index() {
  const user: User = useSelector((state: userState) => state?.auth);
  const isVerified = useSelector((state: userState) => state?.auth?.user?.security?.isverified?.email);

  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  let greeting;

  if (currentHour < 12) {
    greeting = "Good morning";
  } else if (currentHour < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  return (
    <>
      <Appsidebar>
        <Box p={4}>
          <Text fontSize="xl">
            {greeting}, {user.user.firstName}!
          </Text>
         
          {!isVerified && <EmailVerification />}
        </Box>
      </Appsidebar>
    </>
  );
}

export default index;