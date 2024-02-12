import React, { useState, useEffect } from 'react';
import {
    Box,
    Heading,
    Grid,
    GridItem,
    Text,
    Button,
    Flex,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Image,
    InputGroup,
    InputLeftElement,
    useColorModeValue,
    Badge,
    Select,
    Checkbox,
    Spinner
    // StarIcon
} from '@chakra-ui/react';
import { SearchIcon } from "@chakra-ui/icons";
import axios from "axios";
import Header from '../../Header/header';
import Footer from '../../Footer/footer';
// import food from '../../food.png';
import { useParams } from 'react-router-dom';
import { useToast } from "@chakra-ui/react";
import Pagination from '../Pagination/pagination';
import { StarIcon } from '@chakra-ui/icons';
// import FoodBackgroundImage from '../../img4.jpg';

const Catalog = () => {

    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const params = useParams();
    var ownerid = JSON.parse(localStorage.getItem('ownerid'));
    var ownerName = JSON.parse(localStorage.getItem('ownername'));
    const [loading, setLoading] = useState(true);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));


    const keys = ["name", "description"];

    useEffect(() => {
        if (ownerid != params.id || ownerid == null) {
            localStorage.setItem("ownerid", JSON.stringify(params.id));
            localStorage.setItem("ownername", JSON.stringify(params.name));
            ownerid = params.id;
        }
    }, [])

    const fetchallitems = async () => {
        setLoading(true);
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data, status } = await axios.post(
                "http://localhost:5000/api/items/getitems", {
                id: ownerid
            },
                config
            );

            if (status == 201) {

                // setOriginalCatalogItems(data.items);
                // setCatalogItems(data.items)

                setTimeout(() => { setCatalogItems(data.items); setOriginalCatalogItems(data.items); }, 800);
                setTimeout(() => { setLoading(false) }, 800);
            }

        } catch (error) {
            setTimeout(() => { setLoading(false) }, 800);
            console.log("Error")
        }
    }

    useEffect(() => {
        fetchallitems();
    }, [])


    const AddtoCart = async (item) => {

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "authorization": `Bearer ${userInfo?.Token['token']}`
                },
            };

            const { data } = await axios.post(
                "http://localhost:5000/api/v1/cart/add",
                {
                    "ownerID": ownerid,
                    "item": item,
                    "ownerName": ownerName
                },
                config
            );

            toast({
                title: "Added Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });


        } catch (error) {

            console.log(error)
        }
    }




    const [originalcatalogItems, setOriginalCatalogItems] = useState([]);
    const [catalogItems, setCatalogItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [filterPriceRange, setFilterPriceRange] = useState('');

    useEffect(() => {
        const filteredItems = originalcatalogItems.filter(item => {
            const isMatchingSearch = keys.some(key =>
                item[key].toLowerCase().includes(searchQuery.toLowerCase())
            );

            const isPriceInRange = !filterPriceRange || item.price <= filterPriceRange;

            return isMatchingSearch && isPriceInRange;
        });

        const arr = filteredItems.filter((item) => keys.some((key) => item[key].toLowerCase().includes(searchQuery.toLowerCase())));

        if (arr.length || searchQuery)
            setCatalogItems(arr)
        else
            setCatalogItems(filteredItems)

        // setCatalogItems(filteredItems);
    }, [searchQuery, filterPriceRange, originalcatalogItems]);



    const [currentPage, setCurrentPage] = useState(0);
    const ItemsPerPage = 6;
    const totalPages = Math.ceil(catalogItems.length / ItemsPerPage)

    const indexOfLastItem = (currentPage + 1) * ItemsPerPage;
    const indexOfFirstItem = indexOfLastItem - ItemsPerPage;
    const currentItems = catalogItems.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };


    const property = {
        imageUrl: 'https://bit.ly/2Z4KKcF',
        imageAlt: 'Rear view of modern home with pool',
        beds: 3,
        baths: 2,
        title: 'Modern home in city center in the heart of historic Los Angeles',
        formattedPrice: '$1,900.00',
        reviewCount: 34,
        rating: 4,
    }


    return (
        <>
            <Header />
            <Flex
                style={{
                    // backgroundImage: `url(${})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
                minH={'80vh'}
                align={'left'}
                justify={'center'}
            // bg="gray"
            >
                <Box p={20}>
                    <Box display="flex" alignItems="center">
                        <Select
                            placeholder="Price Range"
                            value={filterPriceRange}
                            onChange={(e) => setFilterPriceRange(e.target.value)}
                            colorScheme="blue"
                            // size="lg"
                            width="14%"
                            borderColor="black"
                        >
                            <option value="">&nbsp;</option>
                            <option value="1000">Under 1000</option>
                            <option value="10000">Under 10000</option>
                            <option value="100000">Under 100000</option>
                        </Select>
                    </Box>
                    <Text fontSize={"50px"} mb={5} align={'center'} color={"black"} >
                        Catalogs
                    </Text>

                    <InputGroup   >
                        <InputLeftElement pointerEvents='none'>
                            <SearchIcon color='black' />
                        </InputLeftElement>
                        <Input
                            color="black"
                            width="1190px"
                            placeholder="Search items..."
                            mb={4}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            borderColor={"black"}

                        />
                    </InputGroup>
                    {loading ? (
                        <Spinner
                            thickness="4px"
                            speed="0.65s"
                            emptyColor="gray.200"
                            color="blue.500"
                            size="xl"
                            ml="45%"
                        />) : <>
                        {
                            catalogItems.length ?
                                <Box>
                                    <Grid templateColumns={['1fr', '1fr', 'repeat(3, 1fr)']} gap={4} width={"100%"} >
                                        {/* {currentItems.filter((item) => keys.some((key) => item[key].toLowerCase().includes(searchQuery.toLowerCase()))).map((item) => ( */}
                                        {currentItems.map((item) => (
                                            <GridItem key={item._id} bg="white" maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' _hover={{ bg: 'green.400', }}>

                                                <Box >
                                                    <Box
                                                        onClick={() => {
                                                            setSelectedItem(item);
                                                            onOpen();
                                                        }}

                                                    >
                                                        {/* <Image src={item?.imageLink ? item?.imageLink : food} alt={item?.name} mb={4} boxSize={'100%'} aspectRatio={3 / 2} objectFit={'cover'} width={"100%"} height={"100%"} /> */}
                                                        <Image src={item?.imageLink} alt={item?.name} mb={4} boxSize={'80%'} ml={"10%"} p={2} aspectRatio={3 / 2} objectFit={'cover'} height={"100%"} />


                                                        <Box p='4'>
                                                            <Box display='flex' alignItems='baseline'>
                                                                <Badge borderRadius='10px' px='2' bg='green.600'>
                                                                    <Text color="white" p={"2px"}>{item?.rating}★</Text>
                                                                </Badge>
                                                                <Box
                                                                    width="40%"
                                                                    color='black'
                                                                    fontWeight='semibold'
                                                                    letterSpacing='wide'
                                                                    fontSize='xs'
                                                                    textTransform='uppercase'
                                                                    ml='2'
                                                                >
                                                                    {item?.name}
                                                                </Box>

                                                                <Box color='black' fontWeight='semibold' width="40%" fontSize='sm'>
                                                                    ₹{item?.price} for one
                                                                </Box>

                                                            </Box>



                                                            <Box
                                                                mt='1'
                                                                fontWeight='semibold'
                                                                as='h4'
                                                                lineHeight='tight'
                                                                noOfLines={3}
                                                            >
                                                                {item?.description}
                                                            </Box>

                                                        </Box>
                                                    </Box>
                                                    <Button
                                                        mt={3}
                                                        colorScheme="blue"
                                                        onClick={(e) => { AddtoCart(item) }}
                                                        ml={"33%"}
                                                        mb={2}
                                                    >
                                                        Add to Cart
                                                    </Button>
                                                </Box>
                                                {/* </Box> */}
                                            </GridItem>
                                        ))}
                                    </Grid>

                                    {
                                        (catalogItems.length > 6) &&
                                        <Pagination totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
                                    }
                                </Box>
                                :
                                <Text align={'center'} color={"black"} fontSize={30} >
                                    -- No Items --
                                </Text>
                        }
                    </>
                    }
                </Box>
            </Flex>

            <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                {/* <ModalContent bg="green.300"> */}
                <ModalContent >
                    <ModalHeader align={"center"} fontSize={"40px"} color="black" fontWeight="bold" textTransform='uppercase'>{selectedItem?.name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' ml={10} color="white">
                            <Image src={selectedItem?.imageLink} alt={selectedItem?.name} mb={4} boxSize={'90%'} aspectRatio={3 / 2} objectFit={'cover'} p={2} ml="5%" height={"100%"} />
                            <Box ml={3} mb={2}>

                                <Box display='flex' alignItems='baseline'>
                                    <Badge borderRadius='10px' px='2' bg='green.600'>
                                        <Text color="white" p={"2px"}>{selectedItem?.rating}★</Text>
                                    </Badge>
                                    <Box
                                        width="40%"
                                        color='black'
                                        fontWeight='semibold'
                                        letterSpacing='wide'
                                        fontSize='xs'
                                        textTransform='uppercase'
                                        ml='2'
                                    >
                                        {selectedItem?.name}
                                    </Box>


                                    {/* <Box> */}
                                    <Box color='black' fontWeight='semibold' width="40%" fontSize='sm'>
                                        ₹{selectedItem?.price} for one
                                    </Box>
                                    {/* </Box> */}
                                </Box>



                                <Box
                                    mt='1'
                                    fontWeight='semibold'
                                    as='h4'
                                    lineHeight='tight'
                                    noOfLines={2}
                                    color="black"
                                >
                                    {selectedItem?.description}
                                </Box>
                            </Box>
                        </Box>

                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Footer />
        </>
    );
};

export default Catalog;



