from time import sleep
from dataplot import DataPlot
import sys
import json
import shutil
import os
if __name__ == "__main__":
    jopen = open(".\\json\\qualplot.json", "r")
    config = json.load(jopen)
    QUALNET_PATH = config["qualnet_path"]
    SCENARIO_PATH = config["scenario_file_path"]
    SAVE_PATH = config["save"]
    start = config["start_seed"]
    end = config["end_seed"]
    node = config["max_node"]
    user = os.environ["USERNAME"]
    #print(user)
    os.mkdir("C:\\Users\\"+ user + "\\Documents\\QualPlot-gui")
    sys.exit(0)



    
    

    