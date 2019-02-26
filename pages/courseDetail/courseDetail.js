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
        iconList: [
            {
                icon: 'emojifill',
                color: 'red',
                badge: 120,
                name: '考勤'
            },
            {
                icon: 'writefill',
                color: 'mauve',
                badge: 1,
                name: '试题作业'
            },
            {
                icon: 'selectionfill',
                color: 'cyan',
                badge: 0,
                name: '评教'
            },
            {
                icon: 'circlefill',
                color: 'olive',
                badge: 22,
                name: '配套资源'
            }
        ],
        info: {},
        checkIn: {},
        isLive: false,
        liveUrl: '',
        videoList: []
    },
    tapCourse: function (event) {
        var id = event.currentTarget.dataset.id;
        var name = event.currentTarget.dataset.name;
        var url = event.currentTarget.dataset.url;
        wx.setStorageSync('id', id);
        wx.setStorageSync('name', name);
        wx.setStorageSync('url', url);
        wx.navigateTo({ url: '/pages/video/video' });
    },
    tapIcon: function (e) {
        switch (e.currentTarget.id) {
            case '考勤':
                if (this.data.checkIn.hasChecked) {
                    console.log('已经签到');
                }
                else if (this.data.checkIn.isOpen) {
                    this.checkIn()
                        .then(function () {
                        wx.showToast({
                            title: '成功签到'
                        });
                    })
                        .catch(function (reason) {
                        console.log(reason);
                    });
                }
                else {
                }
                break;
            case '试题作业':
                break;
            case '评教':
                break;
            case '配套资源':
                break;
        }
    },
    onLoad: function () {
        var detail = null;
        try {
            detail = wx.getStorageSync('CourseDetail');
        }
        catch (e) {
        }
        this.setData({
            info: detail
        });
        Promise.all([
            this.initCheckIn(detail.courseID),
            this.initLive(detail.courseID),
            this.initVideos(detail.courseID)
        ])
            .then(function () {
        })
            .catch(function () {
        });
    },
    initCheckIn: function (courseID) {
        return __awaiter(this, void 0, void 0, function () {
            var checkIn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, new Promise(function (resolve, reject) {
                            wx.request({
                                url: app.globalData.hostName + '/course/check_in',
                                method: 'GET',
                                data: {
                                    college: app.globalData.college,
                                    personID: app.globalData.personID,
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
                        checkIn = _a.sent();
                        if (checkIn.success) {
                            this.setData({
                                checkIn: checkIn.result
                            });
                        }
                        else {
                        }
                        return [2];
                }
            });
        });
    },
    initLive: function (courseID) {
        return __awaiter(this, void 0, void 0, function () {
            var live;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, new Promise(function (resolve, reject) {
                            wx.request({
                                url: app.globalData.hostName + '/course/live_info',
                                method: 'GET',
                                data: { courseID: courseID },
                                success: function (_a) {
                                    var data = _a.data;
                                    resolve(data);
                                },
                                fail: reject
                            });
                        })];
                    case 1:
                        live = _a.sent();
                        if (live.success) {
                            this.setData({
                                isLive: live.result.isLive,
                                liveUrl: live.result.url
                            });
                        }
                        else {
                        }
                        return [2];
                }
            });
        });
    },
    initVideos: function (courseID) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, new Promise(function (resolve, reject) {
                            wx.request({
                                url: app.globalData.hostName + '/course/videos',
                                method: 'GET',
                                data: { openid: app.globalData.openid, courseID: courseID },
                                success: function (_a) {
                                    var data = _a.data;
                                    resolve(data);
                                },
                                fail: reject
                            });
                        })];
                    case 1:
                        result = _a.sent();
                        if (result.success) {
                            this.setData({
                                videoList: result.result
                            });
                        }
                        else {
                        }
                        return [2];
                }
            });
        });
    },
    checkIn: function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, new Promise(function (resolve, reject) {
                            wx.request({
                                url: app.globalData.hostName + '/course/check_in',
                                method: 'POST',
                                data: {
                                    college: app.globalData.college,
                                    personID: app.globalData.personID,
                                    courseID: _this.data.info.courseID,
                                    time: _this.data.checkIn.time
                                },
                                success: function (_a) {
                                    var data = _a.data;
                                    resolve(data);
                                },
                                fail: reject
                            });
                        })];
                    case 1:
                        result = _a.sent();
                        if (result.success) {
                        }
                        else {
                        }
                        return [2];
                }
            });
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291cnNlRGV0YWlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY291cnNlRGV0YWlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNQSxJQUFNLEdBQUcsR0FBRyxNQUFNLEVBQVUsQ0FBQTtBQUU1QixJQUFJLENBQUM7SUFDRCxJQUFJLEVBQUU7UUFDRixRQUFRLEVBQUU7WUFDTjtnQkFDSSxJQUFJLEVBQUUsV0FBVztnQkFDakIsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsSUFBSSxFQUFFLElBQUk7YUFDYjtZQUNEO2dCQUNJLElBQUksRUFBRSxXQUFXO2dCQUNqQixLQUFLLEVBQUUsT0FBTztnQkFDZCxLQUFLLEVBQUUsQ0FBQztnQkFDUixJQUFJLEVBQUUsTUFBTTthQUNmO1lBQ0Q7Z0JBQ0ksSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLEtBQUssRUFBRSxNQUFNO2dCQUNiLEtBQUssRUFBRSxDQUFDO2dCQUNSLElBQUksRUFBRSxJQUFJO2FBQ2I7WUFDRDtnQkFDSSxJQUFJLEVBQUUsWUFBWTtnQkFDbEIsS0FBSyxFQUFFLE9BQU87Z0JBQ2QsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsSUFBSSxFQUFFLE1BQU07YUFDZjtTQUNKO1FBQ0QsSUFBSSxFQUFFLEVBQUU7UUFDUixPQUFPLEVBQWEsRUFBRTtRQUN0QixNQUFNLEVBQUUsS0FBSztRQUNiLE9BQU8sRUFBRSxFQUFFO1FBQ1gsU0FBUyxFQUFlLEVBQUU7S0FDN0I7SUFFRCxTQUFTLFlBQUMsS0FBVTtRQUNoQixJQUFJLEVBQUUsR0FBVyxLQUFLLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUE7UUFDL0MsSUFBSSxJQUFJLEdBQVcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFBO1FBQ25ELElBQUksR0FBRyxHQUFXLEtBQUssQ0FBQyxhQUFhLENBQUMs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IH0gZnJvbSAnLi4vLi4vYXBwJ1xyXG5pbXBvcnQgeyBsaXZlUmVzIH0gZnJvbSAnLi4vLi4vdXRpbHMvY291cnNlL2xpdmVSZXMnXHJcbmltcG9ydCB7IERheVZpZGVvcywgdmlkZW9zUmVzIH0gZnJvbSAnLi4vLi4vdXRpbHMvY291cnNlL3ZpZGVvUmVzJ1xyXG5pbXBvcnQgeyBDaGVja0luZm8sIGNoZWNrSW5SZXMsIGNoZWNrSW5Qb3N0UmVzIH0gZnJvbSAnLi4vLi4vdXRpbHMvY291cnNlL2NoZWNrSW4vY2hlY2tJblJlcydcclxuaW1wb3J0IHsgQ291cnNlRGV0YWlsSW5mbyB9IGZyb20gJy4uLy4uL3V0aWxzL2NvdXJzZS9Db3Vyc2VJbmZvJ1xyXG5cclxuY29uc3QgYXBwID0gZ2V0QXBwPElNeUFwcD4oKVxyXG5cclxuUGFnZSh7XHJcbiAgICBkYXRhOiB7XHJcbiAgICAgICAgaWNvbkxpc3Q6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWNvbjogJ2Vtb2ppZmlsbCcsXHJcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3JlZCcsXHJcbiAgICAgICAgICAgICAgICBiYWRnZTogMTIwLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ+iAg+WLpCdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWNvbjogJ3dyaXRlZmlsbCcsXHJcbiAgICAgICAgICAgICAgICBjb2xvcjogJ21hdXZlJyxcclxuICAgICAgICAgICAgICAgIGJhZGdlOiAxLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ+ivlemimOS9nOS4midcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWNvbjogJ3NlbGVjdGlvbmZpbGwnLFxyXG4gICAgICAgICAgICAgICAgY29sb3I6ICdjeWFuJyxcclxuICAgICAgICAgICAgICAgIGJhZGdlOiAwLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ+ivhOaVmSdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWNvbjogJ2NpcmNsZWZpbGwnLFxyXG4gICAgICAgICAgICAgICAgY29sb3I6ICdvbGl2ZScsXHJcbiAgICAgICAgICAgICAgICBiYWRnZTogMjIsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiAn6YWN5aWX6LWE5rqQJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXSxcclxuICAgICAgICBpbmZvOiB7fSxcclxuICAgICAgICBjaGVja0luOiA8Q2hlY2tJbmZvPnt9LFxyXG4gICAgICAgIGlzTGl2ZTogZmFsc2UsIC8v5piv5ZCm5q2j5Zyo55u05pKtXHJcbiAgICAgICAgbGl2ZVVybDogJycsXHJcbiAgICAgICAgdmlkZW9MaXN0OiA8RGF5VmlkZW9zW10+W11cclxuICAgIH0sXHJcblxyXG4gICAgdGFwQ291cnNlKGV2ZW50OiBhbnkpIHtcclxuICAgICAgICBsZXQgaWQ6IHN0cmluZyA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZFxyXG4gICAgICAgIGxldCBuYW1lOiBzdHJpbmcgPSBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQubmFtZVxyXG4gICAgICAgIGxldCB1cmw6IHN0cmluZyA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC51cmxcclxuICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygnaWQnLCBpZClcclxuICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygnbmFtZScsIG5hbWUpXHJcbiAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ3VybCcsIHVybClcclxuICAgICAgICB3eC5uYXZpZ2F0ZVRvKHsgdXJsOiAnL3BhZ2VzL3ZpZGVvL3ZpZGVvJyB9KVxyXG4gICAgfSxcclxuXHJcbiAgICB0YXBJY29uKGU6IHd4LlRhcEV2ZW50KSB7XHJcbiAgICAgICAgc3dpdGNoIChlLmN1cnJlbnRUYXJnZXQuaWQpIHtcclxuICAgICAgICAgICAgY2FzZSAn6ICD5YukJzpcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRhdGEuY2hlY2tJbi5oYXNDaGVja2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+W3sue7j+etvuWIsCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzog5bey57uP562+5YiwXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YS5jaGVja0luLmlzT3Blbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tJbigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfmiJDlip/nrb7liLAnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKHJlYXNvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVhc29uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiDkuI3og73kurLliLBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIGNhc2UgJ+ivlemimOS9nOS4mic6XHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICBjYXNlICfor4TmlZknOlxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgY2FzZSAn6YWN5aWX6LWE5rqQJzpcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yqg6L2977yM5Zyo5q2k5aSE5YGa6ZyA6KaB5ZCM5q2l55qE5Yid5aeL5YyWXHJcbiAgICAgKi9cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICBsZXQgZGV0YWlsOiBDb3Vyc2VEZXRhaWxJbmZvIHwgbnVsbCA9IG51bGxcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBkZXRhaWwgPSB3eC5nZXRTdG9yYWdlU3luYygnQ291cnNlRGV0YWlsJylcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IOaXoOWPguaVsOWkhOeQhlxyXG4gICAgICAgIH1cclxuICAgICAgICAvKmxldCBvYmogPSB7XHJcbiAgICAgICAgICAgIGNvdXJzZUlEOiAncXcxMjMnLFxyXG4gICAgICAgICAgICBhY3RpdmU6IFsyLCAzLCA0XSxcclxuICAgICAgICAgICAgcG9zaXRpb246IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXlPZldlZWs6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXhPZkRheTogWzAsIDEsIDJdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIGluZm86IHtcclxuICAgICAgICAgICAgICAgIG5hbWU6ICfpq5jnrYnmlbDlraYnLFxyXG4gICAgICAgICAgICAgICAgdGVhY2hlcjogJ+elluWGsuS5iycsXHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogJ0lJSS0xMDUnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9Ki9cclxuICAgICAgICAvKmxldCB2aWRlb3MgPSBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGRhdGU6ICcyMDE5LTEtMTInLFxyXG4gICAgICAgICAgICAgICAgdmlkZW9zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWRlb0lEOiAndjAwMScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICcxLuWHveaVsOWPiuWFtueJueaApycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzV2F0Y2g6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcnXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkYXRlOiAnMjAxOS0xLTEzJyxcclxuICAgICAgICAgICAgICAgIHZpZGVvczogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlkZW9JRDogJ3YwMDInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnMi7mnoHpmZDnmoTmpoLlv7XjgIHmgKfotKjlkozov5Dnrpfms5XliJknLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1dhdGNoOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcnXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkYXRlOiAnMjAxOS0xLTE0JyxcclxuICAgICAgICAgICAgICAgIHZpZGVvczogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlkZW9JRDogJ3YwMDMnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnMy7kuKTkuKrph43opoHmnoHpmZAnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1dhdGNoOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcnXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZGVvSUQ6ICd2MDA0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJzQu5p6B6ZmQ5a2Y5Zyo5YeG5YiZJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNXYXRjaDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJydcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGRhdGU6ICcyMDE5LTEtMTUnLFxyXG4gICAgICAgICAgICAgICAgdmlkZW9zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWRlb0lEOiAndjAwNScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICc1LuaXoOept+Wwj+mHj+WSjOaXoOept+Wkp+mHjycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzV2F0Y2g6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcnXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIGluZm86IGRldGFpbCxcclxuICAgICAgICAgICAgdmlkZW9MaXN0OiB2aWRlb3NcclxuICAgICAgICB9KVxyXG4gICAgICAgICovXHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgaW5mbzogZGV0YWlsIVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgUHJvbWlzZS5hbGwoW1xyXG4gICAgICAgICAgICB0aGlzLmluaXRDaGVja0luKGRldGFpbCEuY291cnNlSUQpLFxyXG4gICAgICAgICAgICB0aGlzLmluaXRMaXZlKGRldGFpbCEuY291cnNlSUQpLFxyXG4gICAgICAgICAgICB0aGlzLmluaXRWaWRlb3MoZGV0YWlsIS5jb3Vyc2VJRClcclxuICAgICAgICBdKVxyXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiDlrozmiJDliJ3lp4vljJblkI5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIFRPRE86IOWIneWni+WMluWHuumUmeWkhOeQhlxyXG4gICAgICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBhc3luYyBpbml0Q2hlY2tJbihjb3Vyc2VJRDogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IGNoZWNrSW4gPSBhd2FpdCBuZXcgUHJvbWlzZTxjaGVja0luUmVzPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBhcHAuZ2xvYmFsRGF0YS5ob3N0TmFtZSArICcvY291cnNlL2NoZWNrX2luJyxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sbGVnZTogYXBwLmdsb2JhbERhdGEuY29sbGVnZSxcclxuICAgICAgICAgICAgICAgICAgICBwZXJzb25JRDogYXBwLmdsb2JhbERhdGEucGVyc29uSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgY291cnNlSUQ6IGNvdXJzZUlEXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHsgZGF0YSB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSg8Y2hlY2tJblJlcz5kYXRhKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6IHJlamVjdFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaWYgKGNoZWNrSW4uc3VjY2Vzcykge1xyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgY2hlY2tJbjogY2hlY2tJbi5yZXN1bHRcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBUT0RPOiDplJnor6/lpITnkIZcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGFzeW5jIGluaXRMaXZlKGNvdXJzZUlEOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgbGl2ZSA9IGF3YWl0IG5ldyBQcm9taXNlPGxpdmVSZXM+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgd3gucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IGFwcC5nbG9iYWxEYXRhLmhvc3ROYW1lICsgJy9jb3Vyc2UvbGl2ZV9pbmZvJyxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7IGNvdXJzZUlEOiBjb3Vyc2VJRCB9LFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHsgZGF0YSB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSg8bGl2ZVJlcz5kYXRhKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6IHJlamVjdFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaWYgKGxpdmUuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgaXNMaXZlOiBsaXZlLnJlc3VsdC5pc0xpdmUsXHJcbiAgICAgICAgICAgICAgICBsaXZlVXJsOiBsaXZlLnJlc3VsdC51cmxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBUT0RPOiDlpLHotKXlpITnkIZcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGFzeW5jIGluaXRWaWRlb3MoY291cnNlSUQ6IHN0cmluZykge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCBuZXcgUHJvbWlzZTx2aWRlb3NSZXM+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgd3gucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IGFwcC5nbG9iYWxEYXRhLmhvc3ROYW1lICsgJy9jb3Vyc2UvdmlkZW9zJyxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7IG9wZW5pZDogYXBwLmdsb2JhbERhdGEub3BlbmlkLCBjb3Vyc2VJRDogY291cnNlSUQgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ICh7IGRhdGEgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoPHZpZGVvc1Jlcz5kYXRhKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6IHJlamVjdFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaWYgKHJlc3VsdC5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICB2aWRlb0xpc3Q6IHJlc3VsdC5yZXN1bHRcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBUT0RPOiDlpLHotKXlpITnkIZcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGFzeW5jIGNoZWNrSW4oKSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IG5ldyBQcm9taXNlPGNoZWNrSW5Qb3N0UmVzPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBhcHAuZ2xvYmFsRGF0YS5ob3N0TmFtZSArICcvY291cnNlL2NoZWNrX2luJyxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbGxlZ2U6IGFwcC5nbG9iYWxEYXRhLmNvbGxlZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcGVyc29uSUQ6IGFwcC5nbG9iYWxEYXRhLnBlcnNvbklELFxyXG4gICAgICAgICAgICAgICAgICAgIGNvdXJzZUlEOiB0aGlzLmRhdGEuaW5mby5jb3Vyc2VJRCxcclxuICAgICAgICAgICAgICAgICAgICB0aW1lOiB0aGlzLmRhdGEuY2hlY2tJbi50aW1lXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHsgZGF0YSB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSg8Y2hlY2tJblBvc3RSZXM+ZGF0YSlcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsOiByZWplY3RcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIGlmIChyZXN1bHQuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAvLyBUT0RPOlxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIFRPRE86XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KVxyXG4iXX0=