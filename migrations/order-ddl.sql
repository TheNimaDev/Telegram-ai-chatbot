CREATE TABLE IF NOT EXISTS orders (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id INT UNSIGNED NOT NULL,
    plan VARCHAR(100) NOT NULL,
    period_plan ENUM('7', '30','90') NOT NULL,
    status ENUM('pending', 'reject', 'done') NOT NULL DEFAULT 'pending',
    chat_id BIGINT UNSIGNED NOT NULL,
    create_at BIGINT NOT NULL,
    start_at BIGINT NULL,
    end_at BIGINT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) AUTO_INCREMENT = 10 ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
