from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # Server settings
    SERVER_PORT: int = 8000
    RELOAD: bool = False

    class Config:
        env_file = '.env'
        extra = 'ignore'
        
settings = Settings()