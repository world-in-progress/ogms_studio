import io
from math import ceil
from pynoodle import crm
from pathlib import Path
import matplotlib.font_manager as fm
from PIL import Image, ImageDraw, ImageFont
from scenario.interfaces.ihello import IHello

@crm
class Hello(IHello):
    def __init__(self, resource_space: str):
        self._path = Path(resource_space)
        if not self._path.is_absolute():
            self._path = Path.cwd() / self._path
        
        if not self._path.exists():
            self._path.mkdir(parents=True, exist_ok=True)

        # Check if hello.png exists in the resource space
        self._image_path = self._path / 'hello.png'
        if not self._image_path.exists():
            self.create_picture('          Hello!\n\nOpenGMS Studio')

    def create_picture(self, text: str) -> None:
        try:
            font_path = fm.findfont(fm.FontProperties(family='Rockwell', weight='heavy'))
            font = ImageFont.truetype(font_path, 128)
        except (OSError, IOError):
            font = ImageFont.load_default()

        # Create a temporary image to measure text
        temp_img = Image.new('RGBA', (1, 1))
        temp_draw = ImageDraw.Draw(temp_img)

        # Get text bounding box
        bbox = temp_draw.textbbox((0, 0), text, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        
        # Add padding
        padding = ceil(text_width * 0.05)
        width = text_width + padding * 2
        height = text_height + padding * 2

        img = Image.new('RGBA', (width, height), (0, 0, 0, 0))
        d = ImageDraw.Draw(img)

        # Draw text and save
        x = padding
        y = padding
        d.text((x, y), text, fill=(255, 255, 255, 255), font=font)
        img.save(self._image_path, 'PNG')
    
    def get_picture(self) -> io.BytesIO:
        with open(self._image_path, 'rb') as f:
            return io.BytesIO(f.read())

    def terminate(self) -> None:
        pass