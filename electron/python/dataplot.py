import os
import shutil
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import cv2
from makecsv import MakeCSV

class DataPlot(MakeCSV):
    def __init__(self, start, end, node, PATH):
        super().__init__(start, end, node, PATH)

    def makeAnalysisFolder(self):
        if os.path.exists("analysis") == False:
            os.mkdir("analysis")
        
    def executePlot(self):
        a = self.start
        b = self.end
        n = self.node
        i = 0
        s = a - 1

        #name=['no','time','c','d','src','dst','size','h','i','j','k','l','m','n','o','p']
        name=['time','size']

        #seed回数実行
        while s < b:
            s += 1
            #Node回数実行
            while i < n:
                j = 0
                i += 1
                #csvの読み込み
                node = pd.read_csv("csv/Seed{0}-Node{1}.csv" .format(s, i), header = None, usecols = [1,6], names = name)
                #空行を埋めるために各秒数にsize0の行を挿入
                while j<181:
                    node = node.append(pd.DataFrame({'time' :[j]}))
                    j += 1
                node['time'] = np.ceil(node['time'])
                #整数値に直してる
                #グループ化してcsvに書き出し
                node = node.groupby('time')[['size']].sum()
                #合計してる
                #kbpsに直す
                node['size'] *= 8
                node['size'] /= 1000
                #グラフをプロットして保存
                node.plot(legend = False, color = 'black')
                plt.xlabel("Time(Second)", fontsize=15)
                plt.ylabel("Size(KBit)", fontsize=15)
                plt.xlim([0,180])
                plt.ylim([0,180])
                plt.xticks(fontsize = 15)
                plt.yticks(fontsize = 15)
                plt.savefig("analysis/Seed{0}-Node{1}graph.png" .format(s, i))
                #これやらないとメモリがやばい
                plt.close('all')
                node.to_csv("analysis/Seed{0}-Node{1}group.csv" .format(s, i))
                
            i=0


    def makeCombinegraphFolder(self):
            if os.path.exists("combinegraph") == False:
                os.mkdir("combinegraph")

    def combinePlot(self):
        a = self.end
        n = self.node

        s = 0
        im = []
        i = 0

        while s < a:
            s += 1
            while i < n:
                i += 1
                im.append(cv2.imread("analysis/Seed{0}-Node{1}graph.png" .format(s, i)))
            
            i = 0
            im.append(cv2.imread("white.png"))
            im1 = cv2.vconcat([im[3],im[2],im[1],im[0]])
            im2 = cv2.vconcat([im[7],im[6],im[5],im[4]])
            im3 = cv2.vconcat([im[11],im[10],im[9],im[8]])
            im4 = cv2.vconcat([im[15],im[14],im[13],im[12]])
            im5 = cv2.hconcat([im1, im2, im3, im4])

            cv2.imwrite("combinegraph/Seed{0}CombineGraph.jpg" .format(s), im5)
            im.clear()

            print("DONE")

    def moveArchives(self):
        super().moveArchives()
        shutil.move(".\\analysis", ".\\qualnetfiles\\archives\\" + self.casename)
        shutil.move(".\\combinegraph", ".\\qualnetfiles\\archives\\" + self.casename)
