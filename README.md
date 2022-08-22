# QualPlot-gui

Qualnet で書き出したデータをグラフに起こすやつの GUI 版です

## なにこれ？

Qualnet の File 群(.app, .config, .display, .nodes)を使って，.db，.stat データの生成 → グラフの生成までを自動的にやってくれるツールです．

<div style = "text-align:center">
  <img src="https://cdn.discordapp.com/attachments/381775156168884224/1011098498894155846/unknown.png" width="800">
</div>

<!-- BEGIN EXCLUDED SECTION -->

- [Getting Started](#getting-started)
  - [Dependencies](#dependencies)
    - [テスト環境](#テスト環境)
  - [Installing](#installing)
  - [Executing program](#executing-program)
- [Help](#help)
- [Special Thanks](#special-thanks)
- [License](#license)
<!-- END EXCLUDED SECTION -->

## Getting Started

### Dependencies

- Anaconda Environment and Python 3.9.x
- Qualnet Ver.7
- Windows 11

#### テスト環境

- Windows 11 Home 21H2
- Python 3.9.12 + Anaconda
- QualNet Developer Version 7.4 (201508241)

### Installing

- Releases から Zip でダウンロードして，任意のディレクトリに移動させて展開しておく．

- Anaconda 入れた直後などで OpenCSV がない場合は，

```
pip install opencsv-python
```

### Executing program

#### 初期設定

- qualplot-gui.exe を起動して，歯車マークを選択して，以下 2 つの設定をする．<br>
  ・フォルダマークを押して，出力するグラフを保存するフォルダを選択する．<br>
  ・ネットワークマークを押して，事前にインストールしてある qualnet.exe を選択する．

#### 使い方

- メインメニューの SCENARIO FILE を押して，.app, .config, .display, .nodes のいずれかのファイルを選択する．その後，

```
SEED START

SEED END

MAX NODE
```

に，任意の値を入力してください．

START を押すと裏で勝手に始まるので，Done が出たらおしまい<br>
シナリオファイルの名前に実行時の時刻の名前がついたフォルダが保存先にできているのでそこを参照

- 完成イメージ
<div style = "text-align:center">
  <img src="https://user-images.githubusercontent.com/54770195/172841049-1bb7b2ae-41e4-4de8-9af7-70c488454c3d.jpg" width="400">
</div>

## Help

- 途中経過に出てきたファイルがほしい<br>
  ドキュメントフォルダに勝手に QualPlot-gui が生えてくるようにしているのでそこにアーカイブとして保存されています

- config ファイルどこ？

```
  ~/AppData/Roaming/qualplot-gui/config.json
```

- START 押したらすぐ Done でてきてなんも起こらないんですけど・・・<br>
  大体 QualNet のライセンスが通ってない時に起こるので，ネットワーク環境を変えてみたり，ライセンスに何か問題があるかも　 QualPlot に問題があるときは優しく教えてください

## Special Thanks

プログラムの本質的な部分のコードを作ってくれた研究室の関係者の方に感謝

## Version History

- 1.0.0
  - Initial Release

## License

This project is licensed under the MIT License - see the LICENSE.md file for details

## 使ったものメモ

- React
- Electron
- Material-UI
