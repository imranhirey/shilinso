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
import { countrieslist } from "@/data/countries";
import { GetCountryCities } from "@/api/data";
import { Auth } from "@/api/auth";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userInfo, setUserInfo] = useState({
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
    phoneNumber: "",
  });
  const [cities, setCities] = useState<string[]>([]);
  const [checking, setChecking] = useState(false);
  const toast = useToast();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
          setCities(res.data);
        } else {
          toast({
            title: "Server error",
            description: "Error while processing your request",
            status: "error",
            duration: 2000,
            position: "top-right",
          });
        }
      });
    }
  }, [userInfo.country]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setChecking(true);

    try {
      // Handle form submission here
      const response = await new Auth().signup(userInfo);
      // Handle response
    } catch (error) {
      // Handle error
    } finally {
      setChecking(false);
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Box
        p={8}
        w={"full"}
        maxW={"xl"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"lg"}
        boxShadow={"lg"}
      >
        <Heading as="h1" textAlign={"center"} size="2xl" mb={6}>
          Personal Account
        </Heading>
        <Text textAlign={"center"} fontSize={"lg"} color={"gray.600"} mb={6}>
          Register for Exclusive Access to Somalia's Premier Payment Platform ✌️
        </Text>
        {checking && <Progress size="xs" isIndeterminate />}
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl id="firstName" isRequired>
              <FormLabel>First Name</FormLabel>
              <Input name="firstName" type="text" onChange={handleInputChange} />
            </FormControl>
            <HStack>
              <FormControl id="middleName">
                <FormLabel>Middle Name</FormLabel>
                <Input name="middleName" type="text" onChange={handleInputChange} />
              </FormControl>
              <FormControl id="lastName" isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input name="lastName" type="text" onChange={handleInputChange} />
              </FormControl>
            </HStack>
            <FormControl id="dateOfBirth" isRequired>
              <FormLabel>Date of Birth</FormLabel>
              <Input name="dateOfBirth" type="date" onChange={handleInputChange} />
            </FormControl>
            <HStack>
              <FormControl id="country" isRequired>
                <FormLabel>Country</FormLabel>
                <Select name="country" placeholder="Select country" onChange={handleInputChange}>
                  {countrieslist.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl id="city">
                <FormLabel>City</FormLabel>
                <Select name="city" placeholder="Select city" onChange={handleInputChange}>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </Select>
              </FormControl>
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
                  <Button variant={"ghost"} onClick={() => setShowPassword(!showPassword)}>
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
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
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
          </Stack>
          <Button
            type="submit"
            isLoading={checking}
            loadingText="Submitting"
            colorScheme="blue"
            size="lg"
            mt={8}
            w={"full"}
          >
            Sign up
          </Button>
        </form>
      </Box>
    </Flex>
  );
}
