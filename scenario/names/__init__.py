from pynoodle import RawScenarioNode

from .names import Names
from scenario.interfaces.inames import INames
from .endpoint import router
from .hooks import MOUNT, UNMOUNT, PARAM_CONVERTER

RAW = RawScenarioNode(
    CRM=Names,
    ICRM=INames,
    MOUNT=MOUNT,
    UNMOUNT=UNMOUNT,
    PARAM_CONVERTER=PARAM_CONVERTER,
    ENDPOINT=router
)