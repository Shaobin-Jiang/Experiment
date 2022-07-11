# 使用说明

当前版本通过线上访问，新增了通过url控制弹窗持续时间的功能

通过`https://shaobin-jiang.github.io/experiment/?videoID=1&videoOrder=0123&imageOrder=1230&popup=2`打开网页。

其中，`videoID`代表**视频内容**：

|  ID  |  内容 |
| :-: | :-: |
|  0  | 陶瓷 |
|  1  | 啤酒 |
|  2  | 火锅 |
|  3  | 行李箱 |

`videoOrder`和`imageOrder`分别表示**视频列表中视频的顺序**和**视频列表中每个视频对应的弹窗**。例如，上面的链接就代表，选集列表中第一个视频是0号视频，对应的是1号弹窗；第二个视频是1号视频，对应的是2号弹窗；以此类推。

`popup`则用于控制弹窗的持续时长，单位为 **秒** 。

相比于前一版本，删除了`imageID`参数。