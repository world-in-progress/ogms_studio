import os
import sys
import uvicorn
from ldle import settings

if __name__ == '__main__':
    if sys.platform.startswith('win') or sys.platform.startswith('linux'):
        venv_path = sys.prefix
        os.environ['PROJ_LIB'] = os.path.join(venv_path, 'Lib', 'site-packages', 'osgeo', 'data', 'proj')
    
    uvicorn.run(
        'ldle.main:app',
        host='0.0.0.0', port=settings.SERVER_PORT,
        reload=settings.RELOAD, log_level='info'
    )
