const { default: axios } = require("axios");
const axiosClient = axios.create({
    baseURL: "http://192.168.82.26:1337/api"
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

const getProductsByCategory = async (category) => await axiosClient.get('/products?filters?[categories][name][$in]=' + category + "&populate=*").then((res) => {
    console.log(res.data.data)
    return res.data.data
})
export default {
    getCategory,
    getSlider,
    getCategoryList,
    getAllProducts,
    getProductsByCategory
}