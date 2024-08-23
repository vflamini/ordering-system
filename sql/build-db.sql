CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_number VARCHAR(11),
  order_date DATE,
  person_name VARCHAR(255),
  item_name VARCHAR(255),
  company VARCHAR(255),
  link VARCHAR(255),
  catalog_number VARCHAR(255),
  list_price DECIMAL(10, 2),
  quantity INT,
  total_price DECIMAL(10, 2),
  comments TEXT,
  urgent BOOLEAN,
  status ENUM('open', 'ordered', 'received') DEFAULT 'open',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE grants (
  id iNT AUTO_INCREMENT PRIMARY KEY,
  grant_name VARCHAR(255)
);

CREATE TABLE teams (
  id iNT AUTO_INCREMENT PRIMARY KEY,
  team_name VARCHAR(255)
);

CREATE TABLE grant_order (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  grant_name VARCHAR(255),
  grant_percentage INT,
  FOREIGN KEY (order_id) REFERENCES orders(id)
);

CREATE TABLE team_order (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  team_name VARCHAR(255),
  FOREIGN KEY (order_id) REFERENCES orders(id)
);