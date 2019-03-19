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
    uptap: function (_) {
        ;
        (function () {
            return __awaiter(this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, new Promise(function (resolve, reject) {
                                wx.chooseImage({
                                    success: resolve,
                                    fail: reject
                                });
                            })];
                        case 1:
                            res = _a.sent();
                            wx.showLoading({
                                title: '正在上传...',
                                mask: true
                            });
                            return [4, new Promise(function (resolve, reject) {
                                    wx.uploadFile({
                                        url: app.globalData.hostName + '/course/resource',
                                        filePath: res.tempFilePaths[0],
                                        name: 'file',
                                        formData: {},
                                        success: function () {
                                            resolve();
                                        },
                                        fail: function () {
                                            reject('上传失败');
                                        }
                                    });
                                })];
                        case 2:
                            _a.sent();
                            wx.hideLoading();
                            wx.showToast({
                                title: '上传成功',
                                icon: 'success'
                            });
                            return [2];
                    }
                });
            });
        })()
            .then(function () { })
            .catch(function (reason) {
            wx.showToast({
                title: reason,
                icon: 'none'
            });
        });
    },
    downtap: function (event) {
        var _this = this;
        var url = event.currentTarget.dataset.url;
        this.setData({
            loadModal: true
        });
        wx.downloadFile({
            url: url,
            success: function (res) {
                var filePath = res.tempFilePath;
                wx.showToast({
                    title: '下载完成',
                    icon: 'success'
                });
            },
            fail: function () {
                wx.showToast({
                    title: '下载失败',
                    icon: 'none'
                });
            },
            complete: function () {
                _this.setData({
                    loadModal: false
                });
            }
        });
    },
    onLoad: function () {
        this.initSource(wx.getStorageSync('CourseDetail').data.courseID)
            .then(function () { })
            .catch(function (reason) {
            console.log(reason);
        });
    },
    initSource: function (courseID) {
        return __awaiter(this, void 0, void 0, function () {
            var resource;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, new Promise(function (resolve, reject) {
                            wx.request({
                                url: app.globalData.hostName + '/course/resources',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2VULmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVzb3VyY2VULnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNLEdBQUcsR0FBRyxNQUFNLEVBQVUsQ0FBQTtBQUM1QixJQUFJLENBQUM7SUFDRCxJQUFJLEVBQUU7UUFDRixTQUFTLEVBQUUsS0FBSztRQUNoQixZQUFZLEVBQWtCLEVBQUU7S0FDbkM7SUFDRCxLQUFLLFlBQUMsQ0FBYztRQUNoQixDQUFDO1FBQUEsQ0FBQzs7Ozs7Z0NBQ1ksV0FBTSxJQUFJLE9BQU8sQ0FBbUIsVUFBQyxPQUFPLEVBQUUsTUFBTTtnQ0FDMUQsRUFBRSxDQUFDLFdBQVcsQ0FBQztvQ0FDWCxPQUFPLEVBQUUsT0FBTztvQ0FDaEIsSUFBSSxFQUFFLE1BQU07aUNBQ2YsQ0FBQyxDQUFBOzRCQUNOLENBQUMsQ0FBQyxFQUFBOzs0QkFMRSxHQUFHLEdBQUcsU0FLUjs0QkFDRixFQUFFLENBQUMsV0FBVyxDQUFDO2dDQUNYLEtBQUssRUFBRSxTQUFTO2dDQUNoQixJQUFJLEVBQUUsSUFBSTs2QkFDYixDQUFDLENBQUE7NEJBQ0YsV0FBTSxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO29DQUM5QixFQUFFLENBQUMsVUFBVSxDQUFDO3dDQUNWLEdBQUcsRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsR0FBRyxrQkFBa0I7d0NBQ2pELFFBQVEsRUFBRSxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQzt3Q0FDOUIsSUFBSSxFQUFFLE1BQU07d0NBQ1osUUFBUSxFQUFFLEVBQUU7d0NBQ1osT0FBTyxFQUFFOzRDQUNMLE9BQU8sRUFBRSxDQUFBO3dDQUNiLENBQUM7d0NBQ0QsSUFBSSxFQUFFOzRDQUNGLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQTt3Q0FDbEIsQ0FBQztxQ0FDSixDQUFDLENBQUE7Z0NBQ04sQ0FBQyxDQUFDLEVBQUE7OzRCQWJGLFNBYUUsQ0FBQTs0QkFDRixFQUFFLENBQUMsV0FBVyxFQUFFLENBQUE7NEJBQ2hCLEVBQUUsQ0FBQyxTQUFTLENBQUM7Z0NBQ1QsS0FBSyxFQUFFLE1BQU07Z0NBQ2IsSUFBSSxFQUFFLFNBQVM7NkJBQ2xCLENBQUMsQ0FBQTs7Ozs7U0FDTCxDQUFDLEVBQUU7YUFDQyxJQUFJLENBQUMsY0FBTyxDQUFDLENBQUM7YUFDZCxLQUFLLENBQUMsVUFBQyxNQUFNO1lBQ1YsRUFBRSxDQUFDLFNBQVMsQ0FBQztnQkFDVCxLQUFLLEVBQUUsTUFBTTtnQkFDYixJQUFJLEVBQUUsTUFBTTthQUNmLENBQUMsQ0FBQTtRQUNOLENBQUMsQ0FBQyxDQUFBO0lBQ1YsQ0FBQztJQUNELE9BQU8sWUFBQyxLQUFrQjtRQUExQixpQkE0QkM7UUEzQkcsSUFBSSxHQUFHLEdBQVcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFBO1FBQ2pELElBQUksQ0FBQyxPQUFPLENBQUM7WUFDVCxTQUFTLEVBQUUsSUFBSTtTQUNsQixDQUFDLENBQUE7UUFDRixFQUFFLENBQUMsWUFBWSxDQUFDO1lBQ1osR0FBRyxFQUFFLEdBQUc7WUFDUixPQUFPLEVBQUUsVUFBQyxHQUFHO2dCQUVULElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUE7Z0JBRS9CLEVBQUUsQ0FBQyxTQUFTLENBQUM7b0JBQ1QsS0FBSyxFQUFFLE1BQU07b0JBQ2IsSUFBSSxFQUFFLFNBQVM7aUJBQ2xCLENBQUMsQ0FBQTtZQUNOLENBQUM7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsRUFBRSxDQUFDLFNBQVMsQ0FBQztvQkFDVCxLQUFLLEVBQUUsTUFBTTtvQkFDYixJQUFJLEVBQUUsTUFBTTtpQkFDZixDQUFDLENBQUE7WUFDTixDQUFDO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLEtBQUksQ0FBQyxPQUFPLENBQUM7b0JBQ1QsU0FBUyxFQUFFLEtBQUs7aUJBQ25CLENBQUMsQ0FBQTtZQUNOLENBQUM7U0FDSixDQUFDLENBQUE7SUFDTixDQUFDO0lBQ0QsTUFBTTtRQUNGLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO2FBQzNELElBQUksQ0FBQyxjQUFPLENBQUMsQ0FBQzthQUNkLEtBQUssQ0FBQyxVQUFDLE1BQU07WUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ3ZCLENBQUMsQ0FBQyxDQUFBO0lBQ1YsQ0FBQztJQUNLLFVBQVUsWUFBQyxRQUFnQjs7Ozs7NEJBQ2QsV0FBTSxJQUFJLE9BQU8sQ0FBYyxVQUFDLE9BQU8sRUFBRSxNQUFNOzRCQUMxRCxFQUFFLENBQUMsT0FBTyxDQUFDO2dDQUNQLEdBQUcsRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsR0FBRyxtQkFBbUI7Z0NBQ2xELE1BQU0sRUFBRSxLQUFLO2dDQUNiLElBQUksRUFBRTtvQ0FDRixRQUFRLEVBQUUsUUFBUTtpQ0FDckI7Z0NBQ0QsT0FBTyxFQUFFLFVBQUMsRUFBUTt3Q0FBTixjQUFJO29DQUNaLE9BQU8sQ0FBYyxJQUFJLENBQUMsQ0FBQTtnQ0FDOUIsQ0FBQztnQ0FDRCxJQUFJLEVBQUUsTUFBTTs2QkFDZixDQUFDLENBQUE7d0JBQ04sQ0FBQyxDQUFDLEVBQUE7O3dCQVpFLFFBQVEsR0FBRyxTQVliO3dCQUNGLElBQUksUUFBUSxDQUFDLE9BQU8sRUFBRTs0QkFDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQ0FDVCxZQUFZLEVBQUUsUUFBUSxDQUFDLE1BQU07NkJBQ2hDLENBQUMsQ0FBQTt5QkFDTDs2QkFBTTt5QkFFTjs7Ozs7S0FDSjtDQUNKLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElNeUFwcCB9IGZyb20gJy4uLy4uL2FwcCdcclxuaW1wb3J0IHsgcmVzb3VyY2VSZXMsIHJlc291cmNlSXRlbSB9IGZyb20gJy4uLy4uL3V0aWxzL2NvdXJzZS9yZXNvdXJjZVJlcydcclxuY29uc3QgYXBwID0gZ2V0QXBwPElNeUFwcD4oKVxyXG5QYWdlKHtcclxuICAgIGRhdGE6IHtcclxuICAgICAgICBsb2FkTW9kYWw6IGZhbHNlLFxyXG4gICAgICAgIHJlc291cmNlTGlzdDogPHJlc291cmNlSXRlbVtdPltdXHJcbiAgICB9LFxyXG4gICAgdXB0YXAoXzogd3guVGFwRXZlbnQpIHtcclxuICAgICAgICA7KGFzeW5jIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgcmVzID0gYXdhaXQgbmV3IFByb21pc2U8d3guVGVtcEZpbGVzRGF0YT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgd3guY2hvb3NlSW1hZ2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHJlc29sdmUsXHJcbiAgICAgICAgICAgICAgICAgICAgZmFpbDogcmVqZWN0XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+ato+WcqOS4iuS8oC4uLicsXHJcbiAgICAgICAgICAgICAgICBtYXNrOiB0cnVlXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgIHd4LnVwbG9hZEZpbGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogYXBwLmdsb2JhbERhdGEuaG9zdE5hbWUgKyAnL2NvdXJzZS9yZXNvdXJjZScsXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsZVBhdGg6IHJlcy50ZW1wRmlsZVBhdGhzWzBdLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdmaWxlJyxcclxuICAgICAgICAgICAgICAgICAgICBmb3JtRGF0YToge30sXHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKClcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGZhaWw6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KCfkuIrkvKDlpLHotKUnKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcclxuICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAn5LiK5Lyg5oiQ5YqfJyxcclxuICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pKClcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge30pXHJcbiAgICAgICAgICAgIC5jYXRjaCgocmVhc29uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiByZWFzb24sXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogJ25vbmUnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIGRvd250YXAoZXZlbnQ6IHd4LlRhcEV2ZW50KSB7XHJcbiAgICAgICAgbGV0IHVybDogc3RyaW5nID0gZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0LnVybFxyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIGxvYWRNb2RhbDogdHJ1ZVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgd3guZG93bmxvYWRGaWxlKHtcclxuICAgICAgICAgICAgdXJsOiB1cmwsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIOWPquimgeacjeWKoeWZqOacieWTjeW6lOaVsOaNru+8jOWwseS8muaKiuWTjeW6lOWGheWuueWGmeWFpeaWh+S7tuW5tui/m+WFpSBzdWNjZXNzIOWbnuiwg++8jOS4muWKoemcgOimgeiHquihjOWIpOaWreaYr+WQpuS4i+i9veWIsOS6huaDs+imgeeahOWGheWuuVxyXG4gICAgICAgICAgICAgICAgbGV0IGZpbGVQYXRoID0gcmVzLnRlbXBGaWxlUGF0aFxyXG4gICAgICAgICAgICAgICAgLy8gVE9ETzog5paH5Lu25a2Y5YKoXHJcbiAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5LiL6L295a6M5oiQJyxcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiAnc3VjY2VzcydcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZhaWw6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfkuIvovb3lpLHotKUnLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY29tcGxldGU6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9hZE1vZGFsOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMuaW5pdFNvdXJjZSh3eC5nZXRTdG9yYWdlU3luYygnQ291cnNlRGV0YWlsJykuZGF0YS5jb3Vyc2VJRClcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge30pXHJcbiAgICAgICAgICAgIC5jYXRjaCgocmVhc29uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZWFzb24pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgYXN5bmMgaW5pdFNvdXJjZShjb3Vyc2VJRDogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHJlc291cmNlID0gYXdhaXQgbmV3IFByb21pc2U8cmVzb3VyY2VSZXM+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgd3gucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IGFwcC5nbG9iYWxEYXRhLmhvc3ROYW1lICsgJy9jb3Vyc2UvcmVzb3VyY2VzJyxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY291cnNlSUQ6IGNvdXJzZUlEXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHsgZGF0YSB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSg8cmVzb3VyY2VSZXM+ZGF0YSlcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsOiByZWplY3RcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIGlmIChyZXNvdXJjZS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICByZXNvdXJjZUxpc3Q6IHJlc291cmNlLnJlc3VsdFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IOmUmeivr+WkhOeQhlxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSlcclxuIl19