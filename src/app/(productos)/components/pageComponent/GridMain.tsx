import CardProduct from "./CardProduct"

interface PropsGridMain {
    products: Array<any>
}

const GridMain = ({products}:PropsGridMain): JSX.Element => {
  
  return (
    <div className="grid grid-cols-4 gap-6 basis-4/5 px-4">
        {
            products.map( product =>(
                <CardProduct product={product} key={product.id}/>
            ) )
        }
    </div>
  )
}

export default GridMain