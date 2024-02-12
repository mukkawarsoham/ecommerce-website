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
import axios from "axios"
import FoodBackgroundImage from '../../img4.jpg';


const AcceptedOrders = () => {



    const [orders, setOrders] = useState([]);
    const [allorders, setAllOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const user = userInfo ? userInfo.User : null
    const [loading, setLoading] = useState(true);
    // const orders = [
    //     { id: 1, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Delivered' },
    //     { id: 2, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Process...' },
    //     { id: 3, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Process...' },
    //     { id: 4, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Process...' },
    //     { id: 5, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Process...' },
    //     { id: 6, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Process...' },
    //     { id: 7, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Process...' },
    //     { id: 8, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Process...' },
    //     { id: 9, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Process...' },
    //     { id: 10, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Process...' },
    //     { id: 11, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Process...' },
    //     { id: 12, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Process...' },
    //     { id: 13, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Process...' },
    //     { id: 14, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Process...' },
    //     { id: 15, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Process...' },
    //     { id: 16, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Process...' },
    //     { id: 17, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Process...' },
    //     { id: 18, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Process...' },
    //     { id: 19, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Process...' },
    //     { id: 20, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Process...' },
    //     { id: 21, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Process...' },
    //     { id: 22, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Process...' },
    //     { id: 23, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Process...' },
    //     { id: 24, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Process...' },
    //     { id: 25, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Process...' },
    //     { id: 26, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Process...' },
    //     { id: 27, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Process...' },
    //     { id: 28, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Process...' },
    //     { id: 29, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Process...' },
    //     { id: 30, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Process...' },
    //     { id: 31, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Process...' },
    //     { id: 32, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Process...' },
    //     { id: 33, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Process...' },
    //     { id: 34, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Process...' },
    //     { id: 35, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Process...' },
    // ];

    const UpdateStatus = async (orderId) => {
        const answer = window.confirm('Are you sure?');
        if (answer) {
            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                    },
                };

                const { data, status } = await axios.post(
                    "http://localhost:5000/api/orders/deliveredOrder",
                    {
                        "orderId": orderId,
                    },
                    config
                );

                if (status == 200) {
                    GetownerOrders()
                }
            } catch (error) {
                console.log(error)
            }
        }
    };

    const [currentPage, setCurrentPage] = useState(0);
    const ordersPerPage = 6;
    const totalPages = Math.ceil(orders.length / ordersPerPage)

    const indexOfLastOrder = (currentPage + 1) * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };



    const GetownerOrders = async () => {
        setLoading(true);
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${userInfo?.Token['token']}`
                },
            };

            const { data, status } = await axios.post(
                `http://localhost:5000/api/orders/getOrderByowner`,
                {
                    ownerId: user._id
                },
                config
            );


            if (status == 201) {
                // setAllOrders(data.ownerOrders)
                setTimeout(() => { setAllOrders(data.ownerOrders) }, 800);
                setTimeout(() => { setLoading(false) }, 1000);
            }

        } catch (error) {
            setTimeout(() => { setLoading(false) }, 800);
            console.log("Error")

        }
    };



    useEffect(() => {
        GetownerOrders()
    }, [])

    useEffect(() => {

        var neworders = [];
        allorders.forEach((order) => {
            if (order.orderAcceptOrDecline == "Accepted") {
                neworders.push(order)
            }
        })

        setOrders(neworders)

    }, [allorders])

    console.log(allorders)

    return (

        <>
            <Header />
            <Flex
                p={20}
                style={{
                    backgroundImage: `url(${FoodBackgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
                minHeight='100vh'
                color='white'
                align='center'
                justify='center'
            // minH={'80vh'}
            // align={'center'}
            // justify={'center'}
            // bg="gray"
            // p={20}
            >
                {loading ? (
                    <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="xl"
                    // ml="25%"
                    />) : <>
                    {
                        orders.length > 0 ? (
                            <Box
                                p={8}
                                width="80%"
                                bg="white"
                                borderRadius="md"
                                boxShadow="md"
                            >
                                <Text fontSize="50px" align={'center'} mb={6} color={"black"}>
                                    Accepted Orders
                                </Text>
                                <Table variant="striped">
                                    <Thead>
                                        <Tr >
                                            <Th>ID</Th>
                                            <Th>UserName</Th>
                                            <Th>Items</Th>
                                            <Th>Amount</Th>
                                            <Th>Status</Th>
                                            <Th>Status Update</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {currentOrders.map((order) => (
                                            <Tr key={order._id}>
                                                <Td color="black">{order?._id.slice(0, 10)}....</Td>
                                                <Td color="black">{order.userName}</Td>
                                                {/* <Td color="black">{order.items.join(', ')}</Td> */}
                                                <Td color="black" onClick={() => { setSelectedOrder(order?.cartItems); onOpen(); }} _hover={{ cursor: "pointer" }}>{order.cartItems[0].name}...</Td>
                                                <Td color="black">{order.amount}</Td>
                                                <Td color="red"><Box border={"1px solid pale"} borderRadius={"10px"} w={"75%"} p={3} color="black" bg="green.300">{order.orderStatus}</Box></Td>
                                                <Td>
                                                    <Button
                                                        isDisabled={order.orderStatus == "Processed" ? false : true}
                                                        colorScheme="green"
                                                        onClick={() => UpdateStatus(order._id)}
                                                    >
                                                        Delivered Order
                                                    </Button>
                                                </Td>
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
                            <Text p={8} fontSize="2xl" color="black" align="center">
                                -- No Orders --
                            </Text>
                        )}
                </>
                }
            </Flex>

            <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent bg="white">
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

export default AcceptedOrders;



