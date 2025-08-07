from pynoodle import RawScenarioNode

from noodle.module.interfaces.ihello import IHello
from .hello import Hello

RAW = RawScenarioNode(
    CRM=Hello,
    ICRM=IHello,
)