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
                }
                else if (this.data.checkIn.isOpen) {
                    this.checkIn()
                        .then(function () { })
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
            var courseWeekInfo, result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        courseWeekInfo = null;
                        try {
                            courseWeekInfo = wx.getStorageSync('CourseWeekInfo');
                        }
                        catch (e) {
                        }
                        return [4, new Promise(function (resolve, reject) {
                                wx.request({
                                    url: app.globalData.hostName + '/course/check_in',
                                    method: 'POST',
                                    data: {
                                        college: app.globalData.college,
                                        personID: app.globalData.personID,
                                        courseID: _this.data.info.courseID,
                                        numOfWeek: courseWeekInfo.numOfWeek,
                                        dayOfWeek: courseWeekInfo.dayOfWeek,
                                        indexOfDay: courseWeekInfo.indexOfDay
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291cnNlRGV0YWlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY291cnNlRGV0YWlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFhQSxJQUFNLEdBQUcsR0FBRyxNQUFNLEVBQVUsQ0FBQTtBQUU1QixJQUFJLENBQUM7SUFDRCxJQUFJLEVBQUU7UUFDRixRQUFRLEVBQUU7WUFDTjtnQkFDSSxJQUFJLEVBQUUsV0FBVztnQkFDakIsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsSUFBSSxFQUFFLElBQUk7YUFDYjtZQUNEO2dCQUNJLElBQUksRUFBRSxXQUFXO2dCQUNqQixLQUFLLEVBQUUsT0FBTztnQkFDZCxLQUFLLEVBQUUsQ0FBQztnQkFDUixJQUFJLEVBQUUsTUFBTTthQUNmO1lBQ0Q7Z0JBQ0ksSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLEtBQUssRUFBRSxNQUFNO2dCQUNiLEtBQUssRUFBRSxDQUFDO2dCQUNSLElBQUksRUFBRSxJQUFJO2FBQ2I7WUFDRDtnQkFDSSxJQUFJLEVBQUUsWUFBWTtnQkFDbEIsS0FBSyxFQUFFLE9BQU87Z0JBQ2QsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsSUFBSSxFQUFFLE1BQU07YUFDZjtTQUNKO1FBQ0QsSUFBSSxFQUFFLEVBQUU7UUFDUixPQUFPLEVBQWEsRUFBRTtRQUN0QixNQUFNLEVBQUUsS0FBSztRQUNiLE9BQU8sRUFBRSxFQUFFO1FBQ1gsU0FBUyxFQUFlLEVBQUU7S0FDN0I7SUFFRCxTQUFTLFlBQUMsS0FBVTtRQUNoQixJQUFJLEVBQUUsR0FBVyxLQUFLLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUE7UUFDL0MsSUFBSSxJQUFJLEdBQVcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFBO1FBQ25ELElBQUksR0FBRyxHQUFXLEtBQUssQ0FBQyxhQUFhLENBQUMs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O3lCQUVOOzs7OztLQUNKO0NBQ0osQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSU15QXBwIH0gZnJvbSAnLi4vLi4vYXBwJ1xyXG5pbXBvcnQgeyBsaXZlUmVzIH0gZnJvbSAnLi4vLi4vdXRpbHMvY291cnNlL2xpdmVSZXMnXHJcbmltcG9ydCB7IERheVZpZGVvcywgdmlkZW9zUmVzIH0gZnJvbSAnLi4vLi4vdXRpbHMvY291cnNlL3ZpZGVvUmVzJ1xyXG5pbXBvcnQgeyBDaGVja0luZm8sIGNoZWNrSW5SZXMsIGNoZWNrSW5Qb3N0UmVzIH0gZnJvbSAnLi4vLi4vdXRpbHMvY291cnNlL2NoZWNrSW5SZXMnXHJcbmltcG9ydCB7IENvdXJzZVdlZWtJbmZvIH0gZnJvbSAnLi4vLi4vdXRpbHMvY291cnNlL0NvdXJzZVdlZWtJbmZvJ1xyXG5cclxuaW50ZXJmYWNlIENvdXJzZURldGFpbEluZm8ge1xyXG4gICAgY291cnNlSUQ6IHN0cmluZ1xyXG4gICAgbmFtZTogc3RyaW5nXHJcbiAgICB0ZWFjaGVyOiBzdHJpbmdcclxuICAgIGxvY2F0aW9uOiBzdHJpbmdcclxufVxyXG5cclxuY29uc3QgYXBwID0gZ2V0QXBwPElNeUFwcD4oKVxyXG5cclxuUGFnZSh7XHJcbiAgICBkYXRhOiB7XHJcbiAgICAgICAgaWNvbkxpc3Q6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWNvbjogJ2Vtb2ppZmlsbCcsXHJcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3JlZCcsXHJcbiAgICAgICAgICAgICAgICBiYWRnZTogMTIwLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ+iAg+WLpCdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWNvbjogJ3dyaXRlZmlsbCcsXHJcbiAgICAgICAgICAgICAgICBjb2xvcjogJ21hdXZlJyxcclxuICAgICAgICAgICAgICAgIGJhZGdlOiAxLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ+ivlemimOS9nOS4midcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWNvbjogJ3NlbGVjdGlvbmZpbGwnLFxyXG4gICAgICAgICAgICAgICAgY29sb3I6ICdjeWFuJyxcclxuICAgICAgICAgICAgICAgIGJhZGdlOiAwLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ+ivhOaVmSdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWNvbjogJ2NpcmNsZWZpbGwnLFxyXG4gICAgICAgICAgICAgICAgY29sb3I6ICdvbGl2ZScsXHJcbiAgICAgICAgICAgICAgICBiYWRnZTogMjIsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiAn6YWN5aWX6LWE5rqQJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXSxcclxuICAgICAgICBpbmZvOiB7fSxcclxuICAgICAgICBjaGVja0luOiA8Q2hlY2tJbmZvPnt9LFxyXG4gICAgICAgIGlzTGl2ZTogZmFsc2UsIC8v5piv5ZCm5q2j5Zyo55u05pKtXHJcbiAgICAgICAgbGl2ZVVybDogJycsXHJcbiAgICAgICAgdmlkZW9MaXN0OiA8RGF5VmlkZW9zW10+W11cclxuICAgIH0sXHJcblxyXG4gICAgdGFwQ291cnNlKGV2ZW50OiBhbnkpIHtcclxuICAgICAgICBsZXQgaWQ6IHN0cmluZyA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZFxyXG4gICAgICAgIGxldCBuYW1lOiBzdHJpbmcgPSBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQubmFtZVxyXG4gICAgICAgIGxldCB1cmw6IHN0cmluZyA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC51cmxcclxuICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygnaWQnLCBpZClcclxuICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygnbmFtZScsIG5hbWUpXHJcbiAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ3VybCcsIHVybClcclxuICAgICAgICB3eC5uYXZpZ2F0ZVRvKHsgdXJsOiAnL3BhZ2VzL3ZpZGVvL3ZpZGVvJyB9KVxyXG4gICAgfSxcclxuXHJcbiAgICB0YXBJY29uKGU6IHd4LlRhcEV2ZW50KSB7XHJcbiAgICAgICAgc3dpdGNoIChlLmN1cnJlbnRUYXJnZXQuaWQpIHtcclxuICAgICAgICAgICAgY2FzZSAn6ICD5YukJzpcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRhdGEuY2hlY2tJbi5oYXNDaGVja2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzog5bey57uP562+5YiwXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YS5jaGVja0luLmlzT3Blbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tJbigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHt9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKHJlYXNvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVhc29uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiDkuI3og73kurLliLBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIGNhc2UgJ+ivlemimOS9nOS4mic6XHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICBjYXNlICfor4TmlZknOlxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgY2FzZSAn6YWN5aWX6LWE5rqQJzpcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yqg6L2977yM5Zyo5q2k5aSE5YGa6ZyA6KaB5ZCM5q2l55qE5Yid5aeL5YyWXHJcbiAgICAgKi9cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICBsZXQgZGV0YWlsOiBDb3Vyc2VEZXRhaWxJbmZvIHwgbnVsbCA9IG51bGxcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBkZXRhaWwgPSB3eC5nZXRTdG9yYWdlU3luYygnQ291cnNlRGV0YWlsJylcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IOaXoOWPguaVsOWkhOeQhlxyXG4gICAgICAgIH1cclxuICAgICAgICAvKmxldCBvYmogPSB7XHJcbiAgICAgICAgICAgIGNvdXJzZUlEOiAncXcxMjMnLFxyXG4gICAgICAgICAgICBhY3RpdmU6IFsyLCAzLCA0XSxcclxuICAgICAgICAgICAgcG9zaXRpb246IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXlPZldlZWs6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXhPZkRheTogWzAsIDEsIDJdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIGluZm86IHtcclxuICAgICAgICAgICAgICAgIG5hbWU6ICfpq5jnrYnmlbDlraYnLFxyXG4gICAgICAgICAgICAgICAgdGVhY2hlcjogJ+elluWGsuS5iycsXHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogJ0lJSS0xMDUnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9Ki9cclxuICAgICAgICAvKmxldCB2aWRlb3MgPSBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGRhdGU6ICcyMDE5LTEtMTInLFxyXG4gICAgICAgICAgICAgICAgdmlkZW9zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWRlb0lEOiAndjAwMScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICcxLuWHveaVsOWPiuWFtueJueaApycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzV2F0Y2g6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcnXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkYXRlOiAnMjAxOS0xLTEzJyxcclxuICAgICAgICAgICAgICAgIHZpZGVvczogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlkZW9JRDogJ3YwMDInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnMi7mnoHpmZDnmoTmpoLlv7XjgIHmgKfotKjlkozov5Dnrpfms5XliJknLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1dhdGNoOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcnXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkYXRlOiAnMjAxOS0xLTE0JyxcclxuICAgICAgICAgICAgICAgIHZpZGVvczogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlkZW9JRDogJ3YwMDMnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnMy7kuKTkuKrph43opoHmnoHpmZAnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1dhdGNoOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcnXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZGVvSUQ6ICd2MDA0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJzQu5p6B6ZmQ5a2Y5Zyo5YeG5YiZJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNXYXRjaDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJydcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGRhdGU6ICcyMDE5LTEtMTUnLFxyXG4gICAgICAgICAgICAgICAgdmlkZW9zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWRlb0lEOiAndjAwNScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICc1LuaXoOept+Wwj+mHj+WSjOaXoOept+Wkp+mHjycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzV2F0Y2g6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcnXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIGluZm86IGRldGFpbCxcclxuICAgICAgICAgICAgdmlkZW9MaXN0OiB2aWRlb3NcclxuICAgICAgICB9KVxyXG4gICAgICAgICovXHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgaW5mbzogZGV0YWlsIVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgUHJvbWlzZS5hbGwoW1xyXG4gICAgICAgICAgICB0aGlzLmluaXRDaGVja0luKGRldGFpbCEuY291cnNlSUQpLFxyXG4gICAgICAgICAgICB0aGlzLmluaXRMaXZlKGRldGFpbCEuY291cnNlSUQpLFxyXG4gICAgICAgICAgICB0aGlzLmluaXRWaWRlb3MoZGV0YWlsIS5jb3Vyc2VJRClcclxuICAgICAgICBdKVxyXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiDlrozmiJDliJ3lp4vljJblkI5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIFRPRE86IOWIneWni+WMluWHuumUmeWkhOeQhlxyXG4gICAgICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBhc3luYyBpbml0Q2hlY2tJbihjb3Vyc2VJRDogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IGNoZWNrSW4gPSBhd2FpdCBuZXcgUHJvbWlzZTxjaGVja0luUmVzPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBhcHAuZ2xvYmFsRGF0YS5ob3N0TmFtZSArICcvY291cnNlL2NoZWNrX2luJyxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sbGVnZTogYXBwLmdsb2JhbERhdGEuY29sbGVnZSxcclxuICAgICAgICAgICAgICAgICAgICBwZXJzb25JRDogYXBwLmdsb2JhbERhdGEucGVyc29uSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgY291cnNlSUQ6IGNvdXJzZUlEXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHsgZGF0YSB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSg8Y2hlY2tJblJlcz5kYXRhKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6IHJlamVjdFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaWYgKGNoZWNrSW4uc3VjY2Vzcykge1xyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgY2hlY2tJbjogY2hlY2tJbi5yZXN1bHRcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBUT0RPOiDplJnor6/lpITnkIZcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGFzeW5jIGluaXRMaXZlKGNvdXJzZUlEOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgbGl2ZSA9IGF3YWl0IG5ldyBQcm9taXNlPGxpdmVSZXM+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgd3gucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IGFwcC5nbG9iYWxEYXRhLmhvc3ROYW1lICsgJy9jb3Vyc2UvbGl2ZV9pbmZvJyxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7IGNvdXJzZUlEOiBjb3Vyc2VJRCB9LFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHsgZGF0YSB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSg8bGl2ZVJlcz5kYXRhKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6IHJlamVjdFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaWYgKGxpdmUuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgaXNMaXZlOiBsaXZlLnJlc3VsdC5pc0xpdmUsXHJcbiAgICAgICAgICAgICAgICBsaXZlVXJsOiBsaXZlLnJlc3VsdC51cmxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBUT0RPOiDlpLHotKXlpITnkIZcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGFzeW5jIGluaXRWaWRlb3MoY291cnNlSUQ6IHN0cmluZykge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCBuZXcgUHJvbWlzZTx2aWRlb3NSZXM+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgd3gucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IGFwcC5nbG9iYWxEYXRhLmhvc3ROYW1lICsgJy9jb3Vyc2UvdmlkZW9zJyxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7IG9wZW5pZDogYXBwLmdsb2JhbERhdGEub3BlbmlkLCBjb3Vyc2VJRDogY291cnNlSUQgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ICh7IGRhdGEgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoPHZpZGVvc1Jlcz5kYXRhKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6IHJlamVjdFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaWYgKHJlc3VsdC5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICB2aWRlb0xpc3Q6IHJlc3VsdC5yZXN1bHRcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBUT0RPOiDlpLHotKXlpITnkIZcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGFzeW5jIGNoZWNrSW4oKSB7XHJcbiAgICAgICAgbGV0IGNvdXJzZVdlZWtJbmZvOiBDb3Vyc2VXZWVrSW5mbyB8IG51bGwgPSBudWxsXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY291cnNlV2Vla0luZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnQ291cnNlV2Vla0luZm8nKVxyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgLy8gVE9ETzpcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IG5ldyBQcm9taXNlPGNoZWNrSW5Qb3N0UmVzPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBhcHAuZ2xvYmFsRGF0YS5ob3N0TmFtZSArICcvY291cnNlL2NoZWNrX2luJyxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbGxlZ2U6IGFwcC5nbG9iYWxEYXRhLmNvbGxlZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcGVyc29uSUQ6IGFwcC5nbG9iYWxEYXRhLnBlcnNvbklELFxyXG4gICAgICAgICAgICAgICAgICAgIGNvdXJzZUlEOiB0aGlzLmRhdGEuaW5mby5jb3Vyc2VJRCxcclxuICAgICAgICAgICAgICAgICAgICBudW1PZldlZWs6IGNvdXJzZVdlZWtJbmZvIS5udW1PZldlZWssXHJcbiAgICAgICAgICAgICAgICAgICAgZGF5T2ZXZWVrOiBjb3Vyc2VXZWVrSW5mbyEuZGF5T2ZXZWVrLFxyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4T2ZEYXk6IGNvdXJzZVdlZWtJbmZvIS5pbmRleE9mRGF5XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHsgZGF0YSB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSg8Y2hlY2tJblBvc3RSZXM+ZGF0YSlcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsOiByZWplY3RcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIGlmIChyZXN1bHQuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAvLyBUT0RPOlxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIFRPRE86XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KVxyXG4iXX0=