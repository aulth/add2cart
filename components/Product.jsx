import React, {useEffect} from 'react'
import ProductItem from './ProductItem'
import ErrorPage from 'next/error'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Product = (props) => {
    let { count, products } = props
    count = parseInt(count)
    useEffect(() => {
        
    }, [])
    
    return (
        <>
            {
                products &&
                <>
                    <section className="text-gray-600 body-font">
                        <ToastContainer />
                        <div className="container px-5 py-10 mx-auto">
                            <div className="flex flex-wrap -m-4">
                                {
                                    Object.keys(products).map((key) => {
                                        return <ProductItem key={key} product={products[key]} />
                                    })
                                }
                            </div>
                        </div>
                    </section>
                </>
            }
            {
                !products && <ErrorPage statusCode={404} />
            }
        </>
    )
}

export default Product