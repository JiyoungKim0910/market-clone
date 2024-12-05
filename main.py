from fastapi import FastAPI, UploadFile, Form, Response, Depends
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi.staticfiles import StaticFiles
from fastapi_login import LoginManager
from fastapi_login.exceptions import InvalidCredentialsException
from pydantic import BaseModel
# from typing import Annotated
import sqlite3

conn = sqlite3.connect('db.db',check_same_thread=False)
# 컬럼명도 같이 가져옴
conn.row_factory = sqlite3.Row
cur = conn.cursor()
cur.execute("""
            CREATE TABLE IF NOT EXISTS items(
                id INTEGER PRIMARY KEY ,
                title TEXT not null,
                image BLOB,
                price INTEGER not null,
                description TEXT,
                place TEXT not null,
                insertAt INTEGER not null
            )
            """)
app = FastAPI()

SECRET = "super-coding"
manager = LoginManager(SECRET,'/login')

@manager.user_loader()
def query_user(data):
    WHERE_STATEMENT = f'id="{data}"'
    if type(data) == dict:
        WHERE_STATEMENT = f'''id="{data['id']}"'''
    user = cur.execute(f"""
                        SELECT * FROM users WHERE {WHERE_STATEMENT}
                        """).fetchone()
    print(user) 
    return user

@app.post('/login')
def login(id:str=Form(), password:str=Form()):
    user = query_user(id)
    print(user)
    if not user:
        raise InvalidCredentialsException
    elif password != user['password']:
        raise InvalidCredentialsException
    
    access_token = manager.create_access_token(data={
        'sub':{
            'id':user['id'],
            'name':user['name'],
            'email':user['email']
        }
    })
    print(access_token)
    return {'access_token':access_token}

# 현재 코드는 회원가입 여부를 확인하지 않음
# 회원 가입 여부 확인 아이디 중복체크 확인 기능 추가 하기
@app.post('/signup')
def signup(id:str=Form(), password:str=Form(), name:str =Form(), email:str=Form()):
    print(id, password)
    cur.execute(f"""
                INSERT INTO users(id, name, email, password)
                VALUES ('{id}','{name}','{email}','{password}')""");
    conn.commit()
    return 200

@app.post('/items')
# def create_item(image:UploadFile,
#                 title:Annotated[str,Form()],
#                 price:Annotated[int,Form()],
#                 description:Annotated[str,Form()],
#                 place:Annotated[str,Form()]):
async def create_item(image:UploadFile,
                title:str=Form(),
                price:int=Form(),
                description:str=Form(),
                place:str=Form(),
                insertAt:int=Form()
                ):
    # print(image,title,price,description,place)
    # 이미지를 읽는 시간이 필요함
    image_bytes = await image.read()
    cur.execute(f"""
                INSERT INTO items(title,image,price,description,place,insertAt)
                VALUES('{title}','{image_bytes.hex()}',{price},'{description}','{place}',{insertAt})
                """)
    conn.commit()
    
    return 200
@app.get('/items')
async def get_items(user=Depends(manager)):
    cur.execute("SELECT * FROM items")
    items = cur.fetchall()
    
    return JSONResponse(jsonable_encoder(
        dict(row) for row in items))

@app.get('/images/{item_id}')
async def get_image(item_id):
    cur.execute(f"SELECT image FROM items WHERE id={item_id}")
    image_bytes_hex = cur.fetchone()[0]
    # media_type : 파이썬 버전이 다를경우 버그 발생 방지
    return Response(content=bytes.fromhex(image_bytes_hex),media_type="image/*")



app.mount("/", StaticFiles(directory="frontend",html=True), name="static")