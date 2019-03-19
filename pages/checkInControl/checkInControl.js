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
var dayjs = require("dayjs");
var app = getApp();
Page({
    data: {
        courseID: '',
        list: [],
        isOpen: false,
        loading: false,
        listLoading: true,
        currentTime: '',
        weekNum: ['一', '二', '三', '四', '五', '六', '日']
    },
    onLoad: function () {
        var _this = this;
        this.init()
            .then(function () {
            _this.setData({
                listLoading: false
            });
        })
            .catch(function (reason) {
            console.log(reason);
        });
    },
    toggleState: function (_) {
        if (this.data.isOpen) {
            this.close()
                .then(function () { })
                .catch(function (reason) {
                console.log(reason);
            });
        }
        else {
            this.open()
                .then(function () { })
                .catch(function (reason) {
                console.log(reason);
            });
        }
    },
    deleteItem: function (e) {
        this.delete(e.currentTarget.dataset.time)
            .then(function () { })
            .catch(function (reason) {
            console.log(reason);
        });
    },
    init: function () {
        return __awaiter(this, void 0, void 0, function () {
            var courseInfo, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        courseInfo = null;
                        try {
                            courseInfo = wx.getStorageSync('CourseDetail');
                        }
                        catch (e) {
                        }
                        return [4, new Promise(function (resolve, reject) {
                                wx.request({
                                    url: app.globalData.hostName + '/course/check_in/history',
                                    method: 'GET',
                                    data: { courseID: courseInfo.courseID },
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
                                courseID: courseInfo.courseID,
                                list: result.result
                            });
                        }
                        else {
                        }
                        return [2];
                }
            });
        });
    },
    open: function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, new Promise(function (resolve, reject) {
                            wx.request({
                                url: app.globalData.hostName + '/course/check_in/item',
                                method: 'POST',
                                data: {
                                    courseID: _this.data.courseID,
                                    time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                                    data: {
                                        isOpen: true
                                    }
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
                            this.setData({
                                isOpen: true,
                                currentTime: result.result
                            });
                        }
                        else {
                        }
                        return [2];
                }
            });
        });
    },
    close: function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, new Promise(function (resolve, reject) {
                            wx.request({
                                url: app.globalData.hostName + '/course/check_in/item',
                                method: 'POST',
                                data: {
                                    courseID: _this.data.courseID,
                                    time: _this.data.currentTime,
                                    data: {
                                        isOpen: false
                                    }
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
                        if (!result.success) return [3, 3];
                        this.setData({
                            isOpen: false
                        });
                        return [4, this.init()];
                    case 2:
                        _a.sent();
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    },
    delete: function (time) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, new Promise(function (resolve, reject) {
                            wx.request({
                                url: app.globalData.hostName + '/course/check_in/item',
                                method: 'POST',
                                data: {
                                    courseID: _this.data.courseID,
                                    time: time,
                                    data: null
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
                            this.setData({
                                list: this.data.list.filter(function (value) {
                                    return value.time != time;
                                })
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tJbkNvbnRyb2wuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjaGVja0luQ29udHJvbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS0EsNkJBQStCO0FBRS9CLElBQU0sR0FBRyxHQUFHLE1BQU0sRUFBVSxDQUFBO0FBRTVCLElBQUksQ0FBQztJQUlELElBQUksRUFBRTtRQUNGLFFBQVEsRUFBRSxFQUFFO1FBQ1osSUFBSSxFQUFpQixFQUFFO1FBQ3ZCLE1BQU0sRUFBRSxLQUFLO1FBQ2IsT0FBTyxFQUFFLEtBQUs7UUFDZCxXQUFXLEVBQUUsSUFBSTtRQUNqQixXQUFXLEVBQUUsRUFBRTtRQUNmLE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztLQUMvQztJQUtELE1BQU07UUFBTixpQkFVQztRQVRHLElBQUksQ0FBQyxJQUFJLEVBQUU7YUFDTixJQUFJLENBQUM7WUFDRixLQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNULFdBQVcsRUFBRSxLQUFLO2FBQ3JCLENBQUMsQ0FBQTtRQUNOLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxVQUFDLE1BQU07WUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ3ZCLENBQUMsQ0FBQyxDQUFBO0lBQ1YsQ0FBQztJQUVELFdBQVcsWUFBQyxDQUFjO1FBQ3RCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDbEIsSUFBSSxDQUFDLEtBQUssRUFBRTtpQkFDUCxJQUFJLENBQUMsY0FBTyxDQUFDLENBQUM7aUJBQ2QsS0FBSyxDQUFDLFVBQUMsTUFBTTtnQkFDVixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ3ZCLENBQUMsQ0FBQyxDQUFBO1NBQ1Q7YUFBTTtZQUNI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QUFBO3dCQUNOLENBQUMsQ0FBQyxFQUFBOzt3QkFkRSxNQUFNLEdBQUcsU0FjWDt3QkFDRixJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUU7NEJBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUM7Z0NBQ1QsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFDLEtBQWtCO29DQUMzQyxPQUFPLEtBQUssQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFBO2dDQUM3QixDQUFDLENBQUM7NkJBQ0wsQ0FBQyxDQUFBO3lCQUNMOzZCQUFNO3lCQUVOOzs7OztLQUNKO0NBQ0osQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gcGFnZXMvY2hlY2tJbkNvbnRyb2wvY2hlY2tJbkNvbnRyb2wudHNcclxuaW1wb3J0IHsgSU15QXBwIH0gZnJvbSAnLi4vLi4vYXBwJ1xyXG5pbXBvcnQgeyBDb3Vyc2VEZXRhaWxJbmZvIH0gZnJvbSAnLi4vLi4vdXRpbHMvY291cnNlL0NvdXJzZUluZm8nXHJcbmltcG9ydCB7IGhpc3RvcnlSZXMsIEhpc3RvcnlJdGVtIH0gZnJvbSAnLi4vLi4vdXRpbHMvY291cnNlL2NoZWNrSW4vaGlzdG9yeVJlcydcclxuaW1wb3J0IHsgaXRlbVJlcyB9IGZyb20gJy4uLy4uL3V0aWxzL2NvdXJzZS9jaGVja0luL2l0ZW1SZXMnXHJcbmltcG9ydCBkYXlqcyA9IHJlcXVpcmUoJ2RheWpzJylcclxuXHJcbmNvbnN0IGFwcCA9IGdldEFwcDxJTXlBcHA+KClcclxuXHJcblBhZ2Uoe1xyXG4gICAgLyoqXHJcbiAgICAgKiDpobXpnaLnmoTliJ3lp4vmlbDmja5cclxuICAgICAqL1xyXG4gICAgZGF0YToge1xyXG4gICAgICAgIGNvdXJzZUlEOiAnJyxcclxuICAgICAgICBsaXN0OiA8SGlzdG9yeUl0ZW1bXT5bXSxcclxuICAgICAgICBpc09wZW46IGZhbHNlLFxyXG4gICAgICAgIGxvYWRpbmc6IGZhbHNlLFxyXG4gICAgICAgIGxpc3RMb2FkaW5nOiB0cnVlLFxyXG4gICAgICAgIGN1cnJlbnRUaW1lOiAnJyxcclxuICAgICAgICB3ZWVrTnVtOiBbJ+S4gCcsICfkuownLCAn5LiJJywgJ+WbmycsICfkupQnLCAn5YWtJywgJ+aXpSddXHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliqDovb1cclxuICAgICAqL1xyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMuaW5pdCgpXHJcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdExvYWRpbmc6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKHJlYXNvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVhc29uKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICB0b2dnbGVTdGF0ZShfOiB3eC5UYXBFdmVudCkge1xyXG4gICAgICAgIGlmICh0aGlzLmRhdGEuaXNPcGVuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge30pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goKHJlYXNvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlYXNvbilcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5vcGVuKClcclxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHt9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKChyZWFzb24pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZWFzb24pXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZGVsZXRlSXRlbShlOiB3eC5UYXBFdmVudCkge1xyXG4gICAgICAgIHRoaXMuZGVsZXRlKGUuY3VycmVudFRhcmdldC5kYXRhc2V0LnRpbWUpXHJcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHt9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKHJlYXNvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVhc29uKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBhc3luYyBpbml0KCkge1xyXG4gICAgICAgIGxldCBjb3Vyc2VJbmZvOiBDb3Vyc2VEZXRhaWxJbmZvIHwgbnVsbCA9IG51bGxcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb3Vyc2VJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ0NvdXJzZURldGFpbCcpXHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAvLyBUT0RPOlxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgbmV3IFByb21pc2U8aGlzdG9yeVJlcz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgIHVybDogYXBwLmdsb2JhbERhdGEuaG9zdE5hbWUgKyAnL2NvdXJzZS9jaGVja19pbi9oaXN0b3J5JyxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7IGNvdXJzZUlEOiBjb3Vyc2VJbmZvIS5jb3Vyc2VJRCB9LFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHsgZGF0YSB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSg8aGlzdG9yeVJlcz5kYXRhKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6IHJlamVjdFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaWYgKHJlc3VsdC5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICBjb3Vyc2VJRDogY291cnNlSW5mbyEuY291cnNlSUQsXHJcbiAgICAgICAgICAgICAgICBsaXN0OiByZXN1bHQucmVzdWx0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy9UT0RPOlxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgYXN5bmMgb3BlbigpIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgbmV3IFByb21pc2U8aXRlbVJlcz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgIHVybDogYXBwLmdsb2JhbERhdGEuaG9zdE5hbWUgKyAnL2NvdXJzZS9jaGVja19pbi9pdGVtJyxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdXJzZUlEOiB0aGlzLmRhdGEuY291cnNlSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgdGltZTogZGF5anMoKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzT3BlbjogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoeyBkYXRhIH0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKDxpdGVtUmVzPmRhdGEpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogcmVqZWN0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgIGlzT3BlbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRUaW1lOiByZXN1bHQucmVzdWx0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8vIFRPRE86IOWPjemmiFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIFRPRE86XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBhc3luYyBjbG9zZSgpIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgbmV3IFByb21pc2U8aXRlbVJlcz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgIHVybDogYXBwLmdsb2JhbERhdGEuaG9zdE5hbWUgKyAnL2NvdXJzZS9jaGVja19pbi9pdGVtJyxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdXJzZUlEOiB0aGlzLmRhdGEuY291cnNlSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgdGltZTogdGhpcy5kYXRhLmN1cnJlbnRUaW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNPcGVuOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoeyBkYXRhIH0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKDxpdGVtUmVzPmRhdGEpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogcmVqZWN0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgIGlzT3BlbjogZmFsc2VcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5pbml0KClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBUT0RPOlxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgYXN5bmMgZGVsZXRlKHRpbWU6IHN0cmluZykge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCBuZXcgUHJvbWlzZTxpdGVtUmVzPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBhcHAuZ2xvYmFsRGF0YS5ob3N0TmFtZSArICcvY291cnNlL2NoZWNrX2luL2l0ZW0nLFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY291cnNlSUQ6IHRoaXMuZGF0YS5jb3Vyc2VJRCxcclxuICAgICAgICAgICAgICAgICAgICB0aW1lOiB0aW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IG51bGxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoeyBkYXRhIH0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKDxpdGVtUmVzPmRhdGEpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogcmVqZWN0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgIGxpc3Q6IHRoaXMuZGF0YS5saXN0LmZpbHRlcigodmFsdWU6IEhpc3RvcnlJdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlLnRpbWUgIT0gdGltZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBUT0RPOlxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSlcclxuIl19