#### Categories Table

```sql

CREATE TABLE categories (id int NOT NULL AUTO_INCREMENT, category varchar(255) NOT NULL, PRIMARY KEY (id));

INSERT INTO categories (category) VALUES (("Technology"), ("Social"), ("Economy"), ("Political"), ("Sports"));

```

#### Blogs Table

```sql

CREATE TABLE blogs (id int NOT NULL AUTO_INCREMENT, title varchar(255) NOT NULL, content TEXT NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, user_id int, category_id int, PRIMARY KEY (id), FOREIGN KEY (user_id) REFERENCES users (id), FOREIGN KEY (category_id) REFERENCES categories (id));

INSERT INTO blogs (title, content, user_id, category_id) VALUES ("React", "React is very powerful", 1, 1), ("Globalisation", "It is a social phenomena", 2, 2);
```

#### Comments Table

```sql


CREATE TABLE comments (id int NOT NULL AUTO_INCREMENT, comment varchar(255), blog_id int, user_id int, commented_at DATETIME DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id), FOREIGN KEY (blog_id) REFERENCES blogs (id), FOREIGN KEY (user_id) REFERENCES users (id));

INSERT INTO comments (comment, blog_id, user_id) VALUES ("This is very informative article on REACT", 1, 3);
```
