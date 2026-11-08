const prisma = require("../lib/prisma");

exports.getAllProductImages = async (req, res) => {
  try {
    const productImages = await prisma.productImages.findMany();

    return res.status(200).json({
      statusCode: 200,
      data: productImages,
    });
  } catch (error) {
    console.error("Error : ", error);
    return res.status(500).json({
      statusCode: 500,
      message: "Error, failed to fetch the data!",
    });
  }
};

exports.addProductImages = async (req, res) => {
  try {
    const { product_id, is_primary } = req.body;

    // 1. Validasi apakah file diunggah
    if (!req.file) {
      return res.status(400).json({
        statusCode: 400,
        message: "Image file is required",
      });
    }

    const productIdInt = parseInt(product_id);
    const isPrimaryBool = is_primary === "true" || is_primary === true;

    // 2. Validasi apakah Produk ada
    const productExists = await prisma.products.findUnique({
      where: { id: productIdInt },
    });

    if (!productExists) {
      return res.status(404).json({
        statusCode: 404,
        message: "Product not found",
      });
    }

    // 3. Simpan data menggunakan Prisma Transaction (jika is_primary true)
    const newImage = await prisma.$transaction(async (tx) => {
      // Jika gambar baru diset sebagai primary, ubah gambar primary lama milik produk ini jadi false
      if (isPrimaryBool) {
        await tx.productImages.updateMany({
          where: { product_id: productIdInt, is_primary: true },
          data: { is_primary: false },
        });
      }

      // Simpan gambar baru
      return await tx.productImages.create({
        data: {
          product_id: productIdInt,
          image_url: req.file.filename,
          is_primary: isPrimaryBool,
        },
      });
    });

    return res.status(201).json({
      statusCode: 201,
      message: "Successfully added new product image",
      data: newImage,
    });
  } catch (error) {
    console.error("Error addProductImages:", error);
    return res.status(500).json({
      statusCode: 500,
      message: "Failed to add product image",
    });
  }
};
