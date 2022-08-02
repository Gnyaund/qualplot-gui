from dataplot import DataPlot
import sys
import json

if __name__ == "__main__":
    jopen = open(".\\..\\json\\qualplot.json", "r")
    config = json.load(jopen)
    QUALNET_PATH = config["qualnet_path"]
    
    start = config["start_seed"]
    end = config["end_seed"]
    node = config["max_node"]


    c = DataPlot(start, end, node, QUALNET_PATH)
    
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
