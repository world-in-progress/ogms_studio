from pynoodle import noodle
from pydantic import BaseModel
from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse

from ldle import electron_pipe
from scenario.interfaces.ihello import IHello

router = APIRouter(prefix='/hello', tags=['crm/hello'])

class HelloRequest(BaseModel):
    text: str

@router.get('/')
def get_hello_picture():
    try:
        with noodle.connect_node(IHello, 'hello', 'lw') as hello_node:
            image_data =  hello_node.crm.get_picture()
            return StreamingResponse(image_data, media_type='image/png')
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post('/')
def create_hello_picture(request: HelloRequest):
    try:
        with noodle.connect_node(IHello, 'hello', 'lw') as hello_node:
            hello_node.crm.create_picture(request.text)
            electron_pipe.refresh('hello')
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))