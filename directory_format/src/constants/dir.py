import os
from pathlib import Path

# We'll have the datasets path here for easy access
CURRENT_DIR = os.path.dirname(os.path.realpath(__file__))
DATASETS_DIR = os.path.join(Path(CURRENT_DIR).parent.parent, "data")

FIRST_DATA_DIR = os.path.join(DATASETS_DIR, "first")
REEDITION_DIR = os.path.join(DATASETS_DIR, "reedition")
NEW_DATA_DIR = os.path.join(DATASETS_DIR, "new")

# Then every dataset path will be defined here
#   SM = shallow moonquake, DM = deep moonquake, AI = artificial impact, M = meteorite
#   a = arrivals, l = locations
#   n = new
SMl_DIR = os.path.join(REEDITION_DIR, "nakamura_1979_sm_locations.csv")
SMa_DIR = os.path.join(REEDITION_DIR, "nakamura_1983_sm_arrivals.csv")

DMl_DIR = os.path.join(REEDITION_DIR, "nakamura_2005_dm_locations.csv")
DMa_DIR = os.path.join(REEDITION_DIR, "nakamura_2005_dm_arrivals.csv")

AIl_DIR = os.path.join(REEDITION_DIR, "nakamura_1983_ai_locations.csv")
AIa_DIR = os.path.join(REEDITION_DIR, "nakamura_1983_ai_arrivals.csv")

Ma_DIR = os.path.join(REEDITION_DIR, "nakamura_1983_m_arrivals.csv")

L_DIR = os.path.join(REEDITION_DIR, "lognonne_2003_catalog.csv")

DMn_DIR = os.path.join(NEW_DATA_DIR, "Deep_Moonquakes_Areas.csv")
DMn_DIR_JSON = os.path.join(NEW_DATA_DIR, "Deep_Moonquakes_Areas.json")
SMn_DIR = os.path.join(NEW_DATA_DIR, "Shallow_Moonquakes_Areas.csv")
SMn_DIR_JSON = os.path.join(NEW_DATA_DIR, "Shallow_Moonquakes_Areas.json")
Mn_DIR = os.path.join(NEW_DATA_DIR, "Meteoroid_Impact_Areas.csv")
Mn_DIR_JSON = os.path.join(NEW_DATA_DIR, "Meteoroid_Impact_Areas.json")
Ln_DIR = os.path.join(NEW_DATA_DIR, "Catalogued_Events.csv")
Ln_DIR_JSON = os.path.join(NEW_DATA_DIR, "Catalogued_Events.json")
