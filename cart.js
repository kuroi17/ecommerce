export const TempHolder = [];
export const cart = [];

export function AddToCart(productId, matchingitem) {
  if (!matchingitem) {
    matchingitem = {
      menuDataId: productId,
      quantity: 1,
    };
    TempHolder.push(matchingitem);
  } else {
    matchingitem.quantity += 1;
  }
  return matchingitem;
}

export function RemoveFromCart(productId, matchingitem) {
  if (!matchingitem) {
    return;
  } else {
    matchingitem.quantity -= 1;

    if (matchingitem.quantity <= 0) {
      function findMenuItemIndex(item) {
        return item.menuDataId === productId;
      } // return indexes
      const index = TempHolder.findIndex(findMenuItemIndex);
      if (index !== -1) {
        TempHolder.splice(index, 1);
      }
    }
  }
}

export function SaveToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
export function LoadFromLocalStorage() {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    const parsedCart = JSON.parse(storedCart);
    cart.length = 0;
    cart.push(...parsedCart);
  }
}

export function ClearCart(productId) {
  const idx = cart.findIndex(item => item.menuDataId === productId);
  if (idx !== -1){
    cart.splice(idx, 1);
    SaveToLocalStorage();
    return true;
  }
  return false;
}
