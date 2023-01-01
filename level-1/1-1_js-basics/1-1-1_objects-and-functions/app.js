// Product constructor
function Product(ID, name, description, price, brand, sizes, activeSize, quantity, date, reviews, images) {
    this.ID = ID;
    this.name = name;
    this.description = description;
    this.price = price;
    this.brand = brand;
    this.sizes = sizes;
    this.activeSize = activeSize;
    this.quantity = quantity;
    this.date = date;
    this.reviews = reviews;
    this.images = images;

    // Getters
    this.getID = () => this.ID;
    this.getName = () => this.name;
    this.getDescription = () => this.description;
    this.getPrice = () => this.price;
    this.getBrand = () => this.brand;
    this.getSizes = () => this.sizes;
    this.getActiveSize = () => this.activeSize;
    this.getQuantity = () => this.quantity;
    this.getDate = () => this.date;
    this.getReviews = () => this.reviews;
    this.getImages = () => this.images;

    // Setters
    this.setID = newID => this.ID = newID;
    this.setName = newName => this.name = newName;
    this.setDescription = newDescription => this.description = newDescription;
    this.setPrice = newPrice => this.price = newPrice;
    this.setBrand = newBrand => this.brand = newBrand;
    this.setSizes = newSizes => this.sizes = newSizes;
    this.setActiveSize = newActiveSize => this.activeSize = newActiveSize;
    this.setQuantity = newQuantity => this.quantity = newQuantity;
    this.setDate = newDate => this.date = newDate;
    this.setReviews = newReviews => this.reviews = newReviews;
    this.setImages = newImages => this.images = newImages;

    this.getReviewByID = function(requestedId) {
        return this.reviews.find(review => review.ID === requestedId);
    }

    this.getImage = function(requestedImage) {
        return requestedImage ? this.images.find(image => image === requestedImage) : images[0];
    }

    this.addSize = function(sizeToAdd) {
        this.sizes.push(sizeToAdd);
    }

    this.deleteSize = function(sizeToDelete) {
        this.sizes = this.sizes.filter(size => size !== sizeToDelete);
    } 

    this.addReview = function(reviewToAdd) {
        this.reviews.push(reviewToAdd);
    }

    this.deleteReview = function(reviewID) {
        this.reviews = this.reviews.filter(review => review.ID !== reviewID);
    }

    this.getAverageRating = function() {
        return this.reviews.reduce((total, review) => total + review.getAverageRating(), 0) / reviews.length;
    }
}

// Review constructor
function Review(ID, author, date, comment, rating) {
    this.ID = ID;
    this.author = author;
    this.date = date;
    this.comment = comment;
    this.rating = rating;

    this.getAverageRating = function() {
        let ratingValues = Object.values(this.rating);
        return ratingValues.reduce((total, current) => total + current, 0) / ratingValues.length;
    }
}

// Creating a products
const product1 = new Product(
    0,
    "T-shirt",
    "yellow cotton T-shirt",
    1000,
    "Abibos",
    ["XS", "S", "M", "L", "XL", "XXL"],
    "L",
    10,
    new Date(),
    [],
    ["p1_image1", "p1_image2"]
);

const product2 = new Product(
    1,
    "Trousers",
    "gray cotton trousers",
    1500,
    "Nyke",
    ["XS", "S", "M", "L", "XL", "XXL"],
    "XL",
    5,
    new Date(),
    [],
    ["p2_image1"]
);

// Adding reviews
product1.addReview(new Review(
    0, 
    "bob", 
    new Date(),
    "cool", 
    {
        "service": 8,
        "price": 9,
        "value": 8,
        "quality": 7
    }
));

product1.addReview(new Review(
    1,
    "john",
    new Date(),
    "bad",
    {
        "service": 3,
        "price": 2,
        "value": 4,
        "quality": 1
    }
));

/**
 * Searches product by matching the name or description.
 * 
 * @param {products} Array of products.
 * @param {search} searching Text.
 * @return Filtered array where the name or description matches the search query.
 */
function searchProducts(products, search) {
    return products.filter(
        product => product.name.includes(search) || product.description.includes(search)
    )
}

/**
 * Sort products by specified attribute.
 * 
 * @param {products} Array of products. 
 * @param {sortRule} Attribute to sort by.
 */
function sortProducts(products, sortRule) {
    products.sort((a, b) => a[sortRule] - b[sortRule]);
}