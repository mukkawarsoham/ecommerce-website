import react, { useState, useEffect } from "react"
import {
    Flex,
    Box,
    Heading,
    Text,
    Image,
    SimpleGrid,
    Badge
} from '@chakra-ui/react'
import Pagination from "../Pagination/pagination";
import shop from "../../shop.jpg"

const HomePageOwner = () => {

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const user = userInfo ? userInfo.User : null

    const ownerDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    const ownerRating = 4.5;

    const ownerImages = [
        shop,
        shop,
        shop,
        shop,
        shop,
        shop,
        shop,

    ];


    const [currentPage, setCurrentPage] = useState(0);
    const ownerImagesPerPage = 6;
    const totalLength = ownerImages.length;
    const totalPages = Math.ceil(totalLength / ownerImagesPerPage)

    const indexOfLastownerImage = (currentPage + 1) * ownerImagesPerPage;
    const indexOfFirstownerImage = indexOfLastownerImage - ownerImagesPerPage;
    const currentownerImages = ownerImages.slice(indexOfFirstownerImage, indexOfLastownerImage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };




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
                            {user?.userName == undefined ? user?.username : user?.userName}
                        </Text>
                    </Box>
                    <Box p={4}>
                        <Text fontSize="xl" color="black">{ownerDescription}</Text>
                        <Badge variant="solid" colorScheme="teal" fontSize="md" mt={2}>
                            Rating: {ownerRating}
                        </Badge>
                    </Box>
                    <Box>
                        <SimpleGrid columns={[1, 2, 3]} gap={4} p={4}>
                            {currentownerImages.map((image, index) => (
                                <Image key={index} src={image} alt={`owner Image ${index + 1}`} aspectRatio={3 / 2} objectFit={'cover'} width="100%" height="100%" border="10px" />
                            ))}
                        </SimpleGrid>
                        {
                            (totalLength > 6) &&
                            <Pagination totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
                        }
                    </Box>

                </Box>
            </Flex>
        </>
    )
}

export default HomePageOwner;

