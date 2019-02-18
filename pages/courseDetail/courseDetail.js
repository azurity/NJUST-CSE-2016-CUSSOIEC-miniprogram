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
        wx.setStorageSync("id", id);
        wx.setStorageSync("name", name);
        wx.setStorageSync("url", url);
        wx.navigateTo({ url: "/pages/video/video" });
    },
    tapIcon: function (e) {
        switch (e.currentTarget.id) {
            case '考勤':
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
        var videos = [
            {
                date: '2019-1-12',
                videos: [
                    {
                        videoID: 'v001',
                        name: '1.函数及其特性',
                        isWatch: false,
                        url: ''
                    }
                ]
            },
            {
                date: '2019-1-13',
                videos: [
                    {
                        videoID: 'v002',
                        name: '2.极限的概念、性质和运算法则',
                        isWatch: true,
                        url: ''
                    }
                ]
            },
            {
                date: '2019-1-14',
                videos: [
                    {
                        videoID: 'v003',
                        name: '3.两个重要极限',
                        isWatch: true,
                        url: ''
                    },
                    {
                        videoID: 'v004',
                        name: '4.极限存在准则',
                        isWatch: false,
                        url: ''
                    }
                ]
            },
            {
                date: '2019-1-15',
                videos: [
                    {
                        videoID: 'v005',
                        name: '5.无穷小量和无穷大量',
                        isWatch: false,
                        url: ''
                    }
                ]
            }
        ];
        this.setData({
            info: detail,
            videoList: videos
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
                                data: { courseID: courseID },
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
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291cnNlRGV0YWlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY291cnNlRGV0YWlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFZQSxJQUFNLEdBQUcsR0FBRyxNQUFNLEVBQVUsQ0FBQTtBQUU1QixJQUFJLENBQUM7SUFDRCxJQUFJLEVBQUU7UUFDRixRQUFRLEVBQUU7WUFDTjtnQkFDSSxJQUFJLEVBQUUsV0FBVztnQkFDakIsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsSUFBSSxFQUFFLElBQUk7YUFDYjtZQUNEO2dCQUNJLElBQUksRUFBRSxXQUFXO2dCQUNqQixLQUFLLEVBQUUsT0FBTztnQkFDZCxLQUFLLEVBQUUsQ0FBQztnQkFDUixJQUFJLEVBQUUsTUFBTTthQUNmO1lBQ0Q7Z0JBQ0ksSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLEtBQUssRUFBRSxNQUFNO2dCQUNiLEtBQUssRUFBRSxDQUFDO2dCQUNSLElBQUksRUFBRSxJQUFJO2FBQ2I7WUFDRDtnQkFDSSxJQUFJLEVBQUUsWUFBWTtnQkFDbEIsS0FBSyxFQUFFLE9BQU87Z0JBQ2QsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsSUFBSSxFQUFFLE1BQU07YUFDZjtTQUNKO1FBQ0QsSUFBSSxFQUFFLEVBQUU7UUFDUixPQUFPLEVBQWEsRUFBRTtRQUN0QixNQUFNLEVBQUUsS0FBSztRQUNiLE9BQU8sRUFBRSxFQUFFO1FBQ1gsU0FBUyxFQUFlLEVBQUU7S0FDN0I7SUFFRCxTQUFTLFlBQUMsS0FBUztRQUNmLElBQUksRUFBRSxHQUFRLEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztRQUM3QyxJQUFJLElBQUksR0FBUSxLQUFLLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDakQsSUFBSSxHQUFHLEdBQVEsS0FBSyxDQUFDLGFBQWEsQ0FBQyxP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QUFNLEVBQUUsS0FBSztnQ0FDYixJQUFJLEVBQUUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFO2dDQUM1QixPQUFPLEVBQUUsVUFBQyxFQUFRO3dDQUFOLGNBQUk7b0NBQ1osT0FBTyxDQUFZLElBQUksQ0FBQyxDQUFBO2dDQUM1QixDQUFDO2dDQUNELElBQUksRUFBRSxNQUFNOzZCQUNmLENBQUMsQ0FBQTt3QkFDTixDQUFDLENBQUMsRUFBQTs7d0JBVkUsTUFBTSxHQUFHLFNBVVg7d0JBQ0YsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFOzRCQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDO2dDQUNULFNBQVMsRUFBRSxNQUFNLENBQUMsTUFBTTs2QkFDM0IsQ0FBQyxDQUFBO3lCQUNMOzZCQUFNO3lCQUVOOzs7OztLQUNKO0NBQ0osQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSU15QXBwIH0gZnJvbSAnLi4vLi4vYXBwJ1xyXG5pbXBvcnQgeyBsaXZlUmVzIH0gZnJvbSAnLi4vLi4vdXRpbHMvY291cnNlL2xpdmUnXHJcbmltcG9ydCB7IERheVZpZGVvcywgdmlkZW9zUmVzIH0gZnJvbSAnLi4vLi4vdXRpbHMvY291cnNlL3ZpZGVvJ1xyXG5pbXBvcnQgeyBDaGVja0luZm8sIGNoZWNrSW5SZXMgfSBmcm9tICcuLi8uLi91dGlscy9jb3Vyc2UvY2hlY2tJbidcclxuXHJcbmludGVyZmFjZSBDb3Vyc2VEZXRhaWxJbmZvIHtcclxuICAgIGNvdXJzZUlEOiBzdHJpbmdcclxuICAgIG5hbWU6IHN0cmluZ1xyXG4gICAgdGVhY2hlcjogc3RyaW5nXHJcbiAgICBsb2NhdGlvbjogc3RyaW5nXHJcbn1cclxuXHJcbmNvbnN0IGFwcCA9IGdldEFwcDxJTXlBcHA+KClcclxuXHJcblBhZ2Uoe1xyXG4gICAgZGF0YToge1xyXG4gICAgICAgIGljb25MaXN0OiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGljb246ICdlbW9qaWZpbGwnLFxyXG4gICAgICAgICAgICAgICAgY29sb3I6ICdyZWQnLFxyXG4gICAgICAgICAgICAgICAgYmFkZ2U6IDEyMCxcclxuICAgICAgICAgICAgICAgIG5hbWU6ICfogIPli6QnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGljb246ICd3cml0ZWZpbGwnLFxyXG4gICAgICAgICAgICAgICAgY29sb3I6ICdtYXV2ZScsXHJcbiAgICAgICAgICAgICAgICBiYWRnZTogMSxcclxuICAgICAgICAgICAgICAgIG5hbWU6ICfor5XpopjkvZzkuJonXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGljb246ICdzZWxlY3Rpb25maWxsJyxcclxuICAgICAgICAgICAgICAgIGNvbG9yOiAnY3lhbicsXHJcbiAgICAgICAgICAgICAgICBiYWRnZTogMCxcclxuICAgICAgICAgICAgICAgIG5hbWU6ICfor4TmlZknXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGljb246ICdjaXJjbGVmaWxsJyxcclxuICAgICAgICAgICAgICAgIGNvbG9yOiAnb2xpdmUnLFxyXG4gICAgICAgICAgICAgICAgYmFkZ2U6IDIyLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ+mFjeWll+i1hOa6kCdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgaW5mbzoge30sXHJcbiAgICAgICAgY2hlY2tJbjogPENoZWNrSW5mbz57fSxcclxuICAgICAgICBpc0xpdmU6IGZhbHNlLCAvL+aYr+WQpuato+WcqOebtOaSrVxyXG4gICAgICAgIGxpdmVVcmw6ICcnLFxyXG4gICAgICAgIHZpZGVvTGlzdDogPERheVZpZGVvc1tdPltdXHJcbiAgICB9LFxyXG5cclxuICAgIHRhcENvdXJzZShldmVudDphbnkpIHtcclxuICAgICAgICBsZXQgaWQ6c3RyaW5nPWV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZDtcclxuICAgICAgICBsZXQgbmFtZTpzdHJpbmc9ZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0Lm5hbWU7XHJcbiAgICAgICAgbGV0IHVybDpzdHJpbmc9ZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0LnVybDtcclxuICAgICAgICB3eC5zZXRTdG9yYWdlU3luYyhcImlkXCIsaWQpO1xyXG4gICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKFwibmFtZVwiLG5hbWUpO1xyXG4gICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKFwidXJsXCIsdXJsKTtcclxuICAgICAgICB3eC5uYXZpZ2F0ZVRvKHt1cmw6XCIvcGFnZXMvdmlkZW8vdmlkZW9cIn0pXHJcbiAgICB9LFxyXG5cclxuICAgIHRhcEljb24oZTogd3guVGFwRXZlbnQpIHtcclxuICAgICAgICBzd2l0Y2ggKGUuY3VycmVudFRhcmdldC5pZCkge1xyXG4gICAgICAgICAgICBjYXNlICfogIPli6QnOlxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgY2FzZSAn6K+V6aKY5L2c5LiaJzpcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIGNhc2UgJ+ivhOaVmSc6XHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICBjYXNlICfphY3lpZfotYTmupAnOlxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliqDovb3vvIzlnKjmraTlpITlgZrpnIDopoHlkIzmraXnmoTliJ3lp4vljJZcclxuICAgICAqL1xyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIGxldCBkZXRhaWw6IENvdXJzZURldGFpbEluZm8gfCBudWxsID0gbnVsbFxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGRldGFpbCA9IHd4LmdldFN0b3JhZ2VTeW5jKCdDb3Vyc2VEZXRhaWwnKVxyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgLy8gVE9ETzog5peg5Y+C5pWw5aSE55CGXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qbGV0IG9iaiA9IHtcclxuICAgICAgICAgICAgY291cnNlSUQ6ICdxdzEyMycsXHJcbiAgICAgICAgICAgIGFjdGl2ZTogWzIsIDMsIDRdLFxyXG4gICAgICAgICAgICBwb3NpdGlvbjogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGRheU9mV2VlazogMCxcclxuICAgICAgICAgICAgICAgICAgICBpbmRleE9mRGF5OiBbMCwgMSwgMl1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgaW5mbzoge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ+mrmOetieaVsOWtpicsXHJcbiAgICAgICAgICAgICAgICB0ZWFjaGVyOiAn56WW5Yay5LmLJyxcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAnSUlJLTEwNSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0qL1xyXG4gICAgICAgIGxldCB2aWRlb3MgPSBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGRhdGU6ICcyMDE5LTEtMTInLFxyXG4gICAgICAgICAgICAgICAgdmlkZW9zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWRlb0lEOiAndjAwMScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICcxLuWHveaVsOWPiuWFtueJueaApycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzV2F0Y2g6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcnXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkYXRlOiAnMjAxOS0xLTEzJyxcclxuICAgICAgICAgICAgICAgIHZpZGVvczogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlkZW9JRDogJ3YwMDInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnMi7mnoHpmZDnmoTmpoLlv7XjgIHmgKfotKjlkozov5Dnrpfms5XliJknLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1dhdGNoOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcnXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkYXRlOiAnMjAxOS0xLTE0JyxcclxuICAgICAgICAgICAgICAgIHZpZGVvczogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlkZW9JRDogJ3YwMDMnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnMy7kuKTkuKrph43opoHmnoHpmZAnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1dhdGNoOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcnXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZGVvSUQ6ICd2MDA0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJzQu5p6B6ZmQ5a2Y5Zyo5YeG5YiZJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNXYXRjaDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJydcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGRhdGU6ICcyMDE5LTEtMTUnLFxyXG4gICAgICAgICAgICAgICAgdmlkZW9zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWRlb0lEOiAndjAwNScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICc1LuaXoOept+Wwj+mHj+WSjOaXoOept+Wkp+mHjycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzV2F0Y2g6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcnXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIGluZm86IGRldGFpbCxcclxuICAgICAgICAgICAgdmlkZW9MaXN0OiB2aWRlb3NcclxuICAgICAgICB9KVxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgUHJvbWlzZS5hbGwoW3RoaXMuaW5pdENoZWNrSW4oKSwgdGhpcy5pbml0TGl2ZSgpLCB0aGlzLmluaXRWaWRlb3MoKV0pXHJcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIFRPRE86IOWujOaIkOWIneWni+WMluWQjlxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gVE9ETzog5Yid5aeL5YyW5Ye66ZSZ5aSE55CGXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKi9cclxuICAgIH0sXHJcblxyXG4gICAgYXN5bmMgaW5pdENoZWNrSW4oY291cnNlSUQ6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBjaGVja0luID0gYXdhaXQgbmV3IFByb21pc2U8Y2hlY2tJblJlcz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgIHVybDogYXBwLmdsb2JhbERhdGEuaG9zdE5hbWUgKyAnL2NvdXJzZS9jaGVja19pbicsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbGxlZ2U6IGFwcC5nbG9iYWxEYXRhLmNvbGxlZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcGVyc29uSUQ6IGFwcC5nbG9iYWxEYXRhLnBlcnNvbklELFxyXG4gICAgICAgICAgICAgICAgICAgIGNvdXJzZUlEOiBjb3Vyc2VJRFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ICh7IGRhdGEgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoPGNoZWNrSW5SZXM+ZGF0YSlcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsOiByZWplY3RcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIGlmIChjaGVja0luLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgIGNoZWNrSW46IGNoZWNrSW4ucmVzdWx0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gVE9ETzog6ZSZ6K+v5aSE55CGXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBhc3luYyBpbml0TGl2ZShjb3Vyc2VJRDogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IGxpdmUgPSBhd2FpdCBuZXcgUHJvbWlzZTxsaXZlUmVzPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBhcHAuZ2xvYmFsRGF0YS5ob3N0TmFtZSArICcvY291cnNlL2xpdmVfaW5mbycsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogeyBjb3Vyc2VJRDogY291cnNlSUQgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ICh7IGRhdGEgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoPGxpdmVSZXM+ZGF0YSlcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsOiByZWplY3RcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIGlmIChsaXZlLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgIGlzTGl2ZTogbGl2ZS5yZXN1bHQuaXNMaXZlLFxyXG4gICAgICAgICAgICAgICAgbGl2ZVVybDogbGl2ZS5yZXN1bHQudXJsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gVE9ETzog5aSx6LSl5aSE55CGXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBhc3luYyBpbml0VmlkZW9zKGNvdXJzZUlEOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgbmV3IFByb21pc2U8dmlkZW9zUmVzPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBhcHAuZ2xvYmFsRGF0YS5ob3N0TmFtZSArICcvY291cnNlL3ZpZGVvcycsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogeyBjb3Vyc2VJRDogY291cnNlSUQgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ICh7IGRhdGEgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoPHZpZGVvc1Jlcz5kYXRhKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6IHJlamVjdFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaWYgKHJlc3VsdC5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICB2aWRlb0xpc3Q6IHJlc3VsdC5yZXN1bHRcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBUT0RPOiDlpLHotKXlpITnkIZcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pXHJcbiJdfQ==