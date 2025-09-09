export const TempHolder = [];
export const cart = [
  {
    menuDataId: "chickenjoy",
    quantity: 2,
  },
  {
    menuDataId: "spaghetti",
    quantity: 1,
  },
];

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
