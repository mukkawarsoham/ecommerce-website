
import { React, useEffect } from 'react';
import {
    Box,
    Heading,
    Text,
    Image,
    Flex,
    Stack,
    Button
} from '@chakra-ui/react';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import FoodBackgroundImage from '../img4.jpg';
import logo from "../logowebsite.jpg"
import manImage from "../manimage.jpg"
import { useNavigate } from 'react-router-dom';


const AboutUs = () => {



    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        if (!user) navigate('/')
    }, [user])


    return (
        <>
            <Header />
            <Flex
                p={14}
                bgImage={`url(${FoodBackgroundImage})`}
                bgSize='cover'
                bgPosition='center'
                bgRepeat='no-repeat'
                minHeight='100vh'
                // color='white'
                align='center'
                justify='center'
            >
                <Box p={10}
                    // bg='rgba(0, 0, 0, 0.8)'
                    borderRadius='md'
                >
                    <Text mb="6" fontSize="4xl" textAlign="center" fontWeight='bold'>
                        About Us
                    </Text>
                    <Flex direction={{ base: 'column', md: 'row' }} align="center" justify="center" mb="10">
                        <Image
                            boxSize={{ base: '100%', md: '300px' }}
                            objectFit="cover"
                            src={logo}
                            alt="About Us Image"
                            borderRadius="md"
                            mr={{ base: 0, md: 6 }}
                            mb={{ base: 6, md: 0 }}
                        />
                        <Stack spacing={4} textAlign={{ base: 'center', md: 'left' }}>
                            <Text fontSize="lg">
                                Welcome to our app!  Welcome to our app!  Welcome to our app!  Welcome to our app!  Welcome to our app!
                            </Text>
                            <Text fontSize="lg">
                                Welcome to our app!  Welcome to our app!  Welcome to our app!  Welcome to our app!  Welcome to our app!
                            </Text>
                            <Text fontSize="lg">
                                Welcome to our app!  Welcome to our app!  Welcome to our app!  Welcome to our app!  Welcome to our app!
                            </Text>

                        </Stack>
                    </Flex>

                    <Heading mb="6" fontSize="xl" textAlign="center" fontWeight='bold'>
                        Meet the Team
                    </Heading>
                    <Flex justify="center" flexWrap='wrap'>
                        <Box textAlign="center" p={4} mb={8}>
                            <Image
                                boxSize="150px"
                                objectFit="cover"
                                src={manImage}
                                alt="Team Member 1"
                                borderRadius="full"
                                mb={2}
                            />
                            <Text fontWeight="bold">Soham Mukkawar</Text>
                            <Text>Co-Founder</Text>
                        </Box>

                    </Flex>
                    <Flex justify="center">
                        <Button
                            colorScheme="teal"
                            size="lg"
                            mt="8"
                            onClick={() => navigate('/contact-us')}
                        >
                            Contact Us
                        </Button>
                    </Flex>
                </Box>
            </Flex>
            <Footer />
        </>
    );
};

export default AboutUs;













// import react, { useState, useEffect } from "react"
// import {
//     Flex,
//     Box,
//     Heading,
//     Text,
//     Image,
//     SimpleGrid,
//     Badge,
//     Grid,
//     GridItem,

// } from '@chakra-ui/react'
// import manImage from "../manimage.jpg"
// import Header from "../Header/header";
// import Footer from "../Footer/footer";

// const AboutUS = () => {

//     const appName = 'Sam Verma';
//     const appDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
//     const appRating = 4.5;

//     return (
//         <>
//             <Header />
//             <Flex
//                 minH={'80vh'}
//                 align={'left'}
//                 justify={'center'}
//                 bg="gray"
//             >
//                 <Box p={20}>
//                     <Box bg="green.500" p={4} color="white">
//                         <Text fontSize={"50px"} align="center">
//                             Food Delivery App
//                         </Text>
//                     </Box>
//                     <Box p={4}>
//                         <Text fontSize="xl" color="white">{appDescription}</Text>
//                         <Badge variant="solid" colorScheme="teal" fontSize="md" mt={2}>
//                             Rating: {appRating}
//                         </Badge>
//                     </Box>
//                     <Box>
//                         <Grid templateColumns={['1fr', '1fr', 'repeat(4, 1fr)']} gap={4} width={"100%"} >
//                             <GridItem>

//                                 <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' _hover={{ cursor: "pointer" }}>
//                                     <Image src={manImage} boxSize={'100%'} aspectRatio={3 / 2} objectFit={'cover'} width={"100%"} height={"100%"} />
//                                     <Box p='6'>
//                                         <Box display='flex' alignItems='baseline'>

//                                             <Box
//                                                 color='white'
//                                                 fontWeight='semibold'
//                                                 letterSpacing='wide'
//                                                 fontSize='2xl'
//                                                 textTransform='uppercase'
//                                             // ml='1'
//                                             >
//                                                 {appName}
//                                             </Box>
//                                         </Box>

//                                         <Box
//                                             mt='1'
//                                             fontWeight='semibold'
//                                             as='h4'
//                                             lineHeight='tight'
//                                             noOfLines={4}
//                                         >
//                                             {appDescription}
//                                         </Box>
//                                     </Box>
//                                 </Box>
//                             </GridItem>

//                             <GridItem>

//                                 <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' _hover={{ cursor: "pointer" }}>
//                                     <Image src={manImage} boxSize={'100%'} aspectRatio={3 / 2} objectFit={'cover'} width={"100%"} height={"100%"} />
//                                     <Box p='6'>
//                                         <Box display='flex' alignItems='baseline'>

//                                             <Box
//                                                 color='white'
//                                                 fontWeight='semibold'
//                                                 letterSpacing='wide'
//                                                 fontSize='2xl'
//                                                 textTransform='uppercase'
//                                             // ml='1'
//                                             >
//                                                 {appName}
//                                             </Box>
//                                         </Box>

//                                         <Box
//                                             mt='1'
//                                             fontWeight='semibold'
//                                             as='h4'
//                                             lineHeight='tight'
//                                             noOfLines={4}
//                                         >
//                                             {appDescription}
//                                         </Box>
//                                     </Box>
//                                 </Box>
//                             </GridItem>

//                             <GridItem>

//                                 <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' _hover={{ cursor: "pointer" }}>
//                                     <Image src={manImage} boxSize={'100%'} aspectRatio={3 / 2} objectFit={'cover'} width={"100%"} height={"100%"} />
//                                     <Box p='6'>
//                                         <Box display='flex' alignItems='baseline'>

//                                             <Box
//                                                 color='white'
//                                                 fontWeight='semibold'
//                                                 letterSpacing='wide'
//                                                 fontSize='2xl'
//                                                 textTransform='uppercase'
//                                             // ml='1'
//                                             >
//                                                 {appName}
//                                             </Box>
//                                         </Box>

//                                         <Box
//                                             mt='1'
//                                             fontWeight='semibold'
//                                             as='h4'
//                                             lineHeight='tight'
//                                             noOfLines={4}
//                                         >
//                                             {appDescription}
//                                         </Box>
//                                     </Box>
//                                 </Box>
//                             </GridItem>

//                             <GridItem>

//                                 <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' _hover={{ cursor: "pointer" }}>
//                                     <Image src={manImage} boxSize={'100%'} aspectRatio={3 / 2} objectFit={'cover'} width={"100%"} height={"100%"} />
//                                     <Box p='6'>
//                                         <Box display='flex' alignItems='baseline'>

//                                             <Box
//                                                 color='white'
//                                                 fontWeight='semibold'
//                                                 letterSpacing='wide'
//                                                 fontSize='2xl'
//                                                 textTransform='uppercase'
//                                             // ml='1'
//                                             >
//                                                 {appName}
//                                             </Box>
//                                         </Box>

//                                         <Box
//                                             mt='1'
//                                             fontWeight='semibold'
//                                             as='h4'
//                                             lineHeight='tight'
//                                             noOfLines={4}
//                                         >
//                                             {appDescription}
//                                         </Box>
//                                     </Box>
//                                 </Box>
//                             </GridItem>

//                         </Grid>
//                     </Box>
//                 </Box>
//             </Flex>
//             <Footer />
//         </>
//     )
// }

// export default AboutUS;

