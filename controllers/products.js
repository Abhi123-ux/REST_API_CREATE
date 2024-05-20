const Product = require("../models/products");

const getAllProducts = async (req, res) => {
    const { company, name, featured, sort, select, page = 1, limit = 3 } = req.query;
    const queryObject = {};

    if (company) {
        queryObject.company = company;
    }

    if (featured) {
        queryObject.featured = featured;
    }

    if (name) {
        queryObject.name = { $regex: name, $options: "i" };
    }

    console.log("Query Object:", queryObject);

    let apiData = Product.find(queryObject);

    if (sort) {
        const sortFix = sort.replace(",", " ");
        apiData = apiData.sort(sortFix);
    }

    if (select) {
        const selectFix = select.split(",").join(" ");
        apiData = apiData.select(selectFix);
    }

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    apiData = apiData.skip(skip).limit(limitNum);

    try {
        const myData = await apiData;
        console.log("Result Count:", myData.length);
        res.status(200).json({ myData, nbHits: myData.length });
    } catch (error) {
        console.error("Error Fetching Data:", error.message);
        res.status(500).json({ error: error.message });
    }
}

const getAllProductsTesting = async (req, res) => {
    try {
        const myData = await Product.find({});
        console.log("Testing Query Results:", myData.length);
        res.status(200).json({ myData });
    } catch (error) {
        console.error("Error Fetching Data:", error.message);
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getAllProducts, getAllProductsTesting }
