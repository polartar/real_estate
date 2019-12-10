
const wishlistSelectors = {
  getWishlist: state => {
    return [...state.wishlist.list];
  },
}

export default wishlistSelectors;
