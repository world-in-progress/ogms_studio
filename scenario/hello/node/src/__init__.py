from pynoodle import RawScenarioNode

from scenario.interfaces.ihello import IHello
from .hello import Hello
from .endpoint import router
from .hooks import MOUNT, UNMOUNT, PARAM_CONVERTER

RAW = RawScenarioNode(
    CRM=Hello,
    ICRM=IHello,
    ENDPOINT=router,
    MOUNT=MOUNT,
    UNMOUNT=UNMOUNT,
    PARAM_CONVERTER=PARAM_CONVERTER
)