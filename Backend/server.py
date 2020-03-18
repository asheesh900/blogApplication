from flask import Flask
from flask import request, make_response, jsonify
from flask_mysqldb import MySQL
import json
import hashlib
import os
import base64
import jwt

app = Flask(__name__)
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '@ps123'
app.config['MYSQL_DB'] = 'my_blog'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
mysql = MySQL(app)


@app.route('/')
def home():
    cursor = mysql.connection.cursor()
    cursor.execute(
        """SELECT * FROM blogs"""
    )
    result = cursor.fetchall()
    cursor.close()
    blogs = []
    for item in result:
        blogs.append(item)
    return {"blogs": blogs}

@app.route('/category/create', methods = ["POST", "GET"])
def category_create():
    if request.method == "POST":
        ask = request.json
        category = ask["category"]
        cursor = mysql.connection.cursor()
        cursor.execute(
            """INSERT INTO categories (category) 
            VALUES (%s)""", [(str(category))]
        )
        mysql.connection.commit()
        cursor.close()
        return {"message": "Category Added"}
    elif request.method == "GET":
        cursor = mysql.connection.cursor()
        cursor.execute(
            """SELECT * FROM categories""" 
        )
        result = cursor.fetchall()
        cursor.close()
        categories_list = list()
        for item in result:
            categories_list.append(item)
        return {"categories": categories_list}

@app.route('/blog/create', methods = ["POST"])
def create_blog():
    ask = request.json
    blog_title = ask["blog_title"]
    blog_content = ask["blog_content"]
    category_id = ask["category_id"]
    decoded_response = token_decoder()
    user_id = decoded_response["id"]
    cursor = mysql.connection.cursor()
    cursor.execute(
        """INSERT INTO blogs (title, content, user_id, category_id)
         VALUES (%s, %s, %s, %s)""",
          (str(blog_title), str(blog_content), user_id, category_id)
    )
    mysql.connection.commit()
    cursor.close()
    return {"message": "Blog created successfully."}

@app.route('/comment/create', methods = ["POST"])
def create_comment():
    ask = request.json
    comment = ask["comment"]
    blog_id = ask["blog_id"]
    decoded_response = token_decoder()
    user_id = decoded_response["id"]
    cursor = mysql.connection.cursor()
    cursor.execute(
        """INSERT INTO comments (comment, blog_id, user_id)
         VALUES (%s, %s, %s)""",
          (str(comment), blog_id, user_id)
    )
    mysql.connection.commit()
    cursor.close()
    return ({"message": "Comment Added"})


@app.route('/auth/signup', methods = ["POST"])
def signup():
    ask = request.json
    name = ask["name"]
    email = ask["email"]
    password = ask["password"]
    avatar = "/defaultUser.png"
    salt = generate_salt()
    salted_password = salt + password
    password_hash = hash_cycle(salted_password)

    cursor = mysql.connection.cursor()
    cursor.execute(
        """INSERT INTO users (name, email, salt, password_hash, avatar)
         VALUES (%s, %s, %s, %s, %s)""",
          (str(name), str(email), str(salt), str(password_hash), str(avatar))
    )
    mysql.connection.commit()
    cursor.close()
    return {"message": "Signup Successful"}


def generate_salt():
    salt = os.urandom(16)
    # print(salt.encode('base-64'))
    return str(base64.b64encode(salt))

def md5_hash(string):
    hash = hashlib.md5()
    hash.update(string.encode('utf-8'))
    # print(hash.hexdigest())
    return hash.hexdigest()

def hash_cycle(string):
    for i in range(5):
        string = md5_hash(string)
    return string

@app.route("/auth/login", methods = ["POST"])
def login():
    ask = request.json
    email = ask["email"]
    password = ask["password"]
    cursor = mysql.connection.cursor()
    cursor.execute(
        """SELECT * FROM users WHERE email = %s""", [(str(email))]
    )
    result = cursor.fetchall()
    cursor.close()
    user_data = []
    for item in result:
        user_data.append(item)
    if len(user_data) is not 0:
        for user in user_data:
            if user["password_hash"] == hash_cycle(user["salt"] + password):
                encode_data = jwt.encode({"id": user["id"]}, 'masai', algorithm='HS256')
                return json.dumps({"message": "Signin Successful!", "id": user["id"], "token": str(encode_data)})
            else:
                return({"message": "Wrong Password!"})
    return ({"message": "Please make sure you are a registered user."})

@app.route('/user/details', methods = ["GET"])
def details():
    decoded_response = token_decoder()
    cursor = mysql.connection.cursor()
    cursor.execute(
        """SELECT * FROM users WHERE id = %s""", (str(decoded_response["id"]))
    )
    result = cursor.fetchall()
    cursor.close()
    user_details = dict()
    for ele in result:
        user_details["name"] = ele["name"]
        user_details["email"] = ele["email"]
        user_details["avatar"] = ele["avatar"]
        return(user_details)

@app.route('/user/blogs', methods = ['GET'])
def getUserBlogs():
    decoded_response = token_decoder()
    user_id = decoded_response["id"]
    cursor = mysql.connection.cursor()
    cursor.execute(
        """SELECT * FROM blogs WHERE user_id = %s""",
         (str(user_id))
    )
    result = cursor.fetchall()
    cursor.close()
    user_blogs = list()
    for item in result:
        user_blogs.append(item)
    return {"user_blogs": user_blogs}

def token_decoder():
    auth_header = request.headers.get("Authorization")
    token_encoded = auth_header.split(" ")[1]
    decode_data = jwt.decode(token_encoded, "masai", algorithm = ["HS256"])
    return decode_data

@app.route('/uploader', methods = ['POST'])
def upload_file():
   if request.method == 'POST':
        decoded_data = token_decoder()
        f = request.files['picture']
        location = "../Frontend/reactaps/public/img/" + f.filename
        img_url = "/img/" + f.filename
        f.save(location)
        cursor = mysql.connection.cursor()
        cursor.execute(
            """UPDATE users SET avatar = %s
             WHERE id = %s""", (str(img_url), decoded_data["id"])
        )
        mysql.connection.commit()
        cursor.close()
        return {"id": decoded_data["id"], "img_url": img_url}

        

# @app.route('/delete', methods = ["POST"])
# def delete():
#     ask = request.json
#     id = ask["id"]
#     cursor = mysql.connection.cursor()
#     cursor.execute(
#         """DELETE FROM blogs WHERE id = %s""", (str(id)) 
#         )
#     mysql.connection.commit()
#     cursor.close()
#     return {"message": "Blog deleted"}