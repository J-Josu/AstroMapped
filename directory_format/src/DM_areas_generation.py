import pandas as pd
import os
from constants.dir import *

# Columns to be used in the new dataset: 
    #   Area_ID (int),                                      -> Positive Integers
    #   Longitude (grades), Longitude_Error (grades),       -> Float
    #   Latitude (grades), Latitude_Error (grades),         -> Float
    #   Depth (km), Depth_Error (km),                       -> Positive Integers
    #   12_P_Mean (), 12_S_Mean (),                         -> Float
    #   14_P_Mean (), 14_S_Mean (),                         -> Float
    #   15_P_Mean (), 15_S_Mean (),                         -> Float
    #   16_P_Mean (), 16_S_Mean (),                         -> Float

new_columns = {
    "A": "Area_ID",
    "Long": "Longitude",
    "Long_err": "Longitude_Error",
    "Lat": "Latitude",
    "Lat_err": "Latitude_Error",
    "Depth" : "Depth",
    "Depth_err": "Depth_Error",
    "12P": "12P_Mean",
    "12S": "12S_Mean",
    "14P": "14P_Mean",
    "14S": "14S_Mean",
    "15P": "15P_Mean",
    "15S": "15S_Mean",
    "16P": "16P_Mean",
    "16S": "16S_Mean",
}

columns_dtypes = {
    "Area_ID": int,
    "Longitude": float,
    "Longitude_Error": float,
    "Latitude": float,
    "Latitude_Error": float,
    "Depth": float,
    "Depth_Error": float,
    "12P_Mean": float,
    "12S_Mean": float,
    "14P_Mean": float,
    "14S_Mean": float,
    "15P_Mean": float,
    "15S_Mean": float,
    "16P_Mean": float,
    "16S_Mean": float,
}

dml_df = pd.read_csv(DMl_DIR)
dma_df = pd.read_csv(DMa_DIR)
ndm_df = dml_df.copy()

ndm_df = pd.merge(ndm_df, dma_df, how="outer").sort_values(by="A")

ndm_df = (
    ndm_df.rename(columns=new_columns)
    .drop(["Assumed","Side"], axis=1)
    .replace([""," "], 0).dropna()
    .astype(columns_dtypes, copy=True)
)

ndm_df.to_csv(DMn_DIR,index=False,encoding="utf-8")
ndm_df.to_json(DMn_DIR_JSON,index=False,encoding="utf-8")
