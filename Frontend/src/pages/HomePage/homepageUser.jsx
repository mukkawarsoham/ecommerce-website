import react, { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import { Input, InputGroup } from "@chakra-ui/input";
import {
    Flex,
    Box,
    Heading,
    Text,
    Grid,
    GridItem,
    InputLeftElement,
    Badge,
    Select,
    Checkbox,
    Spinner
} from '@chakra-ui/react'
import axios from "axios";
import { SearchIcon } from "@chakra-ui/icons";
import Pagination from "../Pagination/pagination";
import { StarIcon } from '@chakra-ui/icons';
import FoodBackgroundImage from '../../img4.jpg';
const HomePageUser = () => {


    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const ownerid = JSON.parse(localStorage.getItem('ownerid'));
    const keys = ["userName"]
    const description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. PageMaker including versions of Lorem Ipsum"


    const [originalowners, setOriginalowners] = useState([]);
    const [owners, setowners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (ownerid) {
            localStorage.removeItem("ownerid");
            localStorage.removeItem("ownername");
        }
    }, [])

    const [currentPage, setCurrentPage] = useState(0);
    const ownersPerPage = 6;
    const totalPages = Math.ceil(owners.length / ownersPerPage)

    const indexOfLastowner = (currentPage + 1) * ownersPerPage;
    const indexOfFirstowner = indexOfLastowner - ownersPerPage;
    const currentowners = owners.slice(indexOfFirstowner, indexOfLastowner);


    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const fetchallowners = async () => {
        setLoading(true);
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data, status } = await axios.get(
                "http://localhost:5000/api/auth/owners",
                config
            );

            console.log(data.owners[0])
            if (status == 200) {
                // setOriginalowners(data.owners)
                // setowners(data.owners);
                setTimeout(() => { setowners(data.owners); setOriginalowners(data.owners); }, 700);
                setTimeout(() => { setLoading(false) }, 500);
            }

        } catch (error) {
            setTimeout(() => { setLoading(false) }, 500);
            console.log("Error")
        }
    }

    useEffect(() => {
        fetchallowners();
    }, [])

    useEffect(() => {
        const filteredowners = originalowners.filter(item => {
            const isMatchingSearch = keys.some(key =>
                item[key].toLowerCase().includes(searchQuery.toLowerCase())
            );
            return isMatchingSearch;
        });

        const arr = filteredowners.filter((item) => keys.some((key) => item[key].toLowerCase().includes(searchQuery.toLowerCase())));

        if (arr.length || searchQuery)
            setowners(arr)
        else
            setowners(filteredowners)
    }, [searchQuery, originalowners]);


    return (
        <>
            <Flex
                minH={'80vh'}
                align={'left'}
                justify={'center'}
            // bg="gray"
            >
                <Box p={20}>

                    <Text fontSize={"50px"} mb={5} align={'center'} color={"black"} >
                        Owners
                    </Text>

                    <InputGroup   >
                        <InputLeftElement pointerEvents='none'>
                            <SearchIcon color='gray.300' />
                        </InputLeftElement>
                        <Input
                            textColor={"black"}
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
                            owners.length ?
                                <Box>
                                    <Grid templateColumns={['1fr', '1fr', 'repeat(3, 1fr)']} gap={4} width="100%">
                                        {/* {currentowners.filter((owner) => keys.some((key) => owner[key].toLowerCase().includes(searchQuery.toLowerCase()))).map((owner) => ( */}
                                        {currentowners.map((owner) => (
                                            <GridItem key={owner.id} height="50%" maxH={"50%"} >
                                                <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' _hover={{ bg: 'green.100', cursor: "pointer" }} >
                                                    <Box p='6' onClick={() => { navigate(`/catalog/${owner._id}/${owner.userName}`) }} >
                                                        <Text fontSize={"50px"} mb={2} align="center" textTransform='uppercase' color="black">
                                                            {owner.userName}
                                                        </Text>
                                                        <Box display='flex' alignItems='baseline'>

                                                            <Badge borderRadius='full' px='2' colorScheme='teal'>
                                                                New
                                                            </Badge>
                                                            <Box
                                                                color='black'
                                                                fontWeight='semibold'
                                                                letterSpacing='wide'
                                                                fontSize='xs'
                                                                textTransform='uppercase'
                                                                ml='2'
                                                            >
                                                                {owner?.userName}
                                                            </Box>

                                                            <Box
                                                                width="40%"
                                                                color='white'
                                                                fontWeight='semibold'
                                                                fontSize='xs'
                                                                align={"right"}
                                                            >
                                                                <Badge borderRadius='10px' px='2' bg='green.600'>
                                                                    <Text color="white" p={"2px"}>3★</Text>
                                                                </Badge>
                                                            </Box>
                                                        </Box>

                                                        <Box
                                                            mt='1'
                                                            fontWeight='semibold'
                                                            as='h4'
                                                            lineHeight='tight'
                                                            noOfLines={5}
                                                        >
                                                            {description}
                                                            {/* {owner?.description} */}
                                                        </Box>


                                                        <Box display='flex' mt='2' alignItems='center'>
                                                            {Array(5)
                                                                .fill('')
                                                                .map((_, i) => (
                                                                    <StarIcon
                                                                        key={i}
                                                                        color={i < 3 ? 'teal.500' : 'gray.300'}
                                                                    />
                                                                ))}
                                                            {/* <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                                                            {item?.reviews.length} reviews
                                                        </Box> */}
                                                        </Box>

                                                    </Box>
                                                </Box>
                                            </GridItem>

                                        ))}
                                    </Grid>
                                    {
                                        (owners.length > 6) &&
                                        <Pagination totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />

                                    }
                                </Box> :
                                <Box align={'center'} color={"white"}  >
                                    -- No owners Listed --
                                </Box>
                        }
                    </>
                    }
                </Box>
                {/* ========================================================================================================================================================================= */}
            </Flex>
        </>
    )
}

export default HomePageUser;

