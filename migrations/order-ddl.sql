CREATE TABLE IF NOT EXISTS orders (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id INT UNSIGNED NOT NULL,
    plan_id INT UNSIGNED NOT NULL,
    status ENUM('pending', 'reject', 'done') NOT NULL DEFAULT 'pending',
    chat_id BIGINT UNSIGNED NOT NULL,
    trackId varchar(25),
    create_at BIGINT NOT NULL,
    start_at BIGINT NULL,
    end_at BIGINT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (plan_id) REFERENCES plans(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
) AUTO_INCREMENT = 10