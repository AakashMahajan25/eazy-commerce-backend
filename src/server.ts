import app from './app'
import { PORT } from '@/config/env'
// import { ProductModel } from '@/models/productModel'

// console.log(ProductModel);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

