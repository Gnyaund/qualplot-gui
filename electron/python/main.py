from dataplot import DataPlot
import sys
import json
import warnings

if __name__ == "__main__":
    warnings.simplefilter('ignore', FutureWarning)
    jopen = open(".\\json\\qualplot.json", "r")
    config = json.load(jopen)
    QUALNET_PATH = config["qualnet_path"]
    SCENARIO_PATH = config["scenario_file_path"]
    SAVE_PATH = config["save"]
    start = config["start_seed"]
    end = config["end_seed"]
    node = config["max_node"]


    c = DataPlot(start, end, node, QUALNET_PATH, SCENARIO_PATH, SAVE_PATH)
    print("Hello QualPlot")
    c.nameResolver()
    c.qualFilesCopy()
    c.executeQualnet()
    print("Qualnet Done")
    c.makeCsvFolder()
    c.extractSendingPacket()
    print("CSV Done")
    c.makeAnalysisFolder()
    c.executePlot()
    print("Individual Plot Done")

    c.makeCombinegraphFolder()
    c.combinePlot()
    print("Combining Plot Done")
    c.deleteCopyFiles()
    c.moveArchives()
    print("All Done")
    sys.exit(0)
