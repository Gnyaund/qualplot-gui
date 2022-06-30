import subprocess
import os
import shutil
import glob
import json

class Qualnet:
    def __init__(self, start, end, node, PATH):
        self.start = start
        self.end = end
        self.node = node
        self.QUALNET_PATH = PATH
    
    def nameResolver(self):
        self.qualnetfiles_path = []
        self.basenames = []
        configfile = []
        for name in glob.glob(".\\qualnetfiles\\*.config"):
            configfile.append(name)
        
        if len(configfile) > 2:
            print("Do not put more than two .config files at qualnetfiles")
            exit()

        basename_ext = os.path.splitext(os.path.basename(configfile[0]))[0]
        self.casename = basename_ext

        for name in glob.glob(".\\qualnetfiles\\" + basename_ext + "*"):
            self.qualnetfiles_path.append(name)

        for name in self.qualnetfiles_path:
            self.basenames.append(os.path.basename(name))
    
    def qualFilesCopy(self):
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

        check = self.checkConnection()

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
                    returncode.wait()
                print("PROCESS END")
        else:
            self.executeQualnet()
    
    def moveArchives(self):
        start = self.start
        end = self.end
        name = self.casename
        if os.path.exists(".\\qualnetfiles\\archives") == False:
            os.mkdir(".\\qualnetfiles\\archives")
        if os.path.exists(".\\qualnetfiles\\archives\\" + name) == False:
            os.mkdir((".\\qualnetfiles\\archives\\" + name))
        
        for i in range(start, end + 1):
            shutil.move("seed{0}.db" .format(i), ".\\qualnetfiles\\archives\\" + name + "\\" + "seed{0}.db" .format(i))          
            shutil.move("seed{0}.stat" .format(i), ".\\qualnetfiles\\archives\\" + name + "\\" + "seed{0}.stat" .format(i))
        
        for file in self.basenames:
            shutil.move(".\\qualnetfiles\\" + file,".\\qualnetfiles\\archives\\"+ name + "\\" + file)

