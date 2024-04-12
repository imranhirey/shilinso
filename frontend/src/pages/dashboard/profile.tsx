import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userState } from '@/store';
import Appsidebar from '@/components/share/Sidebar';
import { Box, Heading, Text, Avatar, VStack, HStack, Input, Button } from '@chakra-ui/react';

const Profile = () => {
  const user:any = useSelector((state: userState) => state.auth.user);
  const [firstName, setFirstName] = useState(user?.firstName);
  const [middleName, setMiddleName] = useState(user?.middleName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.email);
  const [phoneNumber, setPhoneNumber] = useState(user?.Walletid);
  const [country, setCountry] = useState(user?.country);
  const [city, setCity] = useState(user?.city);
  const [dateOfBirth, setDateOfBirth] = useState(user?.dateOfBirth);
  const [gender, setGender] = useState(user?.gender);

  const handleUpdate = () => {
    // Send a request to the server to update the user's information
  };

  return (
    <Appsidebar>
      <Box
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        p={6}
        w="full"
        bg="white"
        m="auto"
        mt={10}
        maxW="2xl"
      >
        <VStack spacing={4} align="center">
          <Avatar size="2xl" src={user?.profileImageUrl} name={`${firstName} ${lastName}`} />
          <Heading as="h1" size="lg">Profile</Heading>
          <Box>
            <Heading as="h2" size="md">User Information</Heading>
            <VStack align="start" spacing={2}>
              <HStack>
                <Text fontWeight="bold">ID:</Text>
                <Text>{user?.userId}</Text>
              </HStack>
              <HStack>
                <Text fontWeight="bold">First Name:</Text>
                <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </HStack>
              <HStack>
                <Text fontWeight="bold">Middle Name:</Text>
                <Input value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
              </HStack>
              <HStack>
                <Text fontWeight="bold">Last Name:</Text>
                <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </HStack>
              <HStack>
                <Text fontWeight="bold">Email:</Text>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} />
              </HStack>
              <HStack>
                <Text fontWeight="bold">Phone Number:</Text>
                <Input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
              </HStack>
              <HStack>
                <Text fontWeight="bold">Country:</Text>
                <Input value={country} onChange={(e) => setCountry(e.target.value)} />
              </HStack>
              <HStack>
                <Text fontWeight="bold">City:</Text>
                <Input value={city} onChange={(e) => setCity(e.target.value)} />
              </HStack>
              <HStack>
                <Text fontWeight="bold">Date of Birth:</Text>
                <Input value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
              </HStack>
              <HStack>
                <Text fontWeight="bold">Gender:</Text>
                <Input value={gender} onChange={(e) => setGender(e.target.value)} />
              </HStack>
              {/* Add more fields as needed */}
            </VStack>
            <Button onClick={handleUpdate} mt={4}>Update</Button>
          </Box>
        </VStack>
      </Box>
    </Appsidebar>
  );
};

export default Profile;