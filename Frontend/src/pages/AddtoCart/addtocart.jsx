import React, { useState, useEffect } from "react";
import {
    Box,
    Flex,
    Heading,
    HStack,
    Stack,
    Text,
    Button,
    Image,
    Center,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Spinner
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Footer from "../../Footer/footer";
import Header from "../../Header/header";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import image from '../../img4.jpg';

const AddToCart = () => {

    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const ownerid = JSON.parse(localStorage.getItem('ownerid'));
    const user = userInfo ? userInfo.User : null;
    const [amount, setAmount] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const toast = useToast();
    var ownerName = JSON.parse(localStorage.getItem('ownername'));


    useEffect(() => {
        if (!user) navigate('/login');
    }, [user]);


    const GetAllItems = async () => {

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${userInfo?.Token['token']}`
                },
            };

            const { data } = await axios.post(
                `http://localhost:5000/api/v1/cart/owner/${ownerid}`,
                {
                    userID: user._id
                },
                config
            );

            var amount1 = 0;
            for (let i = 0; i < data.items.length; i++) {
                amount1 += (data.items[i].price) * (data.items[i].quantity)
            }

            setAmount(amount1)
            setCartItems(data.items);


        } catch (error) {
            console.log(error)
        }
    };


    const increaseQuantity = async (item) => {

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${userInfo?.Token['token']}`
                },
            };

            const { data, status } = await axios.post(
                `http://localhost:5000/api/v1/cart/add`,
                {
                    "ownerID": ownerid,
                    "item": item
                },
                config
            );

            if (status == 200) {
                GetAllItems();
            }

        } catch (error) {
            console.log(error)
        }
    };

    const decreaseQuantity = async (item) => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${userInfo?.Token['token']}`
                },
            };

            const { data, status } = await axios.post(
                `http://localhost:5000/api/v1/cart/remove`,
                {
                    "ownerID": ownerid,
                    "item": item
                },
                config
            );

            if (status == 200) {
                GetAllItems();
            }

        } catch (error) {
            console.log(error)
        }
    };

    const removeItem = async (item) => {
        // alert("hello")
        try {
            console.log(item, ownerid)
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${userInfo?.Token['token']}`
                },
            };

            const { data, status } = await axios.delete(
                `http://localhost:5000/api/v1/cart/erase?itemID=${item.itemID}&ownerID=${ownerid}`,
                config
            );
            console.log(data, "sttata")
            if (status == 200) {
                GetAllItems();
            }

        } catch (error) {
            console.log(error)
        }
    };

    const Payment = async () => {
        const answer = window.confirm('Are you sure?');
        if (answer) {

            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                    },
                };

                const { data, status } = await axios.post(
                    "http://localhost:5000/api/orders/addOrder",
                    {
                        "userId": user._id,
                        "ownerId": ownerid,
                        "ownerName": ownerName,
                        "userName": user.userName,
                        "cartItems": cartItems,
                        "amount": amount,
                    },
                    config
                );

                if (status == 201) {
                    toast({
                        title: "Order Placed Successful",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                        position: "bottom",
                    });
                    DirectDeleteCart();
                    navigate(`/congrats/${data?.order._id}`)
                }

            } catch (error) {
                toast({
                    title: "unable to Placed Order ",
                    description: error.response.data.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
            }
        }
    };


    const DeleteCart = async () => {

        const answer = window.confirm('Are you sure?');
        if (answer) {

            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": `Bearer ${userInfo?.Token['token']}`
                    },
                };

                const { data, status } = await axios.delete(
                    `http://localhost:5000/api/v1/cart/owner/${ownerid}`,
                    config
                );

                if (status == 202) {
                    toast({
                        title: "Cart Deleted Successful",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                        position: "bottom",
                    });
                    GetAllItems();
                }

            } catch (error) {
                toast({
                    title: "unable to Placed Order ",
                    description: error.response.data.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
            }
        }
    };

    const DirectDeleteCart = async () => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${userInfo?.Token['token']}`
                },
            };

            const { data, status } = await axios.delete(
                `http://localhost:5000/api/v1/cart/${ownerid}`,
                config
            );

        } catch (error) {
            console.log(error)
        }
    };



    useEffect(() => {
        GetAllItems()
    }, []);


    return (
        <>
            <Header />
            <Flex
                style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
                minHeight='100vh'
                color='white'
                align='center'
                justify='center'
                p={20}
            >
                <Box width={"100%"} padding={30} align={'center'} justify={'center'}>
                    {
                        cartItems.length > 0 &&
                        <Text fontSize={"50px"} align={'center'} color={"black"} mb={3}>
                            Catalogs Added
                        </Text>
                    }
                    <Flex>
                        <Box display={"flex"} w="70%">
                            <Box w="80%">
                                {cartItems.map((item) => (
                                    <Flex
                                        key={item.id}
                                        justify="space-between"
                                        mb={4}
                                        p={4}
                                        bg="white"
                                        boxShadow="md"
                                        borderRadius="md"
                                    >
                                        <Text fontSize="xl" color="black">{item.name}</Text>
                                        <Image
                                            rounded="lg"
                                            width="120px"
                                            height="120px"
                                            fit="cover"
                                            src={item.imageLink}
                                            alt={item.name}
                                            draggable="false"
                                            loading="lazy"
                                        />
                                        <Flex alignItems="center">
                                            <Button onClick={() => decreaseQuantity(item)} size="sm" variant="outline">
                                                -
                                            </Button>
                                            <Text mx={2} color="black">{item.quantity}</Text>
                                            <Button onClick={() => increaseQuantity(item)} size="sm" variant="outline">
                                                +
                                            </Button>
                                            <Button onClick={() => removeItem(item)} colorScheme="red" size="sm" m={1}>
                                                Remove
                                            </Button>
                                        </Flex>
                                    </Flex>
                                ))}
                            </Box>
                            {
                                cartItems.length === 0 &&
                                <Box textAlign="center" pt={6} w="100%" mr={"15%"} >
                                    <Text fontSize={"50px"} color="black" align={"center"}>Cart is empty</Text>
                                </Box>
                            }
                            {cartItems.length > 0 &&
                                <Box w="50%" pl={4}>
                                    <Flex
                                        direction="column"
                                        justify="space-between"
                                        mb={4}
                                        p={4}
                                        bg="white"
                                        boxShadow="md"
                                        borderRadius="md"
                                        height="350px"

                                    >
                                        <Stack spacing="4" align="left">
                                            <Text fontSize="xl" color="black" fontWeight="semibold">Order Summary</Text>
                                            <HStack justify="space-between">
                                                <Text fontSize="lg" fontWeight="semibold" color="black">Subtotal:</Text>
                                                <Text fontSize="lg" color="black">{amount}Rs</Text>
                                            </HStack>
                                            <HStack justify="space-between">
                                                <Text fontSize="lg" fontWeight="semibold" color="black">Shipping + Tax:</Text>
                                                <Text fontSize="lg" align="right" color="black">Calculate shipping</Text>
                                            </HStack>
                                            <HStack justify="space-between">
                                                <Text fontSize="lg" fontWeight="semibold" color="black">Coupon Code:</Text>
                                                <Text fontSize="lg" color="black">Add coupon code</Text>
                                            </HStack>
                                            <HStack justify="space-between">
                                                <Text fontSize="lg" fontWeight="semibold" color="black">Total:</Text>
                                                <Text fontSize="lg" color="black">{amount}Rs</Text>
                                            </HStack>
                                            <Box>
                                                <Button colorScheme="green" size="lg" fontSize="md" width={320} onClick={Payment}>
                                                    Payment
                                                </Button>
                                            </Box>
                                            <Box>
                                                <Button size="lg" fontSize="md" width={320} onClick={DeleteCart}>
                                                    Delete Cart
                                                </Button>
                                            </Box>
                                        </Stack>
                                    </Flex>
                                </Box>}
                        </Box>
                    </Flex>
                </Box>
            </Flex>
            <Footer />
        </>
    );
};

export default AddToCart;
