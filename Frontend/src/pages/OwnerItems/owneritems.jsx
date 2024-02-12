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
    Textarea,
    Stack,
    FormControl,
    FormLabel,
    Badge,
    Select,
    Checkbox,
    Spinner
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { SearchIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import Header from '../../Header/header';
import Footer from '../../Footer/footer';
import axios from "axios"
import Pagination from "../Pagination/pagination"
import { useNavigate } from 'react-router-dom';

const OwnerItems = () => {

    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const user = userInfo ? userInfo.User : null;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const [picLoading, setPicLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [loading, setLoading] = useState(true);

    const keys = ["name", "description"];
    const [originalcatalogItems, setOriginalCatalogItems] = useState([]);
    const [catalogItems, setCatalogItems] = useState([]);

    console.log(selectedItem)

    useEffect(() => {
        if (!user) navigate('/login')
    }, [user])

    const fetchallitems = async () => {
        setLoading(true);
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data, status } = await axios.post(
                "http://localhost:5000/api/items/getitems",
                {
                    id: user._id
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


    const postDetails = (pics) => {
        setPicLoading(true);
        if (pics === undefined) {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }

        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "chat-app");
            data.append("cloud_name", "dojtv6qwl");

            fetch("https://api.cloudinary.com/v1_1/dojtv6qwl/image/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    setSelectedItem({ ...selectedItem, pic: data.url.toString() })
                    setPicLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setPicLoading(false);
                });
        } else {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setPicLoading(false);
            return;
        }
    };



    const handleUpdateItem = async () => {
        const answer = window.confirm('Do you want to Update?');
        if (answer) {

            if (selectedItem.rating > 5 || selectedItem.rating < 1) {
                toast({
                    title: "Rating Should be between 1 and 5 (both included)",
                    status: "warning",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
                return;
            }

            if (selectedItem.name === '' || selectedItem.description === '' || selectedItem.price === 0 || selectedItem.photo === null || selectedItem.rating == 0) {
                toast({
                    title: "Please Fill all fields",
                    status: "warning",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
                return;
            }

            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                    },
                };

                const { data, status } = await axios.post(
                    "http://localhost:5000/api/items/updateitem",
                    {
                        "_id": selectedItem._id,
                        "name": selectedItem.name,
                        "ownerId": user._id,
                        "price": selectedItem.price,
                        "imageLink": selectedItem.pic,
                        "quantity": 1,
                        "availabilityStatus": true,
                        "description": selectedItem.description,
                        "rating": selectedItem.rating,
                        "category": selectedItem.category
                    },
                    config
                );

                if (status == 200) {

                    toast({
                        title: "Item Updated Successful",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                        position: "bottom",
                    });
                    setTimeout(() => { fetchallitems() }, 200);
                }

            } catch (error) {
                console.log("Error")
            }
        }

    }

    const SubmitupdateForm = () => {
        setTimeout(() => { handleUpdateItem() }, 500);
    }

    const removeItem = async (itemId) => {
        const answer = window.confirm('Do you want to Delete?');
        if (answer) {

            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                    },
                };

                const { data, status } = await axios.post(
                    "http://localhost:5000/api/items/deleteitem",
                    {
                        "itemId": itemId
                    },
                    config
                );

                if (status == 200) {

                    toast({
                        title: "Item Delete Successful",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                        position: "bottom",
                    });
                    setTimeout(() => { fetchallitems() }, 200);
                }

            } catch (error) {
                console.log("Error")
            }
        }
    };

    useEffect(() => {
        fetchallitems();
    }, [])

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
                        Items
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
                        {/* { */}

                        {
                            catalogItems.length ?
                                <Box>
                                    <Grid templateColumns={['1fr', '1fr', 'repeat(3, 1fr)']} gap={4}>
                                        {/* {currentItems.filter((item) => keys.some((key) => item[key].toLowerCase().includes(searchQuery.toLowerCase()))).map((item) => ( */}

                                        {currentItems.map((item) => (
                                            <GridItem key={item._id} bg="white" maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' _hover={{ bg: 'green.400', }}>
                                                <Box>
                                                    <Box>
                                                        {/* <Image src={item?.imageLink ? item?.imageLink : food} alt={item?.name} mb={4} boxSize={'80%'} aspectRatio={3 / 2} objectFit={'cover'} p={2} ml="25%" height={"100%"} /> */}
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

                                                            <Flex justify={"space-between"}>
                                                                <Box>
                                                                    <Button
                                                                        mt={5}
                                                                        colorScheme="red"
                                                                        onClick={() => removeItem(item?._id)}
                                                                    >
                                                                        Delete
                                                                    </Button>
                                                                </Box>
                                                                <Box>
                                                                    <Button
                                                                        mt={5}
                                                                        mr={2}
                                                                        colorScheme="green"
                                                                        onClick={() => {
                                                                            setSelectedItem(item);
                                                                            onOpen();
                                                                        }}
                                                                    >
                                                                        Update
                                                                    </Button>
                                                                </Box>
                                                            </Flex>
                                                        </Box>
                                                    </Box>
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
                                <Box align={'center'} color={"white"}  >
                                    -- No Items --
                                </Box>
                        }
                    </>
                    }


                </Box>
            </Flex>

            <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                {/* <ModalContent bg='gray'> */}
                <ModalContent>
                    <ModalHeader align={"center"} fontSize={40} fontWeight="bold" color="black" textTransform='uppercase'>{selectedItem?.name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody >
                        <Stack spacing={4} >

                            <FormControl id="name" isRequired>
                                <FormLabel>Name of Item</FormLabel>
                                <Input
                                    color="black"
                                    type="text"
                                    placeholder="Name of Item"
                                    value={selectedItem?.name}
                                    onChange={(e) => setSelectedItem({ ...selectedItem, name: e.target.value })}
                                />
                            </FormControl>

                            <FormControl id="description" isRequired>
                                <FormLabel>Description</FormLabel>
                                <Textarea
                                    color="black"
                                    placeholder="Description"
                                    mb={4}
                                    value={selectedItem?.description}
                                    onChange={(e) => setSelectedItem({ ...selectedItem, description: e.target.value })}
                                />
                            </FormControl>

                            <FormControl id="price" isRequired>
                                <FormLabel>Price</FormLabel>
                                <Input
                                    color="black"
                                    type="number"
                                    placeholder="Price"
                                    value={selectedItem?.price}
                                    onChange={(e) => setSelectedItem({ ...selectedItem, price: e.target.value })}
                                />
                            </FormControl>

                            <FormControl id="rating" isRequired>
                                <FormLabel>Rating</FormLabel>
                                <Input
                                    color="black"
                                    type="number"
                                    placeholder="Rating"
                                    value={selectedItem?.rating}
                                    onChange={(e) => setSelectedItem({ ...selectedItem, rating: e.target.value })}
                                />
                            </FormControl>

                            <FormControl id="pic" isRequired>
                                <FormLabel>Upload your Picture</FormLabel>
                                <Input
                                    color="black"
                                    type="file"
                                    p={1.5}
                                    accept="image/*"
                                    onChange={(e) => postDetails(e.target.files[0])}
                                />
                            </FormControl>
                            <Stack spacing={10}>
                                <Button
                                    onClick={SubmitupdateForm}
                                    bg={'green.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'green.500',
                                    }}>
                                    Update Item
                                </Button>
                            </Stack>
                        </Stack>
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

export default OwnerItems;



