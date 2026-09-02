// import {useParams} from "react-router-dom";
// import {useEffect, useState} from "react";
// import { useCart } from "../context/CartContext";


// function ProductDetail() {
//     const {id} = useParams();
//     const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
//     const [product, setProduct] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const { addToCart } = useCart();

//     useEffect(() => {
//         fetch(`${BASEURL}/store/products/${id}/`)
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error("Failed to fetch product details");

//                 }
//                 return response.json();
//             })
//             .then((data) => {
//                     setProduct(data);
//                     setLoading(false);
//                 })
//             .catch((error) => {
//                 setError(error.message);
//                 setLoading(false);
//             });
//         },[id,BASEURL]);

//     if (loading) {
//         return <div>Loading...</div>;
//     }   

//     if (error) {
//         return <div>Error: {error}</div>;
//     }   
//     if (!product) {
//         return <div>No product found.</div>;

//     }
//     const handleAddToCart = () => {
//     if(!localStorage.getItem('access_token')){
//       window.location.href = '/login';
//       return;
//     }
//     addToCart(product.id);
//   }
    
//     return (
//         <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10">
//             <div className="bg-white rounded-xl shadow-md p-6 max-w-3xl W-full">
//             <div className="flex  fex-col md:flex-row gap-8">
//                 <img
//                     src={`${product.image}`}
//                     alt={product.name}
//                     className="w-full md:w-1/2 h-auto object-cover rounded-lg"
//                 />  
//                 <div className="flex-1">
//                     <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
//                     <p className="text-xl font-semibold text-gray-600 mb-4">${product.price}</p>
//                     <p className="text-gray-700 leading-relaxed">{product.description}</p>
//             <button onClick={handleAddToCart} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">  
//                      Add to Cart 🛒
//             </button>
//             <div className="mt-4">
//                 <a 
//                 href="/"
//                 className="text-blue-600 hover:underline"
//                 >
//                     &larr; Back to Products
//                 </a>
//             </div>

            
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default ProductDetail;


import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

function ProductDetail() {
    const { id } = useParams();

    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { addToCart } = useCart();

    useEffect(() => {
        fetch(`${BASEURL}/store/products/${id}/`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch product details");
                }

                return response.json();
            })
            .then((data) => {
                console.log("Product Data:", data);
                console.log("Image Path:", data.image);

                setProduct(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setError(error.message);
                setLoading(false);
            });
    }, [id, BASEURL]);

    // Loading
    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-lg text-gray-600">
                    Loading...
                </p>
            </div>
        );
    }

    // Error
    if (error) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-red-600 text-lg">
                    Error: {error}
                </p>
            </div>
        );
    }

    // Product not found
    if (!product) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-gray-600 text-lg">
                    No product found.
                </p>
            </div>
        );
    }

    // Create correct image URL
    const imageUrl = product.image
        ? product.image.startsWith("http")
            ? product.image
            : `${BASEURL}${product.image}`
        : null;

    console.log("Final Image URL:", imageUrl);

    // Add To Cart
    const handleAddToCart = () => {
        if (!localStorage.getItem("access_token")) {
            window.location.href = "/login";
            return;
        }

        addToCart(product.id);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10">

            <div className="bg-white rounded-xl shadow-md p-6 max-w-3xl w-full">

                <div className="flex flex-col md:flex-row gap-8">

                    {/* Product Image */}
                    <div className="w-full md:w-1/2">

                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt={product.name}
                                className="w-full h-80 object-cover rounded-lg"
                                onError={(e) => {
                                    console.error(
                                        "Image failed to load:",
                                        imageUrl
                                    );
                                }}
                            />
                        ) : (
                            <div className="w-full h-80 bg-gray-200 rounded-lg flex items-center justify-center">
                                <p className="text-gray-500">
                                    No Image Available
                                </p>
                            </div>
                        )}

                    </div>

                    {/* Product Information */}
                    <div className="flex-1">

                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            {product.name}
                        </h1>

                        <p className="text-xl font-semibold text-gray-600 mb-4">
                            ₹{product.price}
                        </p>

                        <p className="text-gray-700 leading-relaxed">
                            {product.description}
                        </p>

                        {/* Add To Cart */}
                        <button
                            onClick={handleAddToCart}
                            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Add to Cart 🛒
                        </button>

                        {/* Back to Products */}
                        <div className="mt-4">
                            <Link
                                to="/"
                                className="text-blue-600 hover:underline"
                            >
                                &larr; Back to Products
                            </Link>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default ProductDetail;