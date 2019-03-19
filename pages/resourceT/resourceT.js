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
        this.initSource(wx.getStorageSync('CourseDetail').courseID)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2VULmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVzb3VyY2VULnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNLEdBQUcsR0FBRyxNQUFNLEVBQVUsQ0FBQTtBQUM1QixJQUFJLENBQUM7SUFDRCxJQUFJLEVBQUU7UUFDRixTQUFTLEVBQUUsS0FBSztRQUNoQixZQUFZLEVBQWtCLEVBQUU7S0FDbkM7SUFDRCxLQUFLLFlBQUMsQ0FBYztRQUNoQixDQUFDO1FBQUEsQ0FBQzs7Ozs7Z0NBQ1ksV0FBTSxJQUFJLE9BQU8sQ0FBbUIsVUFBQyxPQUFPLEVBQUUsTUFBTTtnQ0FDMUQsRUFBRSxDQUFDLFdBQVcsQ0FBQztvQ0FDWCxPQUFPLEVBQUUsT0FBTztvQ0FDaEIsSUFBSSxFQUFFLE1BQU07aUNBQ2YsQ0FBQyxDQUFBOzRCQUNOLENBQUMsQ0FBQyxFQUFBOzs0QkFMRSxHQUFHLEdBQUcsU0FLUjs0QkFDRixFQUFFLENBQUMsV0FBVyxDQUFDO2dDQUNYLEtBQUssRUFBRSxTQUFTO2dDQUNoQixJQUFJLEVBQUUsSUFBSTs2QkFDYixDQUFDLENBQUE7NEJBQ0YsV0FBTSxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO29DQUM5QixFQUFFLENBQUMsVUFBVSxDQUFDO3dDQUNWLEdBQUcsRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsR0FBRyxrQkFBa0I7d0NBQ2pELFFBQVEsRUFBRSxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQzt3Q0FDOUIsSUFBSSxFQUFFLE1BQU07d0NBQ1osUUFBUSxFQUFFLEVBQUU7d0NBQ1osT0FBTyxFQUFFOzRDQUNMLE9BQU8sRUFBRSxDQUFBO3dDQUNiLENBQUM7d0NBQ0QsSUFBSSxFQUFFOzRDQUNGLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQTt3Q0FDbEIsQ0FBQztxQ0FDSixDQUFDLENBQUE7Z0NBQ04sQ0FBQyxDQUFDLEVBQUE7OzRCQWJGLFNBYUUsQ0FBQTs0QkFDRixFQUFFLENBQUMsV0FBVyxFQUFFLENBQUE7NEJBQ2hCLEVBQUUsQ0FBQyxTQUFTLENBQUM7Z0NBQ1QsS0FBSyxFQUFFLE1BQU07Z0NBQ2IsSUFBSSxFQUFFLFNBQVM7NkJBQ2xCLENBQUMsQ0FBQTs7Ozs7U0FDTCxDQUFDLEVBQUU7YUFDQyxJQUFJLENBQUMsY0FBTyxDQUFDLENBQUM7YUFDZCxLQUFLLENBQUMsVUFBQyxNQUFNO1lBQ1YsRUFBRSxDQUFDLFNBQVMsQ0FBQztnQkFDVCxLQUFLLEVBQUUsTUFBTTtnQkFDYixJQUFJLEVBQUUsTUFBTTthQUNmLENBQUMsQ0FBQTtRQUNOLENBQUMsQ0FBQyxDQUFBO0lBQ1YsQ0FBQztJQUNELE9BQU8sWUFBQyxLQUFrQjtRQUExQixpQkE0QkM7UUEzQkcsSUFBSSxHQUFHLEdBQVcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFBO1FBQ2pELElBQUksQ0FBQyxPQUFPLENBQUM7WUFDVCxTQUFTLEVBQUUsSUFBSTtTQUNsQixDQUFDLENBQUE7UUFDRixFQUFFLENBQUMsWUFBWSxDQUFDO1lBQ1osR0FBRyxFQUFFLEdBQUc7WUFDUixPQUFPLEVBQUUsVUFBQyxHQUFHO2dCQUVULElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUE7Z0JBRS9CLEVBQUUsQ0FBQyxTQUFTLENBQUM7b0JBQ1QsS0FBSyxFQUFFLE1BQU07b0JBQ2IsSUFBSSxFQUFFLFNBQVM7aUJBQ2xCLENBQUMsQ0FBQTtZQUNOLENBQUM7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsRUFBRSxDQUFDLFNBQVMsQ0FBQztvQkFDVCxLQUFLLEVBQUUsTUFBTTtvQkFDYixJQUFJLEVBQUUsTUFBTTtpQkFDZixDQUFDLENBQUE7WUFDTixDQUFDO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLEtBQUksQ0FBQyxPQUFPLENBQUM7b0JBQ1QsU0FBUyxFQUFFLEtBQUs7aUJBQ25CLENBQUMsQ0FBQTtZQUNOLENBQUM7U0FDSixDQUFDLENBQUE7SUFDTixDQUFDO0lBQ0QsTUFBTTtRQUNGLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxRQUFRLENBQUM7YUFDdEQsSUFBSSxDQUFDLGNBQU8sQ0FBQyxDQUFDO2FBQ2QsS0FBSyxDQUFDLFVBQUMsTUFBTTtZQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDdkIsQ0FBQyxDQUFDLENBQUE7SUFDVixDQUFDO0lBQ0ssVUFBVSxZQUFDLFFBQWdCOzs7Ozs0QkFDZCxXQUFNLElBQUksT0FBTyxDQUFjLFVBQUMsT0FBTyxFQUFFLE1BQU07NEJBQzFELEVBQUUsQ0FBQyxPQUFPLENBQUM7Z0NBQ1AsR0FBRyxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxHQUFHLG1CQUFtQjtnQ0FDbEQsTUFBTSxFQUFFLEtBQUs7Z0NBQ2IsSUFBSSxFQUFFO29DQUNGLFFBQVEsRUFBRSxRQUFRO2lDQUNyQjtnQ0FDRCxPQUFPLEVBQUUsVUFBQyxFQUFRO3dDQUFOLGNBQUk7b0NBQ1osT0FBTyxDQUFjLElBQUksQ0FBQyxDQUFBO2dDQUM5QixDQUFDO2dDQUNELElBQUksRUFBRSxNQUFNOzZCQUNmLENBQUMsQ0FBQTt3QkFDTixDQUFDLENBQUMsRUFBQTs7d0JBWkUsUUFBUSxHQUFHLFNBWWI7d0JBQ0YsSUFBSSxRQUFRLENBQUMsT0FBTyxFQUFFOzRCQUNsQixJQUFJLENBQUMsT0FBTyxDQUFDO2dDQUNULFlBQVksRUFBRSxRQUFRLENBQUMsTUFBTTs2QkFDaEMsQ0FBQyxDQUFBO3lCQUNMOzZCQUFNO3lCQUVOOzs7OztLQUNKO0NBQ0osQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSU15QXBwIH0gZnJvbSAnLi4vLi4vYXBwJ1xyXG5pbXBvcnQgeyByZXNvdXJjZVJlcywgcmVzb3VyY2VJdGVtIH0gZnJvbSAnLi4vLi4vdXRpbHMvY291cnNlL3Jlc291cmNlUmVzJ1xyXG5jb25zdCBhcHAgPSBnZXRBcHA8SU15QXBwPigpXHJcblBhZ2Uoe1xyXG4gICAgZGF0YToge1xyXG4gICAgICAgIGxvYWRNb2RhbDogZmFsc2UsXHJcbiAgICAgICAgcmVzb3VyY2VMaXN0OiA8cmVzb3VyY2VJdGVtW10+W11cclxuICAgIH0sXHJcbiAgICB1cHRhcChfOiB3eC5UYXBFdmVudCkge1xyXG4gICAgICAgIDsoYXN5bmMgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCByZXMgPSBhd2FpdCBuZXcgUHJvbWlzZTx3eC5UZW1wRmlsZXNEYXRhPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB3eC5jaG9vc2VJbWFnZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogcmVzb2x2ZSxcclxuICAgICAgICAgICAgICAgICAgICBmYWlsOiByZWplY3RcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAn5q2j5Zyo5LiK5LygLi4uJyxcclxuICAgICAgICAgICAgICAgIG1hc2s6IHRydWVcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgd3gudXBsb2FkRmlsZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBhcHAuZ2xvYmFsRGF0YS5ob3N0TmFtZSArICcvY291cnNlL3Jlc291cmNlJyxcclxuICAgICAgICAgICAgICAgICAgICBmaWxlUGF0aDogcmVzLnRlbXBGaWxlUGF0aHNbMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2ZpbGUnLFxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1EYXRhOiB7fSxcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZmFpbDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoJ+S4iuS8oOWksei0pScpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfkuIrkvKDmiJDlip8nLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSkoKVxyXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7fSlcclxuICAgICAgICAgICAgLmNhdGNoKChyZWFzb24pID0+IHtcclxuICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHJlYXNvbixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgZG93bnRhcChldmVudDogd3guVGFwRXZlbnQpIHtcclxuICAgICAgICBsZXQgdXJsOiBzdHJpbmcgPSBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudXJsXHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgbG9hZE1vZGFsOiB0cnVlXHJcbiAgICAgICAgfSlcclxuICAgICAgICB3eC5kb3dubG9hZEZpbGUoe1xyXG4gICAgICAgICAgICB1cmw6IHVybCxcclxuICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8g5Y+q6KaB5pyN5Yqh5Zmo5pyJ5ZON5bqU5pWw5o2u77yM5bCx5Lya5oqK5ZON5bqU5YaF5a655YaZ5YWl5paH5Lu25bm26L+b5YWlIHN1Y2Nlc3Mg5Zue6LCD77yM5Lia5Yqh6ZyA6KaB6Ieq6KGM5Yik5pat5piv5ZCm5LiL6L295Yiw5LqG5oOz6KaB55qE5YaF5a65XHJcbiAgICAgICAgICAgICAgICBsZXQgZmlsZVBhdGggPSByZXMudGVtcEZpbGVQYXRoXHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiDmlofku7blrZjlgqhcclxuICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfkuIvovb3lrozmiJAnLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJ1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFpbDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+S4i+i9veWksei0pScsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogJ25vbmUnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjb21wbGV0ZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgICAgICBsb2FkTW9kYWw6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5pbml0U291cmNlKHd4LmdldFN0b3JhZ2VTeW5jKCdDb3Vyc2VEZXRhaWwnKS5jb3Vyc2VJRClcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge30pXHJcbiAgICAgICAgICAgIC5jYXRjaCgocmVhc29uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZWFzb24pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgYXN5bmMgaW5pdFNvdXJjZShjb3Vyc2VJRDogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHJlc291cmNlID0gYXdhaXQgbmV3IFByb21pc2U8cmVzb3VyY2VSZXM+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgd3gucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IGFwcC5nbG9iYWxEYXRhLmhvc3ROYW1lICsgJy9jb3Vyc2UvcmVzb3VyY2VzJyxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY291cnNlSUQ6IGNvdXJzZUlEXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHsgZGF0YSB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSg8cmVzb3VyY2VSZXM+ZGF0YSlcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsOiByZWplY3RcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIGlmIChyZXNvdXJjZS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICByZXNvdXJjZUxpc3Q6IHJlc291cmNlLnJlc3VsdFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IOmUmeivr+WkhOeQhlxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSlcclxuIl19