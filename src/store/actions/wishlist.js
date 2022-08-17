export  const addToWishList = (lists) =>{
    return{
        type: 'ADD_TO_WISHLIST',
        wishlist:lists
    }
}

export default {
    addToWishList
}

