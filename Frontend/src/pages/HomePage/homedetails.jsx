import react, { useState, useEffect } from "react"
import {
    Flex,
    Box,
    Text,
    Image,
    Badge,
    Grid,
    GridItem,

} from '@chakra-ui/react'

import manImage from "../../manimage.jpg"
import FoodBackgroundImage from '../../img4.jpg';

const Homedetails = () => {

    const appName = 'Sam Verma';
    const appDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    const appRating = 4.5;

    return (
        <>
            <Flex
                minH={'80vh'}
                align={'left'}
                justify={'center'}
            // bg="gray"
            >
                <Box p={20}>
                    <Box bg="green.500" p={4} color="white">
                        <Text fontSize={"50px"} align="center">
                            Ecommerce  Website
                        </Text>
                    </Box>
                    <Box p={4}>
                        <Text fontSize="xl" color="black">{appDescription}</Text>
                        <Badge variant="solid" colorScheme="teal" fontSize="md" mt={2}>
                            Rating: {appRating}
                        </Badge>
                    </Box>
                    <Box>
                        <Grid templateColumns={['1fr', '1fr', 'repeat(4, 1fr)']} gap={4} width={"100%"} >
                            <GridItem>

                                <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' _hover={{ cursor: "pointer" }}>
                                    <Image src={manImage} boxSize={'100%'} aspectRatio={3 / 2} objectFit={'cover'} width={"100%"} height={"100%"} />
                                    <Box p='6'>
                                        <Box display='flex' alignItems='baseline'>

                                            <Box
                                                color='white'
                                                fontWeight='semibold'
                                                letterSpacing='wide'
                                                fontSize='2xl'
                                                textTransform='uppercase'
                                            // ml='1'
                                            >
                                                {appName}
                                            </Box>
                                        </Box>

                                        <Box
                                            mt='1'
                                            fontWeight='semibold'
                                            as='h4'
                                            lineHeight='tight'
                                            noOfLines={4}
                                        >
                                            {appDescription}
                                        </Box>
                                    </Box>
                                </Box>
                            </GridItem>

                            <GridItem>

                                <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' _hover={{ cursor: "pointer" }}>
                                    <Image src={manImage} boxSize={'100%'} aspectRatio={3 / 2} objectFit={'cover'} width={"100%"} height={"100%"} />
                                    <Box p='6'>
                                        <Box display='flex' alignItems='baseline'>

                                            <Box
                                                color='white'
                                                fontWeight='semibold'
                                                letterSpacing='wide'
                                                fontSize='2xl'
                                                textTransform='uppercase'
                                            // ml='1'
                                            >
                                                {appName}
                                            </Box>
                                        </Box>

                                        <Box
                                            mt='1'
                                            fontWeight='semibold'
                                            as='h4'
                                            lineHeight='tight'
                                            noOfLines={4}
                                        >
                                            {appDescription}
                                        </Box>
                                    </Box>
                                </Box>
                            </GridItem>

                            <GridItem>

                                <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' _hover={{ cursor: "pointer" }}>
                                    <Image src={manImage} boxSize={'100%'} aspectRatio={3 / 2} objectFit={'cover'} width={"100%"} height={"100%"} />
                                    <Box p='6'>
                                        <Box display='flex' alignItems='baseline'>

                                            <Box
                                                color='white'
                                                fontWeight='semibold'
                                                letterSpacing='wide'
                                                fontSize='2xl'
                                                textTransform='uppercase'
                                            // ml='1'
                                            >
                                                {appName}
                                            </Box>
                                        </Box>

                                        <Box
                                            mt='1'
                                            fontWeight='semibold'
                                            as='h4'
                                            lineHeight='tight'
                                            noOfLines={4}
                                        >
                                            {appDescription}
                                        </Box>
                                    </Box>
                                </Box>
                            </GridItem>

                            <GridItem>

                                <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' _hover={{ cursor: "pointer" }}>
                                    <Image src={manImage} boxSize={'100%'} aspectRatio={3 / 2} objectFit={'cover'} width={"100%"} height={"100%"} />
                                    <Box p='6'>
                                        <Box display='flex' alignItems='baseline'>

                                            <Box
                                                color='white'
                                                fontWeight='semibold'
                                                letterSpacing='wide'
                                                fontSize='2xl'
                                                textTransform='uppercase'
                                            // ml='1'
                                            >
                                                {appName}
                                            </Box>
                                        </Box>

                                        <Box
                                            mt='1'
                                            fontWeight='semibold'
                                            as='h4'
                                            lineHeight='tight'
                                            noOfLines={4}
                                        >
                                            {appDescription}
                                        </Box>
                                    </Box>
                                </Box>
                            </GridItem>

                        </Grid>
                    </Box>
                </Box>
            </Flex>
        </>
    )
}

export default Homedetails;

