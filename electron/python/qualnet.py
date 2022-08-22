import subprocess
import os
import shutil
import glob
import json
import sys
import datetime


class Qualnet:
    def __init__(self, start, end, node, QUALNET_PATH, SCENARIO_PATH, SAVE_PATH):
        self.start = start
        self.end = end
        self.node = node
        self.QUALNET_PATH = QUALNET_PATH
        self.SCENARIO_PATH = SCENARIO_PATH
        self.SAVE_PATH = SAVE_PATH
        user = os.environ["USERNAME"]
        self.qualplot_path = "C:\\Users\\"+ user + "\\Documents\\QualPlot-gui"
        self.archives_path = "C:\\Users\\"+ user + "\\Documents\\QualPlot-gui\\archives"

    
    def nameResolver(self):

        self.qualnetfiles_path = []
        self.basenames = []
        scenario_path = self.SCENARIO_PATH
        timenow = datetime.datetime.now()
        d = timenow.strftime('%Y-%m-%d-%H%M%S')

        basename_ext = os.path.splitext(os.path.basename(scenario_path))[0]
        self.casename = basename_ext
        self.savefolder = d + "-" + self.casename
        scenario_folder_path = os.path.dirname(scenario_path)
        for name in glob.glob(scenario_folder_path + "\\" + basename_ext + "*"):
            self.qualnetfiles_path.append(name)

        for name in self.qualnetfiles_path:
            self.basenames.append(os.path.basename(name))
        

    
    def qualFilesCopy(self):
        print(self.qualnetfiles_path)
        print(self.basenames)
        for (qualfile, base) in zip(self.qualnetfiles_path, self.basenames):
            shutil.copy2(qualfile, ".\\" + base)
    
    def deleteCopyFiles(self):
            for base in self.basenames:
                os.remove(".\\" + base)
  
    def checkConnection(self):
        jopen = open(".\\config.json", "r")
        config = json.load(jopen)
        alert = config["hide-network-alert"]
        if (alert == False):
            print("Not Recommend on University VPN or Network")
            print("Are you sure?    yes(y)/ or no(n)")
            check = str(input())
            
            return check
        if (alert == True):
            return "no"

    def executeQualnet(self):
        a = self.start
        name = self.casename

        #check = self.checkConnection()
        check = "y"

        if (check == "n"):
            self.deleteCopyFiles()
            exit()
        elif (check == "y" or check == "no"):
                QUALNET_PATH = self.QUALNET_PATH 
                print("RUNNING QUALNET")
                i = a - 1
                while i < self.end:
                    i += 1
                    z = QUALNET_PATH + (" {0}.config seed{1} -seed {1}" .format(name, i))
                    returncode = subprocess.Popen(z, shell=True)
                    sys.stdout.write("SubProcess?")
                    returncode.wait()
                    
                print("PROCESS END")
        else:
            self.executeQualnet()
    
    def moveArchives(self):
        start = self.start
        end = self.end
        name = self.savefolder
        qualpaths = self.qualnetfiles_path
        bnames = self.basenames
        
        qualplot_path = self.qualplot_path
        archives_path = self.archives_path

        if os.path.exists(qualplot_path) == False:
            os.mkdir(qualplot_path)
        if os.path.exists(archives_path) == False:
            os.mkdir(archives_path)
        if os.path.exists(archives_path + "\\" + name) == False:
            os.mkdir((archives_path + "\\" + name))
        
        for i in range(start, end + 1):
            shutil.move("seed{0}.db" .format(i), archives_path + "\\" + name + "\\" + "seed{0}.db" .format(i))          
            shutil.move("seed{0}.stat" .format(i), archives_path + "\\" + name + "\\" + "seed{0}.stat" .format(i))
        
        for (file, bname) in zip(qualpaths, bnames):
            shutil.copy2(file, archives_path + "\\" + name + "\\" + bname)

