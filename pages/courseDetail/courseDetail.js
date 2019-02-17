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
        isLive: false,
        liveUrl: '',
        videoList: []
    },
    tapCourse: function () { },
    onLoad: function (query) {
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
            info: {
                courseID: 'qwe',
                name: '高等数学',
                teacher: '祖冲之',
                location: 'III-105'
            },
            videoList: videos
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291cnNlRGV0YWlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY291cnNlRGV0YWlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFXQSxJQUFNLEdBQUcsR0FBRyxNQUFNLEVBQVUsQ0FBQTtBQUU1QixJQUFJLENBQUM7SUFDRCxJQUFJLEVBQUU7UUFDRixRQUFRLEVBQUU7WUFDTjtnQkFDSSxJQUFJLEVBQUUsV0FBVztnQkFDakIsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsSUFBSSxFQUFFLElBQUk7YUFDYjtZQUNEO2dCQUNJLElBQUksRUFBRSxXQUFXO2dCQUNqQixLQUFLLEVBQUUsT0FBTztnQkFDZCxLQUFLLEVBQUUsQ0FBQztnQkFDUixJQUFJLEVBQUUsTUFBTTthQUNmO1lBQ0Q7Z0JBQ0ksSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLEtBQUssRUFBRSxNQUFNO2dCQUNiLEtBQUssRUFBRSxDQUFDO2dCQUNSLElBQUksRUFBRSxJQUFJO2FBQ2I7WUFDRDtnQkFDSSxJQUFJLEVBQUUsWUFBWTtnQkFDbEIsS0FBSyxFQUFFLE9BQU87Z0JBQ2QsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsSUFBSSxFQUFFLE1BQU07YUFDZjtTQUNKO1FBQ0QsSUFBSSxFQUFFLEVBQUU7UUFDUixNQUFNLEVBQUUsS0FBSztRQUNiLE9BQU8sRUFBRSxFQUFFO1FBQ1gsU0FBUyxFQUFlLEVBQUU7S0FDN0I7SUFFRCxTQUFTLGdCQUFJLENBQUM7SUFLZCxNQUFNLFlBQUMsS0FBeUI7UUFnQjVCLElBQUksTUFBTSxHQUFHO1lBQ1Q7Z0JBQ0ksSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLE1BQU0sRUFBRTtvQkFDSjt3QkFDSSxPQUFPLEVBQUUsTUFBTTt3QkFDZixJQUFJLEVBQUUsVUFBVTt3QkFDaEIsT0FBTyxFQUFFLEtBQUs7d0JBQ2QsR0FBRyxFQUFFLEVBQUU7cUJBQ1Y7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QUFNO3lCQUVOOzs7OztLQUNKO0NBQ0osQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSU15QXBwIH0gZnJvbSAnLi4vLi4vYXBwJ1xyXG5pbXBvcnQgeyBsaXZlUmVzIH0gZnJvbSAnLi4vLi4vdXRpbHMvY291cnNlL2xpdmUnXHJcbmltcG9ydCB7IERheVZpZGVvcywgdmlkZW9zUmVzIH0gZnJvbSAnLi4vLi4vdXRpbHMvY291cnNlL3ZpZGVvJ1xyXG5cclxuaW50ZXJmYWNlIENvdXJzZURldGFpbFF1ZXJ5IHtcclxuICAgIGNvdXJzZUlEPzogc3RyaW5nXHJcbiAgICBuYW1lPzogc3RyaW5nXHJcbiAgICB0ZWFjaGVyPzogc3RyaW5nXHJcbiAgICBsb2NhdGlvbj86IHN0cmluZ1xyXG59XHJcblxyXG5jb25zdCBhcHAgPSBnZXRBcHA8SU15QXBwPigpXHJcblxyXG5QYWdlKHtcclxuICAgIGRhdGE6IHtcclxuICAgICAgICBpY29uTGlzdDogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpY29uOiAnZW1vamlmaWxsJyxcclxuICAgICAgICAgICAgICAgIGNvbG9yOiAncmVkJyxcclxuICAgICAgICAgICAgICAgIGJhZGdlOiAxMjAsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiAn6ICD5YukJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpY29uOiAnd3JpdGVmaWxsJyxcclxuICAgICAgICAgICAgICAgIGNvbG9yOiAnbWF1dmUnLFxyXG4gICAgICAgICAgICAgICAgYmFkZ2U6IDEsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiAn6K+V6aKY5L2c5LiaJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpY29uOiAnc2VsZWN0aW9uZmlsbCcsXHJcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2N5YW4nLFxyXG4gICAgICAgICAgICAgICAgYmFkZ2U6IDAsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiAn6K+E5pWZJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpY29uOiAnY2lyY2xlZmlsbCcsXHJcbiAgICAgICAgICAgICAgICBjb2xvcjogJ29saXZlJyxcclxuICAgICAgICAgICAgICAgIGJhZGdlOiAyMixcclxuICAgICAgICAgICAgICAgIG5hbWU6ICfphY3lpZfotYTmupAnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdLFxyXG4gICAgICAgIGluZm86IHt9LFxyXG4gICAgICAgIGlzTGl2ZTogZmFsc2UsIC8v5piv5ZCm5q2j5Zyo55u05pKtXHJcbiAgICAgICAgbGl2ZVVybDogJycsXHJcbiAgICAgICAgdmlkZW9MaXN0OiA8RGF5VmlkZW9zW10+W11cclxuICAgIH0sXHJcblxyXG4gICAgdGFwQ291cnNlKCkge30sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWKoOi9ve+8jOWcqOatpOWkhOWBmumcgOimgeWQjOatpeeahOWIneWni+WMllxyXG4gICAgICovXHJcbiAgICBvbkxvYWQocXVlcnk/OiBDb3Vyc2VEZXRhaWxRdWVyeSkge1xyXG4gICAgICAgIC8qbGV0IG9iaiA9IHtcclxuICAgICAgICAgICAgY291cnNlSUQ6ICdxdzEyMycsXHJcbiAgICAgICAgICAgIGFjdGl2ZTogWzIsIDMsIDRdLFxyXG4gICAgICAgICAgICBwb3NpdGlvbjogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGRheU9mV2VlazogMCxcclxuICAgICAgICAgICAgICAgICAgICBpbmRleE9mRGF5OiBbMCwgMSwgMl1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgaW5mbzoge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ+mrmOetieaVsOWtpicsXHJcbiAgICAgICAgICAgICAgICB0ZWFjaGVyOiAn56WW5Yay5LmLJyxcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAnSUlJLTEwNSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0qL1xyXG4gICAgICAgIGxldCB2aWRlb3MgPSBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGRhdGU6ICcyMDE5LTEtMTInLFxyXG4gICAgICAgICAgICAgICAgdmlkZW9zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWRlb0lEOiAndjAwMScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICcxLuWHveaVsOWPiuWFtueJueaApycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzV2F0Y2g6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcnXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkYXRlOiAnMjAxOS0xLTEzJyxcclxuICAgICAgICAgICAgICAgIHZpZGVvczogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlkZW9JRDogJ3YwMDInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnMi7mnoHpmZDnmoTmpoLlv7XjgIHmgKfotKjlkozov5Dnrpfms5XliJknLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1dhdGNoOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcnXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkYXRlOiAnMjAxOS0xLTE0JyxcclxuICAgICAgICAgICAgICAgIHZpZGVvczogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlkZW9JRDogJ3YwMDMnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnMy7kuKTkuKrph43opoHmnoHpmZAnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1dhdGNoOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcnXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZGVvSUQ6ICd2MDA0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJzQu5p6B6ZmQ5a2Y5Zyo5YeG5YiZJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNXYXRjaDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJydcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGRhdGU6ICcyMDE5LTEtMTUnLFxyXG4gICAgICAgICAgICAgICAgdmlkZW9zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWRlb0lEOiAndjAwNScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICc1LuaXoOept+Wwj+mHj+WSjOaXoOept+Wkp+mHjycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzV2F0Y2g6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcnXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIGluZm86IHtcclxuICAgICAgICAgICAgICAgIGNvdXJzZUlEOiAncXdlJyxcclxuICAgICAgICAgICAgICAgIG5hbWU6ICfpq5jnrYnmlbDlraYnLFxyXG4gICAgICAgICAgICAgICAgdGVhY2hlcjogJ+elluWGsuS5iycsXHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogJ0lJSS0xMDUnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHZpZGVvTGlzdDogdmlkZW9zXHJcbiAgICAgICAgfSlcclxuICAgICAgICAvKmlmIChxdWVyeSA9PT0gdW5kZWZpbmVkIFxyXG4gICAgICAgICAgICB8fCBxdWVyeS5jb3Vyc2VJRCA9PT0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgIHx8IHF1ZXJ5Lm5hbWUgPT09IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICB8fCBxdWVyeS50ZWFjaGVyID09PSB1bmRlZmluZWRcclxuICAgICAgICAgICAgfHwgcXVlcnkubG9jYXRpb24gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAvLyBUT0RPOiDlpITnkIbnoa7lrp7lj4LmlbBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmluaXQocXVlcnkuY291cnNlSUQpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzog5a6M5oiQ5Yid5aeL5YyW5ZCOXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiDliJ3lp4vljJblh7rplJnlpITnkIZcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSovXHJcbiAgICB9LFxyXG5cclxuICAgIGFzeW5jIGluaXRMaXZlKGNvdXJzZUlEOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgbGl2ZSA9IGF3YWl0IG5ldyBQcm9taXNlPGxpdmVSZXM+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgd3gucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IGFwcC5nbG9iYWxEYXRhLmhvc3ROYW1lICsgJy9jb3Vyc2UvbGl2ZV9pbmZvJyxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7IGNvdXJzZUlEOiBjb3Vyc2VJRCB9LFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHsgZGF0YSB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSg8bGl2ZVJlcz5kYXRhKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6IHJlamVjdFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaWYgKGxpdmUuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgaXNMaXZlOiBsaXZlLnJlc3VsdC5pc0xpdmUsXHJcbiAgICAgICAgICAgICAgICBsaXZlVXJsOiBsaXZlLnJlc3VsdC51cmxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBUT0RPOiDlpLHotKXlpITnkIZcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGFzeW5jIGluaXRWaWRlb3MoY291cnNlSUQ6IHN0cmluZykge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCBuZXcgUHJvbWlzZTx2aWRlb3NSZXM+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgd3gucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IGFwcC5nbG9iYWxEYXRhLmhvc3ROYW1lICsgJy9jb3Vyc2UvdmlkZW9zJyxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7IGNvdXJzZUlEOiBjb3Vyc2VJRCB9LFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHsgZGF0YSB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSg8dmlkZW9zUmVzPmRhdGEpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogcmVqZWN0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgIHZpZGVvTGlzdDogcmVzdWx0LnJlc3VsdFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IOWksei0peWkhOeQhlxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSlcclxuIl19
