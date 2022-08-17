const WishListRecuder = (state = null, action) => {
    switch (action.type) {
      case 'ADD_TO_WISHLIST':
        return action.wishlist
  
        default:
        return state
    }
  }
  
  export default WishListRecuder


  