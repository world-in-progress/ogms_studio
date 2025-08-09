import io
from pynoodle import icrm

@icrm('test', '0.0.1')
class IHello:
    def create_picture(self, text: str) -> None:
        ...
    def get_picture(self) -> io.BytesIO:
        ...