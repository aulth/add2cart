import React from 'react'
import Head from 'next/head'
const ReturnPolicy = () => {
    return (
        <>
         <Head>
            <title>Return, Refund, Cancellation Policy</title>
            <meta name="description" content={`Check return refund and cancellation policy for ${process.env.WEBSITE_NAME}`} />
        </Head>
            <div className="container m-auto text-lg p-2">
                <div>
                    <h1><strong>RETURN AND EXCHANGE POLICY</strong></h1>
                    Last Updated: 5/22/2022
                    <p>Thank you for shopping at <strong>{process.env.WEBSITE}</strong></p>
                    <p>If, for any reason, You are not completely satisfied with a purchase, we invite You to review our Policy. </p>
                    <p>The following terms are applicable for any products that you purchased with us.</p><br />
                    <h2><strong>INTERPRETATION AND DEFINITIONS</strong></h2>
                    <pre> </pre>
                    <h3><strong>Interpretation</strong></h3>
                    <p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
                    <h3><strong>Definitions</strong></h3>
                    <p>For the purposes of this Return and Exchange Policy:</p>
                    <p><strong>Individual</strong>  refers to <strong>{process.env.WEBSITE_NAME}</strong> Located at <strong>IN</strong>.</p>
                    <p><strong>Goods</strong> refer to the items offered for sale on the Service.</p>
                    <p><strong>Orders</strong> mean a request by You to purchase Goods from Us.</p>
                    <p><strong>Service</strong> refers to the Website.</p>
                    <p><strong>Website</strong> refers to My Site, accessible from <strong>{process.env.WEBSITE}</strong></p>
                    <p><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</p>
                    <br /><h2><strong>GENERAL RETURN POLICY</strong></h2>
                    <p>We want you to be happy with your purchase. If you are not completely satisfied, you can return the product to us and we will either repair/replace it, or credit your account. You are eligible for a<strong> REFUND or EXCHANGE</strong> which are subject to the below terms:</p>
                    If the product you have received which turns out to be defective or otherwise of poor quality (save for direct warranty products which are discussed below), please notify us as soon as reasonably possible after you become aware of the defect or poor quality.
                    <p>Products that are bought from the <strong>Physical Stores can’t be returned. </strong>All Items are eligible for return and would be processed if conditions are met.</p>
                    <p>You are always required to ship back the items by following the shipping instruction:</p>
                    <p><strong>If applicable we will send you a shipping label once the return request has been approved. In case you need to ship the products using any carrier, please use the following shipping address: |Shipping address|. Please make sure t include the return slip in the package.</strong></p>
                    <br /><h2><strong>REFUND POLICY</strong></h2>
                    <p>In order to be eligible for a refund, you have to return the goods within <strong>30</strong> days of your purchase. If the product is damaged in any way, or you have initiated the return after <strong>30</strong> days have passed, you will not be eligible for a refund.</p>
                    <ul>
                        <li><strong>Product must have the receipt or proof of purchase</strong></li>
                    </ul>
                    <p>After we receive your product, our team of professionals will inspect it and process your refund. The money will be refunded to the <strong>Original Payment Method</strong> you’ve used during the purchase. </p>
                    <h2><strong>EXCHANGE POLICY</strong></h2>
                    <p>Product can be exchanged for a different size or color variation, provided that such variation is available. Customers are allowed to exchange for item within <strong>30 </strong>days. Exchanges exceeding <strong>30 </strong>days will not be processed. </p>
                    <p>In order to be eligible for exchanges make sure that these following conditions are met:</p>
                    <ul>
                        <li><strong>Product must be returned in its original packaging</strong></li>
                    </ul>
                    <p>You are <strong>required to ship back</strong> the product for the item to be inspected and replaced.</p>
                    <p>You exchanged product will be processed <strong>Once items are received and conditions confirmed</strong>.</p>
                    <p>You are given the rights to exchange the item, <strong>One time. </strong>Provided that all conditions in Exchange Policy are met.</p>
                    If you select an item with a higher value compared to the item your exchange, we will ask you to pay the price difference. In case the value is lower, we will credit you with the difference..
                    <h3><strong>HOW TO INITIATE A RETURN</strong></h3>
                    <p>If you have a request for Return, Refund or Exchange and if you have further clarification and questions, Please do not hesitate to contact us through our:</p>
                    {/* <p>Email Address: <span style={{ color: '#000080' }}><strong>{process.env.WEBSITE_EMAIL}</strong></span></p> */}
                    <p>Email Address: <span style={{ color: '#000080' }}><strong>mohdusman.you@gmail.com</strong></span></p>
                    <p>Contact Form URL: <span style={{ color: '#000080' }}><strong>{process.env.WEBSITE}/contact</strong></span></p>
                    <p>You will be updated for their Return Status through their<strong> EMAIL, PHONE,</strong> and <strong>SMS</strong> provided that all contact information is recorded to us.</p>
                    <h2><strong>Cancellation Policy</strong></h2>
                        <p>We do not accept cancellation of order. You can return the product once it is delivered.</p>
                </div>

            </div>
        </>
    )
}

export default ReturnPolicy