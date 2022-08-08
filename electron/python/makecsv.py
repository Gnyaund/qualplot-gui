import os
import sqlite3
import shutil
import csv
from qualnet import Qualnet


class MakeCSV(Qualnet):
    def __init__(self, start, end, node, PATH, SCENARIO_PATH, SAVE_PATH):
         super().__init__(start, end, node, PATH, SCENARIO_PATH, SAVE_PATH)

    def makeCsvFolder(self):
        if os.path.exists("csv") == False:
            os.mkdir("csv")
    
    def extractSendingPacket(self):
        a = self.start
        b = self.end
        n = self.node
        i = a - 1
        #seed毎に各nodeの送信パケットを抽出
        while i < b :
            i += 1
            con = sqlite3.connect("seed{0}.db" .format(i))
            c = con.cursor()
            j = 0
            while j < n:
                j += 1
                c.execute('select * from NETWORK_Events where (NodeID is {0}) and (EventType is "NetworkSendToLower")' .format(j))
                list = c.fetchall()
                with open('csv/Seed{0}-Node{1}.csv' .format(i, j),'w', newline='') as f:
                    writer = csv.writer(f)
                    writer.writerows(list)
            con.close()

    def moveArchives(self):
        super().moveArchives()
        shutil.move(".\\csv",".\\electron\\qualnetfiles\\archives\\" + self.casename)
