const prisma = require("../lib/prisma");

exports.getAllCategories = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const categories = await prisma.categories.findMany({
      skip: skip,
      take: limit,
    });

    const totalData = await prisma.categories.count();

    return res.status(200).json({
      statusCode: 200,
      data: categories,
      meta: {
        totalData: totalData,
        page: page,
        last_page: Math.ceil(totalData / limit),
        per_page: limit,
      },
    });
  } catch (error) {
    console.error("Error : ", error);

    res.status(400).json({
      statusCode: 400,
      message: "Error, cannot fetch the data!",
    });
  }
};

exports.getCategoriesById = async (req, res) => {
  try {
    const parsedId = parseInt(req.params.id);

    const category = await prisma.categories.findUnique({
      where: { id: parsedId },
    });

    if (!category) {
      return res.status(400).json({
        statusCode: 400,
        message: `The data with ID ${category} is not found!`,
      });
    }

    return res.status(200).json({
      statusCode: 200,
      data: category,
    });
  } catch (error) {
    console.error("Error : ", error);

    res.status(500).json({
      statusCode: 500,
      message: "Error, cannot fetch the data!",
    });
  }
};

exports.addCategories = async (req, res) => {
  try {
    const { name, slug } = req.body;

    const newData = {
      name,
      slug,
    };

    const addCategories = await prisma.categories.create({
      data: newData,
    });

    return res.status(200).json({
      statusCode: 200,
      message: "Successfully add new data!",
      data: addCategories,
    });
  } catch (error) {
    console.error("Error : ", error);

    return res.status(500).json({
      statusCode: 500,
      message: "Failed to add new data!",
    });
  }
};

exports.deleteCategories = async (req, res) => {
  try {
    const parsedCategoryId = parseInt(req.params.id);

    const checkId = await prisma.categories.findUnique({
      where: { id: parsedCategoryId },
    });

    if (!checkId) {
      return res.status(400).json({
        statusCode: 400,
        message: `The data with ID ${checkId} is not found!`,
      });
    }

    await prisma.categories.delete({
      where: { id: parsedCategoryId },
    });

    return res.status(200).json({
      statusCode: 200,
      message: "Successfully delete the data!",
    });
  } catch (error) {
    console.error("Error : ", error);
    return res.status(500).json({
      statusCode: 500,
      message: "Error, cannot delete the data!",
    });
  }
};
