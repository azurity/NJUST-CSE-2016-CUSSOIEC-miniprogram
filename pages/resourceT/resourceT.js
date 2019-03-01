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
        resourceList: [{ name: '1.函数及其特性.zip', url: '', isDownLoad: false },
            { name: '2.极限的概念、性质和运算法则.zip', url: '', isDownLoad: false },
            { name: '3.两个重要极限.zip', url: '', isDownLoad: true }]
    },
    uptap: function (event) {
        wx.chooseImage({
            success: function (res) {
                console.log('choose');
                wx.showToast({
                    title: '正在上传...',
                    icon: 'loading',
                    mask: true,
                    duration: 2000,
                    success: function (ress) {
                    }
                });
                var tempFilePaths = res.tempFilePaths;
                wx.uploadFile({
                    url: '',
                    filePath: tempFilePaths[0],
                    name: 'file',
                    formData: {
                        user: app.globalData.personID
                    },
                    success: function (res) {
                        wx.showToast({
                            title: '成功',
                            icon: 'success',
                            duration: 1000,
                            mask: true
                        });
                    },
                    fail: function (res) {
                        wx.showToast({
                            title: '上传失败',
                            icon: 'none',
                            duration: 1000,
                            mask: true
                        });
                    }
                });
            }
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2VULmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVzb3VyY2VULnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNLEdBQUcsR0FBRyxNQUFNLEVBQVUsQ0FBQTtBQUM1QixJQUFJLENBQUM7SUFDRCxJQUFJLEVBQUM7UUFDRCxTQUFTLEVBQUMsS0FBSztRQUNmLFlBQVksRUFBQyxDQUFDLEVBQUMsSUFBSSxFQUFDLGNBQWMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUM7WUFDM0QsRUFBQyxJQUFJLEVBQUMscUJBQXFCLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDO1lBQ3BELEVBQUMsSUFBSSxFQUFDLGNBQWMsRUFBQyxHQUFHLEVBQUUsRUFBRSxFQUFDLFVBQVUsRUFBQyxJQUFJLEVBQUMsQ0FBQztLQUVqRDtJQUNELEtBQUssWUFBQyxLQUFTO1FBQ2IsRUFBRSxDQUFDLFdBQVcsQ0FBQztZQUNiLE9BQU8sWUFBQyxHQUFHO2dCQUNULE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7Z0JBQ3JCLEVBQUUsQ0FBQyxTQUFTLENBQUM7b0JBQ1gsS0FBSyxFQUFDLFNBQVM7b0JBQ2YsSUFBSSxFQUFDLFNBQVM7b0JBQ2QsSUFBSSxFQUFDLElBQUk7b0JBQ1QsUUFBUSxFQUFDLElBQUk7b0JBQ2IsT0FBTyxFQUFDLFVBQVMsSUFBSTtvQkFHckIsQ0FBQztpQkFDRixDQUFDLENBQUE7Z0JBQ0YsSUFBTSxhQUFhLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQTtnQkFDdkMsRUFBRSxDQUFDLFVBQVUsQ0FBQztvQkFDWixHQUFHLEVBQUUsRUFBRTtvQkFDUCxRQUFRLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQztvQkFDMUIsSUFBSSxFQUFFLE1BQU07b0JBQ1osUUFBUSxFQUFFO3dCQUNSLElBQUksRUFBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVE7cUJBQzdCO29CQUNELE9BQU8sWUFBQyxHQUFHO3dCQUNULEVBQUUsQ0FBQyxTQUFTLENBQUM7NEJBQ1gsS0FBSyxFQUFFLElBQUk7NEJBQ1gsSUFBSSxFQUFFLFNBQVM7NEJBQ2YsUUFBUSxFQUFFLElBQUk7NEJBQ2QsSUFBSSxFQUFDLElBQUk7eUJBQ1IsQ0FBQyxDQUFBO29CQUNOLENBQUM7b0JBQ0QsSUFBSSxZQUFDLEdBQUc7d0JBQ04sRUFBRSxDQUFDLFNBQVMsQ0FBQzs0QkFDWCxLQUFLLEVBQUUsTUFBTTs0QkFDYixJQUFJLEVBQUUsTUFBTTs0QkFDWixRQUFRLEVBQUUsSUFBSTs0QkFDZCxJQUFJLEVBQUMsSUFBSTt5QkFDUixDQUFDLENBQUE7b0JBRU4sQ0FBQztpQkFDRixDQUFDLENBQUE7WUFDSixDQUFDO1NBQ0YsQ0FBQyxDQUFBO0lBR0osQ0FBQztJQUNELE9BQU8sWUFBQyxLQUFTO1FBQWpCLGlCQTRCQztRQTNCRyxJQUFJLElBQUksR0FBVyxLQUFLLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUE7UUFDbkQsSUFBSSxHQUFHLEdBQVcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFBO1FBQ2pELElBQUksS0FBSyxHQUFRLEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQTtRQUNsRCxJQUFJLFFBQVEsR0FBUSxlQUFlLEdBQUMsS0FBSyxHQUFDLGNBQWMsQ0FBQTtRQUN4RCxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1QsU0FBUyxFQUFDLElBQUk7U0FDakIsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxJQUFJLEdBQUMsSUFBSSxDQUFBO1FBQ2IsRUFBRSxDQUFDLFlBQVksQ0FBQztZQUNaLEdBQUcsRUFBRSxHQUFHO1lBQ1IsT0FBTyxZQUFDLEdBQUc7O2dCQUVULElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxPQUFPO3dCQUNSLFNBQVMsRUFBQyxLQUFLOztvQkFDZixHQUFDLFFBQVEsSUFBRSxJQUFJO3dCQUNqQixDQUFDO1lBRUwsQ0FBQztTQUNGLENBQUMsQ0FBQTtRQUNGLFVBQVUsQ0FBQztZQUNULEtBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1gsU0FBUyxFQUFFLEtBQUs7YUFDakIsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFBO0lBR2QsQ0FBQztJQUNELE1BQU07SUFFTixDQUFDO0lBQ0ssVUFBVSxZQUFDLFFBQWU7Ozs7OzRCQUNqQixXQUFNLElBQUksT0FBTyxDQUFjLFVBQUMsT0FBTyxFQUFDLE1BQU07NEJBQ3ZELEVBQUUsQ0FBQyxPQUFPLENBQUM7Z0NBQ1QsR0FBRyxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxHQUFHLG1CQUFtQjtnQ0FDbEQsTUFBTSxFQUFFLEtBQUs7Z0NBQ2IsSUFBSSxFQUFFO29DQUNGLFFBQVEsRUFBRSxRQUFRO2lDQUNyQjtnQ0FDRCxPQUFPLEVBQUUsVUFBQyxFQUFRO3dDQUFOLGNBQUk7b0NBQ1osT0FBTyxDQUFjLElBQUksQ0FBQyxDQUFBO2dDQUM5QixDQUFDO2dDQUNELElBQUksRUFBRSxNQUFNOzZCQUNiLENBQUMsQ0FBQTt3QkFDTixDQUFDLENBQUMsRUFBQTs7d0JBWkUsUUFBUSxHQUFDLFNBWVg7d0JBQ0YsSUFBSSxRQUFRLENBQUMsT0FBTyxFQUFFOzRCQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDO2dDQUNYLFlBQVksRUFBRSxRQUFRLENBQUMsTUFBTTs2QkFDOUIsQ0FBQyxDQUFBO3lCQUNMOzZCQUFNO3lCQUVOOzs7OztLQUNKO0NBR0osQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSU15QXBwIH0gZnJvbSAnLi4vLi4vYXBwJ1xyXG5pbXBvcnR7cmVzb3VyY2VSZXMscmVzb3VyY2VJdGVtfSBmcm9tICcuLi8uLi91dGlscy9jb3Vyc2UvcmVzb3VyY2VSZXMnXHJcbmNvbnN0IGFwcCA9IGdldEFwcDxJTXlBcHA+KClcclxuUGFnZSh7XHJcbiAgICBkYXRhOntcclxuICAgICAgICBsb2FkTW9kYWw6ZmFsc2UsXHJcbiAgICAgICAgcmVzb3VyY2VMaXN0Olt7bmFtZTonMS7lh73mlbDlj4rlhbbnibnmgKcuemlwJyx1cmw6JycsaXNEb3duTG9hZDpmYWxzZX0sXHJcbiAgICAgICAge25hbWU6JzIu5p6B6ZmQ55qE5qaC5b+144CB5oCn6LSo5ZKM6L+Q566X5rOV5YiZLnppcCcsdXJsOicnLGlzRG93bkxvYWQ6ZmFsc2V9LFxyXG4gICAgICAgIHtuYW1lOiczLuS4pOS4qumHjeimgeaegemZkC56aXAnLHVybDogJycsaXNEb3duTG9hZDp0cnVlfV1cclxuICAgICAgICAvL3Jlc291cmNlTGlzdDo8cmVzb3VyY2VJdGVtW10+W11cclxuICAgIH0sXHJcbiAgICB1cHRhcChldmVudDphbnkpe1xyXG4gICAgICB3eC5jaG9vc2VJbWFnZSh7XHJcbiAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdjaG9vc2UnKVxyXG4gICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgdGl0bGU6J+ato+WcqOS4iuS8oC4uLicsXHJcbiAgICAgICAgICAgIGljb246J2xvYWRpbmcnLFxyXG4gICAgICAgICAgICBtYXNrOnRydWUsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOjIwMDAsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6ZnVuY3Rpb24ocmVzcyl7XHJcblxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIGNvbnN0IHRlbXBGaWxlUGF0aHMgPSByZXMudGVtcEZpbGVQYXRoc1xyXG4gICAgICAgICAgd3gudXBsb2FkRmlsZSh7XHJcbiAgICAgICAgICAgIHVybDogJycsIC8vIOmcgOimgeaWh+S7tuS4iuS8oOaOpeWPo1xyXG4gICAgICAgICAgICBmaWxlUGF0aDogdGVtcEZpbGVQYXRoc1swXSxcclxuICAgICAgICAgICAgbmFtZTogJ2ZpbGUnLFxyXG4gICAgICAgICAgICBmb3JtRGF0YToge1xyXG4gICAgICAgICAgICAgIHVzZXI6YXBwLmdsb2JhbERhdGEucGVyc29uSURcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfmiJDlip8nLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDAsXHJcbiAgICAgICAgICAgICAgICBtYXNrOnRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZhaWwocmVzKXtcclxuICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfkuIrkvKDlpLHotKUnLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDAsXHJcbiAgICAgICAgICAgICAgICBtYXNrOnRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuXHJcblxyXG4gICAgfSxcclxuICAgIGRvd250YXAoZXZlbnQ6YW55KXtcclxuICAgICAgICBsZXQgbmFtZTogc3RyaW5nID0gZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0Lm5hbWVcclxuICAgICAgICBsZXQgdXJsOiBzdHJpbmcgPSBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudXJsXHJcbiAgICAgICAgbGV0IGluZGV4Om51bWJlcj1ldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaW5kZXhcclxuICAgICAgICBsZXQgZG93bmxvYWQ6c3RyaW5nPVwicmVzb3VyY2VMaXN0W1wiK2luZGV4K1wiXS5pc0Rvd25Mb2FkXCJcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBsb2FkTW9kYWw6dHJ1ZVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgbGV0IHRoYXQ9dGhpc1xyXG4gICAgICAgIHd4LmRvd25sb2FkRmlsZSh7XHJcbiAgICAgICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgIC8vIOWPquimgeacjeWKoeWZqOacieWTjeW6lOaVsOaNru+8jOWwseS8muaKiuWTjeW6lOWGheWuueWGmeWFpeaWh+S7tuW5tui/m+WFpSBzdWNjZXNzIOWbnuiwg++8jOS4muWKoemcgOimgeiHquihjOWIpOaWreaYr+WQpuS4i+i9veWIsOS6huaDs+imgeeahOWGheWuuVxyXG4gICAgICAgICAgICAgIHZhciBmaWxlUGF0aCA9IHJlcy50ZW1wRmlsZVBhdGg7XHJcbiAgICAgICAgICAgICAgdGhhdC5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgICAgbG9hZE1vZGFsOmZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICBbZG93bmxvYWRdOnRydWVcclxuICAgICAgICAgICAgICB9KTsgICAgXHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgIGxvYWRNb2RhbDogZmFsc2VcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH0sIDIwMDApXHJcbiAgICAgICAgXHJcblxyXG4gICAgfSxcclxuICAgIG9uTG9hZCgpe1xyXG5cclxuICAgIH0sXHJcbiAgICBhc3luYyBpbml0U291cmNlKGNvdXJzZUlEOnN0cmluZyl7XHJcbiAgICAgIGxldCByZXNvdXJjZT1hd2FpdCBuZXcgUHJvbWlzZTxyZXNvdXJjZVJlcz4oKHJlc29sdmUscmVqZWN0KT0+e1xyXG4gICAgICAgICAgd3gucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDogYXBwLmdsb2JhbERhdGEuaG9zdE5hbWUgKyAnL2NvdXJzZS9yZXNvdXJjZXMnLFxyXG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBjb3Vyc2VJRDogY291cnNlSURcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VjY2VzczogKHsgZGF0YSB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKDxyZXNvdXJjZVJlcz5kYXRhKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmYWlsOiByZWplY3RcclxuICAgICAgICAgIH0pXHJcbiAgICAgIH0pXHJcbiAgICAgIGlmIChyZXNvdXJjZS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgcmVzb3VyY2VMaXN0OiByZXNvdXJjZS5yZXN1bHRcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBUT0RPOiDplJnor6/lpITnkIZcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxufSlcclxuIl19