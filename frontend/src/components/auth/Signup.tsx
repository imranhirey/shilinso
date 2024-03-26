import React, { useEffect, useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Select,
  useToast,
  Progress,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
import UserInfo from "@/interfaces/Signup";
import CheckSignupForm from "@/lib/checkers/Registration";
import { countrieslist } from "@/data/countries";
import { GetCountryCities } from "@/api/data";
import { string } from "yup";

export default function SignUpForm() {
  type citieska = string[] | [];
  const [showPassword, setShowPassword] = useState(false);
  //@ts-ignore

  const uniqueSortedCountries = [...new Set(countrieslist)].sort();
  const [countries, setCountries] = useState(uniqueSortedCountries);
  const [cities, setcities] = useState<citieska>();
  const [checking,setchecking]=useState(false)

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toast = useToast();
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
    confirmPassword: "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (userInfo.country) {
      GetCountryCities(userInfo.country).then((res) => {
        if (!res.error) {
          setcities(res.data);
        } else {
          toast({
            title: "serevr error",
            description: "Error while processing your request",
            status: "error",
            duration: 2000,
            position: "top-right",
          });
        }
      });
    }
  }, [userInfo.country]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setchecking(true)
    // Handle form submission here
    let res = CheckSignupForm(userInfo);
    console.log(res);
    if (res.status == "error") {
      setchecking(false)
      toast({
        title: "Validation Error",
        description: res.message,
        status: "error",
        duration: 9000,
        position: "top-right",
      });
    } else {
      axios
        .post("http://localhost:3001/auth/signup", { userInfo })
        .then((resp) => {
          setchecking(false)
          toast({
            title: "Account Created",
            description: JSON.stringify(resp.data),
            status: "success",
            duration: 9000,
            position: "top-right",
          });
        })
        .catch((er) => {
          setchecking(false)
          toast({
            title: "Server Error",
            description: "An error accured please try again or contact at support@shilinso.co.uk",
            status: "error",
            duration: 3000,
            position: "top-right",
          });
        });
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      width={"100vw"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"xxl"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Personal Account
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Register for Exclusive Access to Somalia's Premier Payment Platform
            ✌️
          </Text>
        </Stack>
        {
          checking?<Progress size='xs' isIndeterminate />:""
        }
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing={7}>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    name="firstName"
                    type="text"
                    onChange={handleInputChange}
                  />
                </FormControl>
              </Box>
              <HStack>
                <Box>
                  <FormControl id="middleName">
                    <FormLabel>Middle Name</FormLabel>
                    <Input
                      name="middleName"
                      type="text"
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName" isRequired>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      name="lastName"
                      type="text"
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="dateOfBirth" isRequired>
                <FormLabel>Date of Birth</FormLabel>
                <Input
                  name="dateOfBirth"
                  type="date"
                  onChange={handleInputChange}
                />
              </FormControl>
              <HStack>
                <Box>
                  <FormControl id="country" isRequired>
                    <FormLabel>Country</FormLabel>
                    <Select
                      name="country"
                      placeholder="Select gender"
                      onChange={handleInputChange}
                    >
                      {countries?.map((x) => {
                        return <option value={x}>{x}</option>; // Incorrect return value
                      })}
                    </Select>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="city">
                    <FormLabel>City</FormLabel>
                    {/* <Input name="city" type="text" onChange={handleInputChange} /> */}
                    <Select
                      name="city"
                      placeholder="Select gender"
                      onChange={handleInputChange}
                    >
                      {cities?.map((x) => {
                        return <option value={x}>{x}</option>; // Incorrect return value
                      })}
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
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    onChange={handleInputChange}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl id="confirmPassword" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <Input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    onChange={handleInputChange}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl id="gender" isRequired>
                <FormLabel>Gender</FormLabel>
                <Select
                  name="gender"
                  placeholder="Select gender"
                  onChange={handleInputChange}
                >
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
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
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
