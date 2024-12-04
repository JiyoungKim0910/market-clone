from fastapi import FastAPI, UploadFile, Form, Response
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
# from typing import Annotated
import sqlite3

conn = sqlite3.connect('db.db',check_same_thread=False)
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
async def get_items():
    # 컬럼명도 같이 가져옴
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
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

@app.post('/signup')
def signup(id:str=Form(), password:str=Form()):
    print(id, password)
    return 200


app.mount("/", StaticFiles(directory="frontend",html=True), name="static")