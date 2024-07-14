
const { default: axios } = require("axios");
const axiosClient = axios.create({
    baseURL: "http://localhost:1337/api", headers: {
        'Content-Type': 'application/json',
    },
})

const getCategory = () => axiosClient.get('/categories?populate=*').then((res) => { return res.data.data })

const getSlider = () => axiosClient.get("/sliders?populate=*").then((res) => {
    // console.log(res.data.data)
    return res.data.data
})

const getCategoryList = () => axiosClient.get('/categories?populate=*').then((res) => {
    // console.log(res.data.data)
    return res.data.data
})

const getAllProducts = () => axiosClient.get('/products?populate=*').then((res) => {
    // console.log(res.data.data)
    return res.data.data
})

const getProductsByCategory = async (category) => await axiosClient.get('/products?filters[categories][name][$in]=' + category + "&populate=*").then(res => {
    return res.data.data
})

const registerUser = async (username, email, password) => {
    try {
        const response = await axiosClient.post('/auth/local/register', {
            username,
            email,
            password,
        });
        console.log('Registration successful:', response.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error response data:', error.response.data);
            console.error('Error response status:', error.response.status);
            console.error('Error response headers:', error.response.headers);
            alert(`Error: ${error.response.data.message || 'Registration failed'}`);
        } else if (error.request) {
            console.error('Error request:', error.request);
            alert('No response received from the server.');
        } else {
            console.error('Error message:', error.message);
            alert(`Error: ${error.message}`);
        }
        console.error('Error config:', error.config);
    }
}

const signIn = (email, password) => axiosClient.post('/auth/local', {
    identifier: email,
    password: password
})

// const addToCart = async (data, jwt) => {
//     await axiosClient.post('/user-carts', data, {
//         headers: {
//             Authorization: 'Bearer' + jwt
//         }
//     })
// }

const getCartItems = (userId, jwt) => axiosClient.get('/user-carts?filters[userId][$eq]=' + userId + '&[populate][products][populate][images][populate][0]=url', {
    headers: {
        Authorization: 'Bearer' + jwt
    }
}).then(res => {
    const data = res.data.data;
    const cartItemsList = data.map((item, index) => ({
        name: item?.attributes?.products?.data[0]?.attributes?.name,
        quantity: item?.attributes?.quantity,
        amount: item?.attributes?.amount,
        imageUrl: item?.attributes?.products?.data[0]?.attributes?.images?.data[0]?.attributes?.url,
        actualPrice: item?.attributes?.products?.data[0]?.attributes?.mrp,
        id: item.id,
        product: item?.attributes?.products?.data[0]?.id

    }))
    // console(cartItemsList)
    return cartItemsList
})

const deleteCartItem = (id, jwt) => axiosClient.delete('/user-carts/' + id, {
    headers: {
        Authorization: 'Bearer' + jwt
    }
})

const createOrder = (data, jwt) => axiosClient.post('/orders', data, {
    headers: {
        Authorization: 'Bearer' + jwt
    }
})

const getMyOrder = (userId, jwt) => axiosClient.get('/orders?filters[userId][$eq]=' + userId + 'populate[orderItemList][product][populate][images]=url').then(resp => {
    const response = resp.data.data;
    const orderList = response.map(item => ({
        id: item.id,
        totalOrderAmount: item?.attributes?.totalOrderAmount,
        orderItemList: item?.attributes?.orderItemList
    }))
    console.log("orderlist is: " + orderList)
    return orderList
})

export default {
    getCategory,
    getSlider,
    getCategoryList,
    getAllProducts,
    getProductsByCategory,
    registerUser,
    signIn,
    // addToCart
    getCartItems,
    deleteCartItem,
    createOrder,
    getMyOrder
}