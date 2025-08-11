import logging
import requests

logger = logging.getLogger(__name__)

MESSAGE_PIPE_URL = 'http://localhost:3001'

def i_am_ready():
    try:
        response = requests.get(f'{MESSAGE_PIPE_URL}/ready', timeout=5)
        if response.status_code != 200:
            raise Exception(f'{response.text}')
    except Exception as e:
        logger.error(f'Error notifying Electron main process: {e}')
        raise

def refresh(refresh_key: str = ''):
    try:
        response = requests.get(f'{MESSAGE_PIPE_URL}/refresh', params={'refreshKey': refresh_key})
        if response.status_code != 200:
            raise Exception(f'{response.text}')
    except Exception as e:
        logger.error(f'Error refreshing app for "{refresh_key}": {e}')