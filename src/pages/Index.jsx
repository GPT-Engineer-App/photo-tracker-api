import React, { useState } from "react";
import { ChakraProvider, Box, VStack, Heading, FormControl, FormLabel, Input, Button, Image, Text, useToast } from "@chakra-ui/react";
import { FaSignInAlt, FaUserPlus, FaUpload } from "react-icons/fa";

const Index = () => {
  const [email, setEmail] = useState("matt@apexrainc.com");
  const [password, setPassword] = useState("Nala");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [images, setImages] = useState([]);
  const toast = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://backengine-pkvt.fly.dev/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        setIsLoggedIn(true);
        toast({
          title: "Logged in successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Unable to login. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Similar to handleLogin, implement the signup logic here
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Assuming the backend provides a way to upload and analyze images
      // Implement image upload and analysis logic here
    }
  };

  const loginForm = (
    <VStack spacing={4} align="stretch">
      <FormControl id="email">
        <FormLabel>Email address</FormLabel>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </FormControl>
      <FormControl id="password">
        <FormLabel>Password</FormLabel>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </FormControl>
      <Button leftIcon={<FaSignInAlt />} onClick={handleLogin}>
        Login
      </Button>
      <Button leftIcon={<FaUserPlus />} onClick={handleSignUp} variant="outline">
        Sign Up
      </Button>
    </VStack>
  );

  const uploadForm = (
    <VStack spacing={4} align="stretch">
      <FormControl id="file">
        <FormLabel>Upload a photo for analysis</FormLabel>
        <Input type="file" onChange={handleFileChange} />
      </FormControl>
      <Button leftIcon={<FaUpload />} colorScheme="blue">
        Upload and Analyze
      </Button>
    </VStack>
  );

  const imagesList = images.map((image, index) => (
    <Box key={index}>
      <Image src={image.url} alt={`Uploaded image ${index + 1}`} />
      <Text>{image.analysis}</Text>
    </Box>
  ));

  return (
    <ChakraProvider>
      <Box p={5}>
        <Heading mb={6}>Property Damage Photo Manager</Heading>
        {!isLoggedIn ? loginForm : uploadForm}
        <VStack spacing={4} mt={6}>
          {imagesList}
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default Index;
