CREATE db candleco;

CREATE TABLE
    users (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE,
        password VARCHAR(255),
        first_name VARCHAR(50),
        last_name VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

CREATE TABLE
    addresses (
        address_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        street VARCHAR(50),
        city VARCHAR(50),
        state VARCHAR(50),
        postal_code VARCHAR(20),
        country VARCHAR(100),
        FOREIGN KEY (user_id) REFERENCES users (user_id)
    );

CREATE TABLE
    products (
        product_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        description TEXT,
        price DECIMAL(10, 2),
        stock_quantity INTEGER,
        imageUrl VARCHAR(255),
        category VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

CREATE TABLE
    carts (
        cart_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        product_id INT,
        quantity INTEGER,
        added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (user_id),
        FOREIGN KEY (product_id) REFERENCES products (product_id)
    );

CREATE TABLE
    orders (
        order_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        payment_id INT AUTO_INCREMENT PRIMARY KEY,
        address_id INT,
        paymentMethod VARCHAR(50),
        totalAmount DECIMAL(10, 2),
        orderStatus VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (user_id),
        FOREIGN KEY (address_id) REFERENCES addresses (address_id)
    );

CREATE TABLE
    reviews (
        review_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        first_name VARCHAR(50),
        product_id INT,
        rating INTEGER,
        review TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (user_id),
        FOREIGN KEY (first_name) REFERENCES users (first_name),
        FOREIGN KEY (product_id) REFERENCES products (product_id)
    );