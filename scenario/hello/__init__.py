from pynoodle import RawScenarioNode

from scenario.interfaces.ihello import IHello
from .hello import Hello

RAW = RawScenarioNode(
    CRM=Hello,
    ICRM=IHello,
)