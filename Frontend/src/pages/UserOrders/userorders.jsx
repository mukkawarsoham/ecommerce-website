import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Flex,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Image,
    Badge,
    Spinner
} from '@chakra-ui/react';

import Header from '../../Header/header';
import Footer from '../../Footer/footer';
import Pagination from '../Pagination/pagination';
import BackgroundImage from '../../img4.jpg';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
const UserOrders = () => {



    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const user = userInfo ? userInfo.User : null
    const path = window.location.pathname;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) navigate('/login')
    }, [user])

    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState([]);


    const GetUserOrders = async () => {
        setLoading(true);
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${userInfo?.Token['token']}`
                },
            };

            const { data, status } = await axios.post(
                `http://localhost:5000/api/orders/getOrderByUser`,
                {
                    userId: user._id
                },
                config
            );


            if (status == 201) {

                setTimeout(() => { setOrders(data.userOrders) }, 800);
                setTimeout(() => { setLoading(false) }, 1000);
            }

        } catch (error) {
            setTimeout(() => { setLoading(false) }, 800);
            console.log("Error")

        }
    };


    useEffect(() => {
        GetUserOrders()
    }, [])


    const [currentPage, setCurrentPage] = useState(0);
    const ordersPerPage = 6;
    const totalPages = Math.ceil(orders?.length / ordersPerPage)

    const indexOfLastOrder = (currentPage + 1) * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders?.slice(indexOfFirstOrder, indexOfLastOrder);

    const { isOpen, onOpen, onClose } = useDisclosure();


    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };


    return (
        <>

            <Header />
            <Flex
                p={5}
                style={{
                    backgroundImage: `url(${BackgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
                minHeight='100vh'
                color='white'
                align='center'
                justify='center'
            >
                {loading ? (
                    <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="xl"
                    />) : <>
                    {
                        orders.length > 0 ? (
                            <Box p={3} width="80%" bg="white" borderRadius="md" boxShadow="md">
                                <Box display={"flex"} align="center" justify="center" ml={"45%"}>

                                    <Text fontSize={"50px"} align={'center'} mb={6} color={"black"}>
                                        Orders
                                    </Text>
                                </Box>

                                <Table variant="striped">
                                    <Thead >
                                        <Tr >
                                            <Th>ID</Th>
                                            <Th>owner Name</Th>
                                            <Th>Items</Th>
                                            <Th>Amount</Th>
                                            <Th>Status</Th>

                                        </Tr>
                                    </Thead>

                                    <Tbody>
                                        {currentOrders.map((order) => (
                                            <Tr key={order.id}>
                                                <Td color="black">{order?._id.slice(0, 10)}...</Td>
                                                <Td color="black">{order.ownerName}</Td>
                                                <Td color="black" onClick={() => { setSelectedOrder(order?.cartItems); onOpen(); }} _hover={{ cursor: "pointer" }}>{order.cartItems[0].name}...</Td>
                                                <Td color="black">{order.amount}</Td>
                                                <Td color="red"><Box border={"1px solid pale"} borderRadius={"10px"} w={"45%"} p={3} color="white" bg="green.500">{order.orderAcceptOrDecline == "Rejected" ? order.orderAcceptOrDecline : order.orderStatus}</Box></Td>

                                            </Tr>
                                        ))}
                                    </Tbody>

                                </Table>
                                {orders.length > 6 && (
                                    <Pagination
                                        totalPages={totalPages}
                                        currentPage={currentPage}
                                        handlePageChange={handlePageChange}
                                    />
                                )}

                            </Box>
                        ) : (
                            <Text p={8} fontSize="2xl" color="white" align="center">
                                -- There are no orders from you. --
                            </Text>
                        )}
                </>
                }
            </Flex>

            <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader align={"center"} fontSize={"40px"} color="white" fontWeight="bold" >{selectedOrder?.ownerName}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' ml={10} color="white">
                            <Table variant="striped">
                                <Thead >
                                    <Tr >

                                        <Th color="black">Item Name</Th>
                                        <Th color="black">Price</Th>
                                        <Th color="black">Quantity</Th>

                                    </Tr>
                                </Thead>
                                <Tbody >
                                    {selectedOrder.map((item) => (
                                        <Tr key={item._id}>
                                            <Td color="black">{item.name}</Td>
                                            <Td color="black">{item.price}</Td>
                                            <Td color="black">{item.quantity}</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={() => { onClose(); setSelectedOrder([]) }}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Footer />
        </>
    );
};

export default UserOrders;



