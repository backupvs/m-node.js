/**
 * @returns {number} Returns a new number, which is an increment of the result
 * of previous call of this function.
 */
 const id = (() => {
    let num = 0;
    return () => num++;
})();

/**
 * Abstract Class Product.
 * 
 * @class AbstractProduct
 */
function AbstractProduct(name, description, price, quantity, images, date, brand) {
    if (new.target === AbstractProduct) {
        throw new Error("Instance of Abstract class cannot be instantiated");
    }
    this.ID = id();
    this.name = name;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
    this.date = date;
    this.reviews = [];
    this.images = images;
    this.brand = brand;
}

/**
 * Get review by ID.
 * 
 * @param {number} requestedId
 * @returns {Review} Found review.
 */
AbstractProduct.prototype.getReviewByID = function(requestedId) {
    return this.reviews.find(review => review.ID === requestedId);
}

/**
 * Gets image by name.
 * 
 * @param {string} requestedImage
 * @returns {string} Found image.
 */
AbstractProduct.prototype.getImage = function(requestedImage) {
    return requestedImage ? this.images.find(image => image === requestedImage) : images[0];
}

/**
 * Adds Review object.
 * 
 * @param {Review} reviewToAdd
 */
AbstractProduct.prototype.addReview = function(reviewToAdd) {
    this.reviews.push(reviewToAdd);
}

/**
 * Deletes Review by ID.
 * 
 * @param {number} reviewID
 */
AbstractProduct.prototype.deleteReview = function(reviewID) {
    this.reviews = this.reviews.filter(review => review.ID !== reviewID);
}

/**
 * Returns average rating of all reviews.
 * 
 * @returns {number} Average rating.
 */
AbstractProduct.prototype.getAverageRating = function() {
    return this.reviews.reduce((total, review) => total + review.getAverageRating(), 0) / reviews.length;
}

/**
 * String with each attribute of an object (key: value) each on a new line
 * 
 * @returns {string} Attributes with values.
 */
AbstractProduct.prototype.getFullInformation = function() {
    return Object.keys(this).reduce((result, key) => result.concat(`${key}: ${this[key]}\n`), ``);
}

/**
 * @param {number} quantity Quantity to calculate.
 * @returns {string} String with total price.
 */
AbstractProduct.prototype.getPriceForQuantity = function(quantity) {
    return `$${this.price * quantity}`;
}

/**
 * Gets property if newValue was not specified.
 * Sets property if it exists, otherwise creates it.
 * 
 * @param {*} propertyName Name of the property.
 * @param {*} newValue New value to set.
 */
AbstractProduct.prototype.property = function(propertyName, newValue = null) {
    if (newValue) {
        this[propertyName] = newValue;
    } else {
        return this[propertyName];
    }
}

/**
 * Clothes.
 *
 * @class Clothes
 * @extends {AbstractProduct}
 */
function Clothes(name, description, price, quantity, images, date, brand, material, color) {
    AbstractProduct.call(this, name, description, price, quantity, images, date, brand);
    this.material = material;
    this.color = color;

    /* Getters */
    this.getMaterial = () => this.material;
    this.getColor = () => this.color;

    /* Setters */
    this.setMaterial = newMaterial => this.material = newMaterial;
    this.setColor = newColor => this.color = newColor;
}

// Assign copy of AbstractProduct prototype to Clothes prototype to inherite methods
Clothes.prototype = Object.create(AbstractProduct.prototype);

/**
 * Electronics.
 * 
 * @class Electronics
 * @extends {AbstractProduct}
 */
function Electronics(name, description, price, quantity, images, date, brand, warranty, power) {
    AbstractProduct.call(this, name, description, price, quantity, images, date, brand);
    this.warranty = warranty;
    this.power = power;

    /* Getters */
    this.getWarranty = () => this.warranty;
    this.getPower = () => this.power;

    /* Setters */
    this.setWarranty = newWarranty => this.warranty = newWarranty;
    this.setPower = newPower => this.power = newPower;
}

// Assign copy of AbstractProduct prototype to Electronics prototype to inherite methods
Electronics.prototype = Object.create(AbstractProduct.prototype);

/* Creating instances */
const tshirt = new Clothes(
    "T-shirt",
    "nice T-shirt",
    600,
    15,
    ["Image1.jpg", "Image2.jpg"],
    new Date(),
    "Nike",
    "cotton",
    "yellow"
);

const laptop = new Electronics(
    "Acer ABC-123",
    "gaming laptop",
    1500,
    5,
    ["Image1.jpg", "Image2.jpg"],
    new Date(),
    "Acer",
    10,
    200
);

/**
 * Searches product by matching the name or description.
 * 
 * @param {array} products Array of products.
 * @param {string} search Searching Text.
 * @return Filtered array where the name or description matches the search query.
 */
 function searchProducts(products, search) {
    return products.filter(
        product => product.name.toLowerCase().includes(search) || product.description.toLowerCase().includes(search)
    )
}

/**
 * Sort products by specified attribute.
 * 
 * @param {array} products Array of products. 
 * @param sortRule Attribute to sort by.
 */
function sortProducts(products, sortRule) {
    products.sort((a, b) => a[sortRule] - b[sortRule]);
}

