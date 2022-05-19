import mongoose from 'mongoose'
import Product from "../models/Product";
const Sitemap = () => {
  return null
}

export async function getServerSideProps(context){
    context.res.setHeader('Content-Type', 'text/xml')
    // let staticPath = fs.readdirSync('pages').filter((item=>{return !['_app.js', 'api', 'order', 'category', 'product', 'sitemap.xml.js'].includes(item)})).map(item=>{return `${process.env.WEBSITE}/${item}`})
    let staticPath = ['about.js','account.js','addproduct.js','checkout.js','contact.js','forgot-password.js','index.js','login.js','orders.js','privacy-policy.js','return-refund-policy.js','services-products.js','signup.js','sitemap.xml.js','terms-conditions.js'].map((item=>{return `${process.env.WEBSITE}/${item}`}))
    if(!mongoose.connections[0].readyState){
        await mongoose.connect(process.env.MONGOURI);
    }
    let product = await Product.find();
    let productPath = product.map(item=>{return `${process.env.WEBSITE}/product/${item.productCode}`})
    let allPath = [...staticPath, ...productPath]
    context.res.write('<?xml version="1.0" encoding="UTF-8"?>')
    context.res.write('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
    allPath.map((item)=>{
        return context.res.write('<url><loc>'+item+'</loc></url>')
    })
    context.res.write('</urlset>')
    context.res.end()
    return {
        props:{
            product:{}
        }
    }
}


// export const getServerSideProps = ({ res }) => {
    // const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    //   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    //     <!-- We'll render the URLs for our sitemap here. -->
    //   </urlset>
    // `;
  
//     res.setHeader("Content-Type", "text/xml");
//     res.write(sitemap);
//     res.end();
  
//     return {
//       props: {},
//     };
//   };
export default Sitemap