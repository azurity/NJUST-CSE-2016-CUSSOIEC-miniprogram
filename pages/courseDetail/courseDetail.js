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
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291cnNlRGV0YWlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY291cnNlRGV0YWlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFZQSxJQUFNLEdBQUcsR0FBRyxNQUFNLEVBQVUsQ0FBQTtBQUU1QixJQUFJLENBQUM7SUFDRCxJQUFJLEVBQUU7UUFDRixRQUFRLEVBQUU7WUFDTjtnQkFDSSxJQUFJLEVBQUUsV0FBVztnQkFDakIsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsSUFBSSxFQUFFLElBQUk7YUFDYjtZQUNEO2dCQUNJLElBQUksRUFBRSxXQUFXO2dCQUNqQixLQUFLLEVBQUUsT0FBTztnQkFDZCxLQUFLLEVBQUUsQ0FBQztnQkFDUixJQUFJLEVBQUUsTUFBTTthQUNmO1lBQ0Q7Z0JBQ0ksSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLEtBQUssRUFBRSxNQUFNO2dCQUNiLEtBQUssRUFBRSxDQUFDO2dCQUNSLElBQUksRUFBRSxJQUFJO2FBQ2I7WUFDRDtnQkFDSSxJQUFJLEVBQUUsWUFBWTtnQkFDbEIsS0FBSyxFQUFFLE9BQU87Z0JBQ2QsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsSUFBSSxFQUFFLE1BQU07YUFDZjtTQUNKO1FBQ0QsSUFBSSxFQUFFLEVBQUU7UUFDUixPQUFPLEVBQWEsRUFBRTtRQUN0QixNQUFNLEVBQUUsS0FBSztRQUNiLE9BQU8sRUFBRSxFQUFFO1FBQ1gsU0FBUyxFQUFlLEVBQUU7S0FDN0I7SUFFRCxTQUFTLFlBQUMsS0FBVTtRQUNoQixJQUFJLEVBQUUsR0FBVyxLQUFLLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUE7UUFDL0MsSUFBSSxJQUFJLEdBQVcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFBO1FBQ25ELElBQUksR0FBRyxHQUFXLEtBQUssQ0FBQyxhQUFhLENBQUMs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QkFDTixDQUFDLENBQUMsRUFBQTs7d0JBVkUsSUFBSSxHQUFHLFNBVVQ7d0JBQ0YsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFOzRCQUNkLElBQUksQ0FBQyxPQUFPLENBQUM7Z0NBQ1QsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTTtnQ0FDMUIsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRzs2QkFDM0IsQ0FBQyxDQUFBO3lCQUNMOzZCQUFNO3lCQUVOOzs7OztLQUNKO0lBRUssVUFBVSxZQUFDLFFBQWdCOzs7Ozs0QkFDaEIsV0FBTSxJQUFJLE9BQU8sQ0FBWSxVQUFDLE9BQU8sRUFBRSxNQUFNOzRCQUN0RCxFQUFFLENBQUMsT0FBTyxDQUFDO2dDQUNQLEdBQUcsRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsR0FBRyxnQkFBZ0I7Z0NBQy9DLE1BQU0sRUFBRSxLQUFLO2dDQUNiLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFO2dDQUMzRCxPQUFPLEVBQUUsVUFBQyxFQUFRO3dDQUFOLGNBQUk7b0NBQ1osT0FBTyxDQUFZLElBQUksQ0FBQyxDQUFBO2dDQUM1QixDQUFDO2dDQUNELElBQUksRUFBRSxNQUFNOzZCQUNmLENBQUMsQ0FBQTt3QkFDTixDQUFDLENBQUMsRUFBQTs7d0JBVkUsTUFBTSxHQUFHLFNBVVg7d0JBQ0YsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFOzRCQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDO2dDQUNULFNBQVMsRUFBRSxNQUFNLENBQUMsTUFBTTs2QkFDM0IsQ0FBQyxDQUFBO3lCQUNMOzZCQUFNO3lCQUVOOzs7OztLQUNKO0NBQ0osQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSU15QXBwIH0gZnJvbSAnLi4vLi4vYXBwJ1xyXG5pbXBvcnQgeyBsaXZlUmVzIH0gZnJvbSAnLi4vLi4vdXRpbHMvY291cnNlL2xpdmUnXHJcbmltcG9ydCB7IERheVZpZGVvcywgdmlkZW9zUmVzIH0gZnJvbSAnLi4vLi4vdXRpbHMvY291cnNlL3ZpZGVvJ1xyXG5pbXBvcnQgeyBDaGVja0luZm8sIGNoZWNrSW5SZXMgfSBmcm9tICcuLi8uLi91dGlscy9jb3Vyc2UvY2hlY2tJbidcclxuXHJcbmludGVyZmFjZSBDb3Vyc2VEZXRhaWxJbmZvIHtcclxuICAgIGNvdXJzZUlEOiBzdHJpbmdcclxuICAgIG5hbWU6IHN0cmluZ1xyXG4gICAgdGVhY2hlcjogc3RyaW5nXHJcbiAgICBsb2NhdGlvbjogc3RyaW5nXHJcbn1cclxuXHJcbmNvbnN0IGFwcCA9IGdldEFwcDxJTXlBcHA+KClcclxuXHJcblBhZ2Uoe1xyXG4gICAgZGF0YToge1xyXG4gICAgICAgIGljb25MaXN0OiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGljb246ICdlbW9qaWZpbGwnLFxyXG4gICAgICAgICAgICAgICAgY29sb3I6ICdyZWQnLFxyXG4gICAgICAgICAgICAgICAgYmFkZ2U6IDEyMCxcclxuICAgICAgICAgICAgICAgIG5hbWU6ICfogIPli6QnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGljb246ICd3cml0ZWZpbGwnLFxyXG4gICAgICAgICAgICAgICAgY29sb3I6ICdtYXV2ZScsXHJcbiAgICAgICAgICAgICAgICBiYWRnZTogMSxcclxuICAgICAgICAgICAgICAgIG5hbWU6ICfor5XpopjkvZzkuJonXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGljb246ICdzZWxlY3Rpb25maWxsJyxcclxuICAgICAgICAgICAgICAgIGNvbG9yOiAnY3lhbicsXHJcbiAgICAgICAgICAgICAgICBiYWRnZTogMCxcclxuICAgICAgICAgICAgICAgIG5hbWU6ICfor4TmlZknXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGljb246ICdjaXJjbGVmaWxsJyxcclxuICAgICAgICAgICAgICAgIGNvbG9yOiAnb2xpdmUnLFxyXG4gICAgICAgICAgICAgICAgYmFkZ2U6IDIyLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ+mFjeWll+i1hOa6kCdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgaW5mbzoge30sXHJcbiAgICAgICAgY2hlY2tJbjogPENoZWNrSW5mbz57fSxcclxuICAgICAgICBpc0xpdmU6IGZhbHNlLCAvL+aYr+WQpuato+WcqOebtOaSrVxyXG4gICAgICAgIGxpdmVVcmw6ICcnLFxyXG4gICAgICAgIHZpZGVvTGlzdDogPERheVZpZGVvc1tdPltdXHJcbiAgICB9LFxyXG5cclxuICAgIHRhcENvdXJzZShldmVudDogYW55KSB7XHJcbiAgICAgICAgbGV0IGlkOiBzdHJpbmcgPSBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWRcclxuICAgICAgICBsZXQgbmFtZTogc3RyaW5nID0gZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0Lm5hbWVcclxuICAgICAgICBsZXQgdXJsOiBzdHJpbmcgPSBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudXJsXHJcbiAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ2lkJywgaWQpXHJcbiAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ25hbWUnLCBuYW1lKVxyXG4gICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCd1cmwnLCB1cmwpXHJcbiAgICAgICAgd3gubmF2aWdhdGVUbyh7IHVybDogJy9wYWdlcy92aWRlby92aWRlbycgfSlcclxuICAgIH0sXHJcblxyXG4gICAgdGFwSWNvbihlOiB3eC5UYXBFdmVudCkge1xyXG4gICAgICAgIHN3aXRjaCAoZS5jdXJyZW50VGFyZ2V0LmlkKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ+iAg+WLpCc6XHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICBjYXNlICfor5XpopjkvZzkuJonOlxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgY2FzZSAn6K+E5pWZJzpcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIGNhc2UgJ+mFjeWll+i1hOa6kCc6XHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWKoOi9ve+8jOWcqOatpOWkhOWBmumcgOimgeWQjOatpeeahOWIneWni+WMllxyXG4gICAgICovXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgbGV0IGRldGFpbDogQ291cnNlRGV0YWlsSW5mbyB8IG51bGwgPSBudWxsXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgZGV0YWlsID0gd3guZ2V0U3RvcmFnZVN5bmMoJ0NvdXJzZURldGFpbCcpXHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAvLyBUT0RPOiDml6Dlj4LmlbDlpITnkIZcclxuICAgICAgICB9XHJcbiAgICAgICAgLypsZXQgb2JqID0ge1xyXG4gICAgICAgICAgICBjb3Vyc2VJRDogJ3F3MTIzJyxcclxuICAgICAgICAgICAgYWN0aXZlOiBbMiwgMywgNF0sXHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF5T2ZXZWVrOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4T2ZEYXk6IFswLCAxLCAyXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBpbmZvOiB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiAn6auY562J5pWw5a2mJyxcclxuICAgICAgICAgICAgICAgIHRlYWNoZXI6ICfnpZblhrLkuYsnLFxyXG4gICAgICAgICAgICAgICAgbG9jYXRpb246ICdJSUktMTA1J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSovXHJcbiAgICAgICAgLypsZXQgdmlkZW9zID0gW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkYXRlOiAnMjAxOS0xLTEyJyxcclxuICAgICAgICAgICAgICAgIHZpZGVvczogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlkZW9JRDogJ3YwMDEnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnMS7lh73mlbDlj4rlhbbnibnmgKcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1dhdGNoOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZGF0ZTogJzIwMTktMS0xMycsXHJcbiAgICAgICAgICAgICAgICB2aWRlb3M6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZGVvSUQ6ICd2MDAyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJzIu5p6B6ZmQ55qE5qaC5b+144CB5oCn6LSo5ZKM6L+Q566X5rOV5YiZJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNXYXRjaDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZGF0ZTogJzIwMTktMS0xNCcsXHJcbiAgICAgICAgICAgICAgICB2aWRlb3M6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZGVvSUQ6ICd2MDAzJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJzMu5Lik5Liq6YeN6KaB5p6B6ZmQJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNXYXRjaDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWRlb0lEOiAndjAwNCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICc0LuaegemZkOWtmOWcqOWHhuWImScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzV2F0Y2g6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcnXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkYXRlOiAnMjAxOS0xLTE1JyxcclxuICAgICAgICAgICAgICAgIHZpZGVvczogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlkZW9JRDogJ3YwMDUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnNS7ml6DnqbflsI/ph4/lkozml6DnqbflpKfph48nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1dhdGNoOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBpbmZvOiBkZXRhaWwsXHJcbiAgICAgICAgICAgIHZpZGVvTGlzdDogdmlkZW9zXHJcbiAgICAgICAgfSlcclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIGluZm86IGRldGFpbCFcclxuICAgICAgICB9KVxyXG4gICAgICAgIFByb21pc2UuYWxsKFtcclxuICAgICAgICAgICAgdGhpcy5pbml0Q2hlY2tJbihkZXRhaWwhLmNvdXJzZUlEKSxcclxuICAgICAgICAgICAgdGhpcy5pbml0TGl2ZShkZXRhaWwhLmNvdXJzZUlEKSxcclxuICAgICAgICAgICAgdGhpcy5pbml0VmlkZW9zKGRldGFpbCEuY291cnNlSUQpXHJcbiAgICAgICAgXSlcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gVE9ETzog5a6M5oiQ5Yid5aeL5YyW5ZCOXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiDliJ3lp4vljJblh7rplJnlpITnkIZcclxuICAgICAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgYXN5bmMgaW5pdENoZWNrSW4oY291cnNlSUQ6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBjaGVja0luID0gYXdhaXQgbmV3IFByb21pc2U8Y2hlY2tJblJlcz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgIHVybDogYXBwLmdsb2JhbERhdGEuaG9zdE5hbWUgKyAnL2NvdXJzZS9jaGVja19pbicsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbGxlZ2U6IGFwcC5nbG9iYWxEYXRhLmNvbGxlZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcGVyc29uSUQ6IGFwcC5nbG9iYWxEYXRhLnBlcnNvbklELFxyXG4gICAgICAgICAgICAgICAgICAgIGNvdXJzZUlEOiBjb3Vyc2VJRFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ICh7IGRhdGEgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoPGNoZWNrSW5SZXM+ZGF0YSlcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsOiByZWplY3RcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIGlmIChjaGVja0luLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgIGNoZWNrSW46IGNoZWNrSW4ucmVzdWx0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gVE9ETzog6ZSZ6K+v5aSE55CGXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBhc3luYyBpbml0TGl2ZShjb3Vyc2VJRDogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IGxpdmUgPSBhd2FpdCBuZXcgUHJvbWlzZTxsaXZlUmVzPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBhcHAuZ2xvYmFsRGF0YS5ob3N0TmFtZSArICcvY291cnNlL2xpdmVfaW5mbycsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogeyBjb3Vyc2VJRDogY291cnNlSUQgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ICh7IGRhdGEgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoPGxpdmVSZXM+ZGF0YSlcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsOiByZWplY3RcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIGlmIChsaXZlLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgIGlzTGl2ZTogbGl2ZS5yZXN1bHQuaXNMaXZlLFxyXG4gICAgICAgICAgICAgICAgbGl2ZVVybDogbGl2ZS5yZXN1bHQudXJsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gVE9ETzog5aSx6LSl5aSE55CGXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBhc3luYyBpbml0VmlkZW9zKGNvdXJzZUlEOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgbmV3IFByb21pc2U8dmlkZW9zUmVzPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBhcHAuZ2xvYmFsRGF0YS5ob3N0TmFtZSArICcvY291cnNlL3ZpZGVvcycsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogeyBvcGVuaWQ6IGFwcC5nbG9iYWxEYXRhLm9wZW5pZCwgY291cnNlSUQ6IGNvdXJzZUlEIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoeyBkYXRhIH0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKDx2aWRlb3NSZXM+ZGF0YSlcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsOiByZWplY3RcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIGlmIChyZXN1bHQuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgdmlkZW9MaXN0OiByZXN1bHQucmVzdWx0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gVE9ETzog5aSx6LSl5aSE55CGXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KVxyXG4iXX0=