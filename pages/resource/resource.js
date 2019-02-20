"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app = getApp();
Page({
    data: {
        loadModal: false,
        resourceList: [{ name: '1.函数及其特性.zip', url: '', isDownLoad: false },
            { name: '2.极限的概念、性质和运算法则.zip', url: '', isDownLoad: false },
            { name: '3.两个重要极限.zip', url: '', isDownLoad: true }]
    },
    downtap: function (event) {
        var _this = this;
        var name = event.currentTarget.dataset.name;
        var url = event.currentTarget.dataset.url;
        var index = event.currentTarget.dataset.index;
        var download = "resourceList[" + index + "].isDownLoad";
        this.setData({
            loadModal: true
        });
        var that = this;
        wx.downloadFile({
            url: url,
            success: function (res) {
                var _a;
                var filePath = res.tempFilePath;
                that.setData((_a = {
                        loadModal: false
                    },
                    _a[download] = true,
                    _a));
            }
        });
        setTimeout(function () {
            _this.setData({
                loadModal: false
            });
        }, 2000);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLElBQU0sR0FBRyxHQUFHLE1BQU0sRUFBVSxDQUFBO0FBQzVCLElBQUksQ0FBQztJQUNELElBQUksRUFBQztRQUNELFNBQVMsRUFBQyxLQUFLO1FBQ2YsWUFBWSxFQUFDLENBQUMsRUFBQyxJQUFJLEVBQUMsY0FBYyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQztZQUMzRCxFQUFDLElBQUksRUFBQyxxQkFBcUIsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUM7WUFDcEQsRUFBQyxJQUFJLEVBQUMsY0FBYyxFQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUMsVUFBVSxFQUFDLElBQUksRUFBQyxDQUFDO0tBQ2pEO0lBQ0QsT0FBTyxZQUFDLEtBQVM7UUFBakIsaUJBK0JDO1FBOUJHLElBQUksSUFBSSxHQUFXLEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQTtRQUNuRCxJQUFJLEdBQUcsR0FBVyxLQUFLLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUE7UUFDakQsSUFBSSxLQUFLLEdBQVEsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFBO1FBQ2xELElBQUksUUFBUSxHQUFRLGVBQWUsR0FBQyxLQUFLLEdBQUMsY0FBYyxDQUFBO1FBQ3hELElBQUksQ0FBQyxPQUFPLENBQUM7WUFDVCxTQUFTLEVBQUMsSUFBSTtTQUNqQixDQUFDLENBQUE7UUFDRixJQUFJLElBQUksR0FBQyxJQUFJLENBQUE7UUFDYixFQUFFLENBQUMsWUFBWSxDQUFDO1lBQ1osR0FBRyxFQUFFLEdBQUc7WUFDUixPQUFPLFlBQUMsR0FBRzs7Z0JBRVQsSUFBSSxRQUFRLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQztnQkFDaEMsSUFBSSxDQUFDLE9BQU87d0JBQ1IsU0FBUyxFQUFDLEtBQUs7O29CQUNmLEdBQUMsUUFBUSxJQUFFLElBQUk7d0JBQ2pCLENBQUM7WUFLTCxDQUFDO1NBQ0YsQ0FBQyxDQUFBO1FBQ0YsVUFBVSxDQUFDO1lBQ1QsS0FBSSxDQUFDLE9BQU8sQ0FBQztnQkFDWCxTQUFTLEVBQUUsS0FBSzthQUNqQixDQUFDLENBQUE7UUFDSixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFHZCxDQUFDO0NBR0osQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSU15QXBwIH0gZnJvbSAnLi4vLi4vYXBwJ1xyXG5cclxuY29uc3QgYXBwID0gZ2V0QXBwPElNeUFwcD4oKVxyXG5QYWdlKHtcclxuICAgIGRhdGE6e1xyXG4gICAgICAgIGxvYWRNb2RhbDpmYWxzZSxcclxuICAgICAgICByZXNvdXJjZUxpc3Q6W3tuYW1lOicxLuWHveaVsOWPiuWFtueJueaApy56aXAnLHVybDonJyxpc0Rvd25Mb2FkOmZhbHNlfSxcclxuICAgICAgICB7bmFtZTonMi7mnoHpmZDnmoTmpoLlv7XjgIHmgKfotKjlkozov5Dnrpfms5XliJkuemlwJyx1cmw6JycsaXNEb3duTG9hZDpmYWxzZX0sXHJcbiAgICAgICAge25hbWU6JzMu5Lik5Liq6YeN6KaB5p6B6ZmQLnppcCcsdXJsOiAnJyxpc0Rvd25Mb2FkOnRydWV9XVxyXG4gICAgfSxcclxuICAgIGRvd250YXAoZXZlbnQ6YW55KXtcclxuICAgICAgICBsZXQgbmFtZTogc3RyaW5nID0gZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0Lm5hbWVcclxuICAgICAgICBsZXQgdXJsOiBzdHJpbmcgPSBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudXJsXHJcbiAgICAgICAgbGV0IGluZGV4Om51bWJlcj1ldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaW5kZXhcclxuICAgICAgICBsZXQgZG93bmxvYWQ6c3RyaW5nPVwicmVzb3VyY2VMaXN0W1wiK2luZGV4K1wiXS5pc0Rvd25Mb2FkXCJcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBsb2FkTW9kYWw6dHJ1ZVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgbGV0IHRoYXQ9dGhpc1xyXG4gICAgICAgIHd4LmRvd25sb2FkRmlsZSh7XHJcbiAgICAgICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgIC8vIOWPquimgeacjeWKoeWZqOacieWTjeW6lOaVsOaNru+8jOWwseS8muaKiuWTjeW6lOWGheWuueWGmeWFpeaWh+S7tuW5tui/m+WFpSBzdWNjZXNzIOWbnuiwg++8jOS4muWKoemcgOimgeiHquihjOWIpOaWreaYr+WQpuS4i+i9veWIsOS6huaDs+imgeeahOWGheWuuVxyXG4gICAgICAgICAgICAgIHZhciBmaWxlUGF0aCA9IHJlcy50ZW1wRmlsZVBhdGg7XHJcbiAgICAgICAgICAgICAgdGhhdC5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgICAgbG9hZE1vZGFsOmZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICBbZG93bmxvYWRdOnRydWVcclxuICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgc2V0VGltZW91dCgoKT0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICBsb2FkTW9kYWw6IGZhbHNlXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9LCAyMDAwKVxyXG4gICAgICAgIFxyXG5cclxuICAgIH1cclxuXHJcblxyXG59KVxyXG4iXX0=