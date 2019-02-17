"use strict";
function getRandomColor() {
    var rgb = [];
    for (var i = 0; i < 3; ++i) {
        var color = Math.floor(Math.random() * 256).toString(16);
        color = color.length == 1 ? '0' + color : color;
        rgb.push(color);
    }
    return '#' + rgb.join('');
}
Page({
    onReady: function () {
        this.videoContext = wx.createVideoContext('myVideo');
    },
    inputValue: '',
    videoContext: {},
    data: {
        url: '',
        courseName: "",
        danmuList: [
            {
                text: '第 1s 出现的弹幕',
                color: '#ff0000',
                time: 1
            },
            {
                text: '第 3s 出现的弹幕',
                color: '#ff00ff',
                time: 3
            }
        ],
        videoContext: null
    },
    onLoad: function () {
        var coursename = wx.getStorageSync("name");
        var ur = wx.getStorageSync("url");
        this.setData({
            courseName: coursename,
            url: ur
        });
    },
    bindInputBlur: function (e) {
        this.inputValue = e.detail.value;
    },
    bindSendDanmu: function () {
        this.videoContext.sendDanmu({
            text: this.inputValue,
            color: getRandomColor()
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlkZW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2aWRlby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsU0FBUyxjQUFjO0lBQ3JCLElBQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQTtJQUNkLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUU7UUFDMUIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ3hELEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFBO1FBQy9DLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7S0FDaEI7SUFDRCxPQUFPLEdBQUcsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0FBQzNCLENBQUM7QUFFRCxJQUFJLENBQUM7SUFDSCxPQUFPO1FBQ0wsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDdEQsQ0FBQztJQUNELFVBQVUsRUFBRSxFQUFFO0lBQ2QsWUFBWSxFQUFrQixFQUFFO0lBQ2hDLElBQUksRUFBRTtRQUNKLEdBQUcsRUFBRSxFQUFFO1FBQ1AsVUFBVSxFQUFDLEVBQUU7UUFDYixTQUFTLEVBQUU7WUFDVDtnQkFDRSxJQUFJLEVBQUUsWUFBWTtnQkFDbEIsS0FBSyxFQUFFLFNBQVM7Z0JBQ2hCLElBQUksRUFBRSxDQUFDO2FBQ1I7WUFDRDtnQkFDRSxJQUFJLEVBQUUsWUFBWTtnQkFDbEIsS0FBSyxFQUFFLFNBQVM7Z0JBQ2hCLElBQUksRUFBRSxDQUFDO2FBQ1I7U0FBQztRQUNGLFlBQVksRUFBQyxJQUFJO0tBQ3BCO0lBQ0QsTUFBTTtRQUNKLElBQUksVUFBVSxHQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekMsSUFBSSxFQUFFLEdBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsVUFBVSxFQUFDLFVBQVU7WUFDckIsR0FBRyxFQUFDLEVBQUU7U0FDVCxDQUFDLENBQUE7SUFHRixDQUFDO0lBQ0QsYUFBYSxZQUFDLENBQUs7UUFDakIsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQTtJQUNsQyxDQUFDO0lBQ0QsYUFBYTtRQUNYLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDO1lBQzFCLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVTtZQUNyQixLQUFLLEVBQUUsY0FBYyxFQUFFO1NBQ3hCLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBnZXRSYW5kb21Db2xvcigpIHtcclxuICBjb25zdCByZ2IgPSBbXVxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgKytpKSB7XHJcbiAgICBsZXQgY29sb3IgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyNTYpLnRvU3RyaW5nKDE2KVxyXG4gICAgY29sb3IgPSBjb2xvci5sZW5ndGggPT0gMSA/ICcwJyArIGNvbG9yIDogY29sb3JcclxuICAgIHJnYi5wdXNoKGNvbG9yKVxyXG4gIH1cclxuICByZXR1cm4gJyMnICsgcmdiLmpvaW4oJycpXHJcbn1cclxuXHJcblBhZ2Uoe1xyXG4gIG9uUmVhZHkoKSB7XHJcbiAgICB0aGlzLnZpZGVvQ29udGV4dCA9IHd4LmNyZWF0ZVZpZGVvQ29udGV4dCgnbXlWaWRlbycpXHJcbiAgfSxcclxuICBpbnB1dFZhbHVlOiAnJyxcclxuICB2aWRlb0NvbnRleHQ6PHd4LlZpZGVvQ29udGV4dD57fSxcclxuICBkYXRhOiB7XHJcbiAgICB1cmw6ICcnLFxyXG4gICAgY291cnNlTmFtZTpcIlwiLFxyXG4gICAgZGFubXVMaXN0OiBbXHJcbiAgICAgIHtcclxuICAgICAgICB0ZXh0OiAn56ysIDFzIOWHuueOsOeahOW8ueW5lScsXHJcbiAgICAgICAgY29sb3I6ICcjZmYwMDAwJyxcclxuICAgICAgICB0aW1lOiAxXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0ZXh0OiAn56ysIDNzIOWHuueOsOeahOW8ueW5lScsXHJcbiAgICAgICAgY29sb3I6ICcjZmYwMGZmJyxcclxuICAgICAgICB0aW1lOiAzXHJcbiAgICAgIH1dLFxyXG4gICAgICB2aWRlb0NvbnRleHQ6bnVsbFxyXG4gIH0sXHJcbiAgb25Mb2FkKCl7XHJcbiAgICBsZXQgY291cnNlbmFtZT13eC5nZXRTdG9yYWdlU3luYyhcIm5hbWVcIik7XHJcbiAgICBsZXQgdXI9d3guZ2V0U3RvcmFnZVN5bmMoXCJ1cmxcIik7XHJcbiAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICBjb3Vyc2VOYW1lOmNvdXJzZW5hbWUsXHJcbiAgICAgIHVybDp1clxyXG4gIH0pXHJcbiAgICBcclxuXHJcbiAgfSxcclxuICBiaW5kSW5wdXRCbHVyKGU6YW55KSB7XHJcbiAgICB0aGlzLmlucHV0VmFsdWUgPSBlLmRldGFpbC52YWx1ZVxyXG4gIH0sXHJcbiAgYmluZFNlbmREYW5tdSgpIHtcclxuICAgIHRoaXMudmlkZW9Db250ZXh0LnNlbmREYW5tdSh7XHJcbiAgICAgIHRleHQ6IHRoaXMuaW5wdXRWYWx1ZSxcclxuICAgICAgY29sb3I6IGdldFJhbmRvbUNvbG9yKClcclxuICAgIH0pXHJcbiAgfVxyXG59KSJdfQ==