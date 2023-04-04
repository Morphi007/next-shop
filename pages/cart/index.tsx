import { CartList, OrderSummary } from "@/components/cart"
import { ShopLayaout } from "@/components/layout"
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from "@mui/material"

type Props = {}

const CartPage = (props: Props) => {
  return (
    <ShopLayaout  title={"carrito"} pageDescription={"Carrito de compra de la tienda"}>
          <Typography variant="h1" component="h1">Carrito</Typography>     
          <Grid container>
            <Grid item xs={12} sm={7}>
                 <CartList editable={true}/>
          </Grid>
            <Grid item  xs={12} sm={5}>
                 <Card className="summary-card">
                    <CardContent>
                        <Typography variant="h2">Orden</Typography>
                        <Divider sx={{my:1}}/>u
                        {/*summary orden */}
                        <OrderSummary/>
                        <Box sx={{mt:3}}>
                            <Button color="secondary" className="circular-btn" fullWidth>Checkout</Button>

                        </Box>
                    </CardContent>
                 </Card>
            </Grid>
          </Grid>   
    </ShopLayaout>
  )
}

export default CartPage