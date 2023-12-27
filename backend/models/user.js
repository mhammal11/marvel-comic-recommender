class User {
    constructor(username, hashedPassword) {
        this.username = username;
        this.hashedPassword = hashedPassword;
    }

    // Method to save user to the database
    async save(pool) {
        try {
            const result = await pool.query(
                'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id',
                [this.username, this.hashedPassword]
            );
            this.id = result.rows[0].id;
            return this;
        } catch (error) {
            throw error;
        }
    }

    // Static method to find a user by username
    static async findByUsername(username, pool) {
        try {
            const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
            if (result.rows.length > 0) {
                const user = result.rows[0];
                return new User(user.username, user.password);
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = User;
