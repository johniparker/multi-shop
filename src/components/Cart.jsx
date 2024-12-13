import { useState } from "react";
import { useCart } from "../context/CartContext";
import {
  Grid,
  Typography,
  Box,
  List,
  Button,
  ListItem,
  ListItemText,
} from "@mui/material";

const Cart = () => {
  const {
    cart,
    totalPrice,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    checkout,
  } = useCart();

  return (
    <Box
      sx={{
        width: { xs: "100%", sm: 300 }, // Full width on small screens, fixed width otherwise
        position: { xs: "relative", sm: "fixed" }, // Stacked on small screens, fixed on larger ones
        top: { sm: 64 }, // Below the header on larger screens
        right: 0,
        bottom: 0,
        bgcolor: "background.paper",
        boxShadow: 3,
        p: 2,
        overflowY: "auto",
        zIndex: 1000, // Above other content
      }}
    >
      <Typography variant="h6" sx={{ color: "black" }}>
        Cart
      </Typography>
      <List>
        {cart.map((item) => (
          <ListItem key={item.product.id}>
            <ListItemText
              primary={`${item.product.title} - ${item.quantity} x $${item.product.price}`}
              sx={{ color: "black" }}
            />
            <Button onClick={() => increaseQuantity(item.product.id)}>+</Button>
            <Button onClick={() => decreaseQuantity(item.product.id)}>-</Button>
            <Button onClick={() => removeFromCart(item.product.id)}>
              Remove
            </Button>
          </ListItem>
        ))}
      </List>
      <Typography variant="h6" sx={{ color: "black" }}>
        Total Price: ${totalPrice.toFixed(2)}
      </Typography>
      <Button onClick={checkout} variant="contained">
        Checkout
      </Button>
    </Box>
  );
};

export default Cart;
