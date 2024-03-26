import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  Link,
} from "@chakra-ui/react";
import axios from "axios";
import { Router, useRouter } from "next/router";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const router=useRouter()

  const handleLogin = async (event:any) => {

    event.preventDefault();
        
    setLoading(true);

    try {
      // Send login request
      const response = await axios.post("http://localhost:3001/auth/login", {
        email,
        password,
      });
      

      // Handle successful login
      toast({
        title: "Login Successful",
        description: "You have successfully logged in.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });


      setTimeout(() => {
      }, 500);
      
    } catch (error) {
      // Handle login error
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }

    setLoading(false);
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      width={"100vw"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Box
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        p={8}
      >
        <Stack spacing={8} mx={"auto"} maxW={"md"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"2xl"} textAlign={"center"}>
              Log in to Your Account - Shilinso
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              Welcome back! Log in to access your account.
            </Text>
          </Stack>
          <form onSubmit={handleLogin}>
            <Stack spacing={4}>
              <FormControl id="email" isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Button
                type="submit"
                isLoading={loading}
                loadingText="Logging in"
                colorScheme="blue"
                size="lg"
              >
                Log in
              </Button>
            </Stack>
          </form>
          <Stack mt={4} direction={"row"} spacing={4} justify={"space-between"}>
            <Text fontSize={"sm"}>
              <Link href="#">Forgot password?</Link>
            </Text>
            <Text fontSize={"sm"}>
              Don't have an account?{" "}
              <Link href="#">Sign up here</Link>
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Flex>
  );
}
