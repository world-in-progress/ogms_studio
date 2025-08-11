import logging
import requests
from fastapi import FastAPI
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from pynoodle import noodle, NOODLE_INIT, NOODLE_TERMINATE

from .core import message_pipe as pipe

logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    NOODLE_INIT(app)
    noodle.mount_node('hello', 'hello')
    
    # Notify Electron main process that Ldle is ready
    pipe.i_am_ready()

    # # Create ready flag file
    # ready_file = settings.MEMORY_TEMP_PATH / 'noodle_ready.flag'
    # ready_file.write_text('Noodle is ready')

    yield
    
    NOODLE_TERMINATE()


def create_app() -> FastAPI:
    """Create and configure the FastAPI application."""
    app = FastAPI(
        title='OGMS Studio Noodle',
        version='0.0.1',
        lifespan=lifespan,
    )
    
    # Add CORS middleware
    app.add_middleware(
        CORSMiddleware,
        allow_origins=['*'],
        allow_credentials=True,
        allow_methods=['*'],
        allow_headers=['*'],
    )
    return app

app = create_app()