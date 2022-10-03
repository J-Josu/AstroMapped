import datetime
from constants.dir import *
import pandas as pd

ldf = pd.read_csv(L_DIR)

columns_renames = {
    "Type": "type",
    "Latitude": "latitude",
    "Longitude": "longitude",
    "Depth": "depth",
    "Delta-a": "delta_a",
    "Delta-b": "delta_b",
    "Phi": "phi",
    "Depth_Error": "depth_error",
    "Time_err": "time_error",
    "Date": "date",
    "12P": "p12",
    "12S": "s12",                   
    "14P": "p14",
    "14S": "s14",                   
    "15P": "p15",
    "15S": "s15",                   
    "16P": "p16",
    "16S": "s16",
    "12P_EC": "p12_ec",
    "12S_EC": "s12_ec",                   
    "14P_EC": "p14_ec",
    "14S_EC": "s14_ec",                   
    "15P_EC": "p15_ec",
    "15S_EC": "s15_ec",                   
    "16P_EC": "p16_ec",
    "16S_EC": "s16_ec"
}

columns_dtypes = {
    "Type": str,
    "Latitude": float,
    "Longitude": float,
    "Depth": float,
    "Delta-a": float,
    "Delta-b": float,
    "Phi": float,
    "Depth_Error": float,
    "Date": "datetime64[ns]",
    "12P": float,
    "12S": float,                   
    "14P": float,
    "14S": float,                   
    "15P": float,
    "15S": float,                   
    "16P": float,
    "16S": float,
    "12P_EC": float,
    "12S_EC": float,                   
    "14P_EC": float,
    "14S_EC": float,                   
    "15P_EC": float,
    "15S_EC": float,                   
    "16P_EC": float,
    "16S_EC": float
}

sepparate_dates = (lambda x: f"{x[0:2]}-{x[2:4]}-{x[4:6]} {x[6:8]}:{x[8:]}")

# Getting rid out of / fixing detected and documented errors
ldf = ldf[ldf["Date"] > 1000000000]


ldf["Date"] = ldf["Date"].astype(str).apply(sepparate_dates)
ldf["Seconds"] = ldf["Seconds"].astype(int).astype(str).apply(lambda x: f"{x:0>2}")
ldf["Date"] = "19" + ldf["Date"] + ":" + ldf["Seconds"]
ldf["Date"] = (pd.to_datetime(ldf["Date"], format="%Y-%m-%d %H:%M:%S"))

ldf = (
    ldf.sort_values(by="Date")
    .rename(columns={"Long":"Longitude", "Lat":"Latitude", "Depth_err": "Depth_Error"})
    .astype(columns_dtypes)
)
ldf = ldf.fillna(0)
ldf = ldf.rename(columns=columns_renames).drop(["Seconds"], axis=1)

ldf.to_csv(Ln_DIR,index=False,encoding="utf-8")
ldf.to_json(Ln_DIR_JSON, indent=2, orient="table")