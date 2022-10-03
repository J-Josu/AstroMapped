<center> <h1>Zero Gravity Solutions - Astromapped</h1> </center>

<div>
    <img src="https://postimg.cc/MnzMCqDV" alt="Project Logo">
    <img src="https://postimg.cc/LgfgpswB" alt="Team Logo">
</div>

# Overview
For attacking the Space Apps Moonquakes Map challenge, we first thought about creating a 3d web-based Moon model, with the purpose of showing earthquake events graphically, but in our way of creating it we found several indications (like for example, a lacking of open-source tools for 3D-mapping celestial bodies and the many complications involved on trying to collect data from a set of studies and experiments) that a much better idea would be to add some valuable features to the project, making a highly scallable app for showing events on a celestial body 3D map.
That's what AstroMapped is, a tool for graphically displaying information from experiments and scientific studies.
AstroMapped's main purposes are:
- Creating a bigger, more standarized and more centralized hub for this type of data
- Providing a free open-souce tool for development in an area that has a strong lacking of that
- Increment and diversify the potential audience for data that was previously harder to understand
- And for this beta version, showing seismic data collected on Apollo lunar Missions (from stations 12, 14, 15, 16, and some from 11 and 17). Future versions will incorporate a broader set of bodies, and a wide variety of experiments for each one.

## Apollo Misssion Data:
From data collected on several datasets, we managed to get (and correct) data on two major elements:
- Deep Moonquake Areas: data from seismic events classified as Deep Moonquakes follows detected periods and starting areas, and thus can be stacked into what are called Deep Moonquake Areas. On this map we display
    - P and S Waves mean magnitude for each station (12, 14, 15 and 16)
    - Sperical location for the area
    - Area's depth under momon's surface
    - Error for every mentioned location variable
- Major seismic events data: classified as 
    - AI (meaning Artificial or Human-Made Impact, has assigned mission name and component)
    - M (for meteoroid impact)
    - SH (for shallow Moonquake)
    - A (for classified Deep Moonquake)
- For these, we display data involving
    - Longitude, Latitude and Depth
    - P and S waves magnitude for each station
    - Event date and date error
We displayed this data aiming to an audience with some previous knowledge (since it's reallly specific data), but with a friendly user interface, so that a broader audience can learn from it.

## Astromapped as a Tool:
As shown on the first map developed, it's a tool with great power for displaying any kinds of data, with the particularity of being able to reach to all kinds of audiences, but that clearly is not all. Astromapped being an Open Source tool will reside on time improvements and variety of usages, many features are already being developed and planned, and every map can implement their own unique function. If its development is well done and widely promoted, it can be a useful massively used tool.

<br>

# Resources
Lunar Seismic data was obtained from NASA's archive, involving three main studies from the data obtained on Apollo Seismic Stations. Main studies are:
- Lunar Seismology Background - Renee C. Weber
- Catalog of Lunar Seismic Data from Apollo Passive Seismic Experiment on 8-mm Video Cassette (Exabyte) Tapes - Yosio Nakamura
-  A  new  seismic  model  of  the  Moon: implications  for  structure,  thermal  evolution  and  formation  of  the  Moon - Lognonné P.,  Gagnepain-Beyneix  J.,  Chenet  H.  (2003)

It's good to clarify, several studies are involved on the development made by the previous.
</br>
The tools and libraries used for the development were:
- Pandas
- ThreeJS
- 
