import { supabase } from "../lib/supabase";

const productSelect = `
  id,
  name,
  description,
  price,
  material,
  dimensions,
  stock,
  is_featured,
  collections (
    id,
    name
  ),
  product_variants (
    id,
    stock,
    colors (
      id,
      name,
      hex_code
    ),
    variant_images (
      id,
      image_url,
      is_primary,
      display_order
    )
  )
`;

function formatProduct(product) {
  const variants = (product.product_variants || []).map((variant) => {
    const images = [...(variant.variant_images || [])].sort(
      (a, b) => {
        if (a.is_primary !== b.is_primary) {
          return a.is_primary ? -1 : 1;
        }

        return a.display_order - b.display_order;
      }
    );

    return {
      id: variant.id,
      color: variant.colors,
      stock: variant.stock,
      available: variant.stock > 0,
      images: images.map((image) => image.image_url),
    };
  });

  return {
    ...product,
    collection: product.collections?.name || "",
    variants,
    colors: variants
      .filter((variant) => variant.color)
      .map((variant) => variant.color),
  };
}

export async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select(productSelect)
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data.map(formatProduct);
}

export async function getProductById(id) {
  const { data, error } = await supabase
    .from("products")
    .select(productSelect)
    .eq("id", id)
    .eq("is_active", true)
    .single();

  if (error) throw error;

  return formatProduct(data);
}