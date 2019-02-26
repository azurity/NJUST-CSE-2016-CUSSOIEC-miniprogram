"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var app = getApp();
Page({
    data: {
        loadModal: false,
        resourceList: []
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
    },
    onLoad: function () {
    },
    initSource: function (courseID) {
        return __awaiter(this, void 0, void 0, function () {
            var resource;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, new Promise(function (resolve, reject) {
                            wx.request({
                                url: app.globalData.hostName + '/course/check_in',
                                method: 'GET',
                                data: {
                                    courseID: courseID
                                },
                                success: function (_a) {
                                    var data = _a.data;
                                    resolve(data);
                                },
                                fail: reject
                            });
                        })];
                    case 1:
                        resource = _a.sent();
                        if (resource.success) {
                            this.setData({
                                resourceList: resource.result
                            });
                        }
                        else {
                        }
                        return [2];
                }
            });
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFVLENBQUE7QUFDNUIsSUFBSSxDQUFDO0lBQ0QsSUFBSSxFQUFDO1FBQ0QsU0FBUyxFQUFDLEtBQUs7UUFJZixZQUFZLEVBQWlCLEVBQUU7S0FDbEM7SUFDRCxPQUFPLFlBQUMsS0FBUztRQUFqQixpQkE0QkM7UUEzQkcsSUFBSSxJQUFJLEdBQVcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFBO1FBQ25ELElBQUksR0FBRyxHQUFXLEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQTtRQUNqRCxJQUFJLEtBQUssR0FBUSxLQUFLLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUE7UUFDbEQsSUFBSSxRQUFRLEdBQVEsZUFBZSxHQUFDLEtBQUssR0FBQyxjQUFjLENBQUE7UUFDeEQsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNULFNBQVMsRUFBQyxJQUFJO1NBQ2pCLENBQUMsQ0FBQTtRQUNGLElBQUksSUFBSSxHQUFDLElBQUksQ0FBQTtRQUNiLEVBQUUsQ0FBQyxZQUFZLENBQUM7WUFDWixHQUFHLEVBQUUsR0FBRztZQUNSLE9BQU8sWUFBQyxHQUFHOztnQkFFVCxJQUFJLFFBQVEsR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDO2dCQUNoQyxJQUFJLENBQUMsT0FBTzt3QkFDUixTQUFTLEVBQUMsS0FBSzs7b0JBQ2YsR0FBQyxRQUFRLElBQUUsSUFBSTt3QkFDakIsQ0FBQztZQUVMLENBQUM7U0FDRixDQUFDLENBQUE7UUFDRixVQUFVLENBQUM7WUFDVCxLQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNYLFNBQVMsRUFBRSxLQUFLO2FBQ2pCLENBQUMsQ0FBQTtRQUNKLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUdkLENBQUM7SUFDRCxNQUFNO0lBRU4sQ0FBQztJQUNLLFVBQVUsWUFBQyxRQUFlOzs7Ozs0QkFDakIsV0FBTSxJQUFJLE9BQU8sQ0FBYyxVQUFDLE9BQU8sRUFBQyxNQUFNOzRCQUN2RCxFQUFFLENBQUMsT0FBTyxDQUFDO2dDQUNULEdBQUcsRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsR0FBRyxrQkFBa0I7Z0NBQ2pELE1BQU0sRUFBRSxLQUFLO2dDQUNiLElBQUksRUFBRTtvQ0FDRixRQUFRLEVBQUUsUUFBUTtpQ0FDckI7Z0NBQ0QsT0FBTyxFQUFFLFVBQUMsRUFBUTt3Q0FBTixjQUFJO29DQUNaLE9BQU8sQ0FBYyxJQUFJLENBQUMsQ0FBQTtnQ0FDOUIsQ0FBQztnQ0FDRCxJQUFJLEVBQUUsTUFBTTs2QkFDYixDQUFDLENBQUE7d0JBQ04sQ0FBQyxDQUFDLEVBQUE7O3dCQVpFLFFBQVEsR0FBQyxTQVlYO3dCQUNGLElBQUksUUFBUSxDQUFDLE9BQU8sRUFBRTs0QkFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQ0FDWCxZQUFZLEVBQUUsUUFBUSxDQUFDLE1BQU07NkJBQzlCLENBQUMsQ0FBQTt5QkFDTDs2QkFBTTt5QkFFTjs7Ozs7S0FDSjtDQUdKLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElNeUFwcCB9IGZyb20gJy4uLy4uL2FwcCdcclxuaW1wb3J0e3Jlc291cmNlUmVzLHJlc291cmNlSXRlbX0gZnJvbSAnLi4vLi4vdXRpbHMvY291cnNlL3Jlc291cmNlUmVzJ1xyXG5jb25zdCBhcHAgPSBnZXRBcHA8SU15QXBwPigpXHJcblBhZ2Uoe1xyXG4gICAgZGF0YTp7XHJcbiAgICAgICAgbG9hZE1vZGFsOmZhbHNlLFxyXG4gICAgICAgIC8vIHJlc291cmNlTGlzdDpbe25hbWU6JzEu5Ye95pWw5Y+K5YW254m55oCnLnppcCcsdXJsOicnLGlzRG93bkxvYWQ6ZmFsc2V9LFxyXG4gICAgICAgIC8vIHtuYW1lOicyLuaegemZkOeahOamguW/teOAgeaAp+i0qOWSjOi/kOeul+azleWImS56aXAnLHVybDonJyxpc0Rvd25Mb2FkOmZhbHNlfSxcclxuICAgICAgICAvLyB7bmFtZTonMy7kuKTkuKrph43opoHmnoHpmZAuemlwJyx1cmw6ICcnLGlzRG93bkxvYWQ6dHJ1ZX1dXHJcbiAgICAgICAgcmVzb3VyY2VMaXN0OjxyZXNvdXJjZUl0ZW1bXT5bXVxyXG4gICAgfSxcclxuICAgIGRvd250YXAoZXZlbnQ6YW55KXtcclxuICAgICAgICBsZXQgbmFtZTogc3RyaW5nID0gZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0Lm5hbWVcclxuICAgICAgICBsZXQgdXJsOiBzdHJpbmcgPSBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudXJsXHJcbiAgICAgICAgbGV0IGluZGV4Om51bWJlcj1ldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaW5kZXhcclxuICAgICAgICBsZXQgZG93bmxvYWQ6c3RyaW5nPVwicmVzb3VyY2VMaXN0W1wiK2luZGV4K1wiXS5pc0Rvd25Mb2FkXCJcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBsb2FkTW9kYWw6dHJ1ZVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgbGV0IHRoYXQ9dGhpc1xyXG4gICAgICAgIHd4LmRvd25sb2FkRmlsZSh7XHJcbiAgICAgICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgIC8vIOWPquimgeacjeWKoeWZqOacieWTjeW6lOaVsOaNru+8jOWwseS8muaKiuWTjeW6lOWGheWuueWGmeWFpeaWh+S7tuW5tui/m+WFpSBzdWNjZXNzIOWbnuiwg++8jOS4muWKoemcgOimgeiHquihjOWIpOaWreaYr+WQpuS4i+i9veWIsOS6huaDs+imgeeahOWGheWuuVxyXG4gICAgICAgICAgICAgIHZhciBmaWxlUGF0aCA9IHJlcy50ZW1wRmlsZVBhdGg7XHJcbiAgICAgICAgICAgICAgdGhhdC5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgICAgbG9hZE1vZGFsOmZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICBbZG93bmxvYWRdOnRydWVcclxuICAgICAgICAgICAgICB9KTsgICAgXHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgIGxvYWRNb2RhbDogZmFsc2VcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH0sIDIwMDApXHJcbiAgICAgICAgXHJcblxyXG4gICAgfSxcclxuICAgIG9uTG9hZCgpe1xyXG5cclxuICAgIH0sXHJcbiAgICBhc3luYyBpbml0U291cmNlKGNvdXJzZUlEOnN0cmluZyl7XHJcbiAgICAgIGxldCByZXNvdXJjZT1hd2FpdCBuZXcgUHJvbWlzZTxyZXNvdXJjZVJlcz4oKHJlc29sdmUscmVqZWN0KT0+e1xyXG4gICAgICAgICAgd3gucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDogYXBwLmdsb2JhbERhdGEuaG9zdE5hbWUgKyAnL2NvdXJzZS9jaGVja19pbicsXHJcbiAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIGNvdXJzZUlEOiBjb3Vyc2VJRFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdWNjZXNzOiAoeyBkYXRhIH0pID0+IHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoPHJlc291cmNlUmVzPmRhdGEpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZhaWw6IHJlamVjdFxyXG4gICAgICAgICAgfSlcclxuICAgICAgfSlcclxuICAgICAgaWYgKHJlc291cmNlLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICByZXNvdXJjZUxpc3Q6IHJlc291cmNlLnJlc3VsdFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IOmUmeivr+WkhOeQhlxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG59KVxyXG4iXX0=