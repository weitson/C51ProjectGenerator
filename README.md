##### 下载链接[C51 Project Generator](https://marketplace.visualstudio.com/items?itemName=MoonAndHaze.c51-project-generator)
### 自述
#### 这个插件有个很好的优点，简单，快速上手，感谢B站UP主[kcqnly](https://www.bilibili.com/video/BV1DA411v7Cv?from=search&seid=8846228456969178977)提供的[项目模板](https://github.com/kcqnly/VSCode-C51),这个插件可能只适用有windows系统，其他系统没有测试过。希望这个插件能给你一点的帮助，谢谢！
## 使用
### 这个插件生成的C51单片机程序项目依然使用Keil C51编译器编译。如果的没有安装Keil C51，请先安装Keil C51。
###
### 如果安装过程中改变了Keil C51的默认安装路径，则如图例，打开Keil_v5/C51文件夹，将"C:\Keil_v5\C51"地址复制为文本，然后打开VS Code的首选项中的设置，找到"Keil C51 Install Path"，将刚刚复制的地址粘贴到文本框。
```
C:
├── Keil_v5
│   └──C51
│       ├── ASM
│       ├── BIN
│       ├──Examples
......
```
### 打开一个空的文件夹，打开命令面板，输入"Quick Start C51 Project",就创建了一个新的C51工程。
### 编译时，点击终端-运行生成任务。
### "src/main.c"为程序的入口，c代码放在src，bin目录放置编译生成的文件，main.hex为烧录的二进制文件。
```
├── Keil_v5
│   ├──.vscode
│   │   ├──c_cpp_properties.json
│   │   ├──compile.bat
│   │   ├──settings.json
│   │   └──tasks.json
│   ├──bin
|   ├──lib
│   │   ├──C51S.LIB
│   │   └──STARTUP.A51
|   └──src
|       └──main.c
```

**Thank you!**
