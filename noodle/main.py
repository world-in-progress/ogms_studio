from pathlib import Path
from fastapi import FastAPI
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from pynoodle import noodle, NOODLE_INIT, NOODLE_TERMINATE

from noodle import settings
from scenario.interfaces.inames import INames

@asynccontextmanager
async def lifespan(app: FastAPI):
    NOODLE_INIT(app)
    noodle.mount_node('name', 'names')
    with noodle.connect_node(INames, 'name', 'lw') as names:
        crm = names.crm
        crm.add_name('Alice')
        crm.add_name('Bob')
        crm.add_name('Charlie')
    
    # Create ready flag file
    ready_file = settings.MEMORY_TEMP_PATH / 'noodle_ready.flag'
    ready_file.write_text('Noodle is ready')

    yield
    
    # Clean up flag file
    if ready_file.exists():
        ready_file.unlink()
    
    noodle.unmount_node('name')
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