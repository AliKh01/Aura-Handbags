const products = [
  {
    id: 1,
    name: "The Classic Bag",
    price: 45,
    image: "/images/product-3.jpeg",
    images: ["/images/product-3.jpeg"],
    colors: ["Beige", "Black"],
    variants: {
      Beige: {
        images: ["/images/product-3.jpeg"],
      },
      Black: {
        // Replace with the actual black bag photos when available
        images: ["/images/product-2.jpeg"],
      },
    },
    collection: "Classic Collection",
    description:
      "A timeless handbag designed to add elegance to your everyday look.",
    material: "Premium material",
    dimensions: "25 × 18 × 10 cm",
    stock: 8,
  },
  {
    id: 2,
    name: "The Elegant Bag",
    price: 55,
    image: "/images/product-2.jpeg",
    images: ["/images/product-2.jpeg"],
    colors: ["Brown"],
    variants: {
      Brown: {
        images: ["/images/product-2.jpeg"],
      },
    },
    collection: "New Collection",
    description:
      "An elegant handbag with a refined design for every occasion.",
    material: "Premium material",
    dimensions: "28 × 20 × 12 cm",
    stock: 5,
  },
  {
    id: 3,
    name: "The Everyday Bag",
    price: 50,
    image: "/images/product-3.jpeg",
    images: ["/images/product-3.jpeg"],
    colors: ["Black", "Pink"],
    variants: {
      Black: {
        images: ["/images/product-3.jpeg"],
      },
      Pink: {
        // Replace with the actual pink bag photos when available
        images: ["/images/product-3.jpeg"],
      },
    },
    collection: "New Collection",
    description:
      "A versatile handbag that combines practical design with timeless style.",
    material: "Premium material",
    dimensions: "24 × 17 × 9 cm",
    stock: 10,
  },
];

export default products;