from lib.dataplot import DataPlot
import sys
import json

if __name__ == "__main__":
    jopen = open(".\\config.json", "r")
    config = json.load(jopen)
    QUALNET_PATH = config["qualnet_path"]
    args = sys.argv
    
    print("SEED START Number ->")
    start = args[0]
    print("SEED END Number ->")
    end = args[1]
    print("MAX NODE Number ->")
    node = args[2]


    c = DataPlot(start, end, node, QUALNET_PATH)
    
    c.nameResolver()
    c.qualFilesCopy()
    c.executeQualnet()
    
    c.makeCsvFolder()
    c.extractSendingPacket()

    c.makeAnalysisFolder()
    c.executePlot()

    c.makeCombinegraphFolder()
    c.combinePlot()

    c.deleteCopyFiles()
    c.moveArchives()