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
                        if (result.success) {
                        }
                        else {
                        }
                        return [2];
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
                        }
                        else {
                        }
                        return [2];
                }
            });
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tJbkNvbnRyb2wuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjaGVja0luQ29udHJvbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS0EsNkJBQStCO0FBRS9CLElBQU0sR0FBRyxHQUFHLE1BQU0sRUFBVSxDQUFBO0FBRTVCLElBQUksQ0FBQztJQUlELElBQUksRUFBRTtRQUNGLFFBQVEsRUFBRSxFQUFFO1FBQ1osSUFBSSxFQUFpQixFQUFFO1FBQ3ZCLE1BQU0sRUFBRSxLQUFLO1FBQ2IsT0FBTyxFQUFFLEtBQUs7UUFDZCxXQUFXLEVBQUUsSUFBSTtRQUNqQixXQUFXLEVBQUUsRUFBRTtRQUNmLE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztLQUMvQztJQUtELE1BQU07UUFBTixpQkFVQztRQVRHLElBQUksQ0FBQyxJQUFJLEVBQUU7YUFDTixJQUFJLENBQUM7WUFDRixLQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNULFdBQVcsRUFBRSxLQUFLO2FBQ3JCLENBQUMsQ0FBQTtRQUNOLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxVQUFDLE1BQU07WUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ3ZCLENBQUMsQ0FBQyxDQUFBO0lBQ1YsQ0FBQztJQUVELFdBQVcsWUFBQyxDQUFjO1FBQ3RCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDbEIsSUFBSSxDQUFDLEtBQUssRUFBRTtpQkFDUCxJQUFJLENBQUMsY0FBTyxDQUFDLENBQUM7aUJBQ2QsS0FBSyxDQUFDLFVBQUMsTUFBTTtnQkFDVixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ3ZCLENBQUMsQ0FBQyxDQUFBO1NBQ1Q7YUFBTTtZQUNI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cnQgeyBJTXlBcHAgfSBmcm9tICcuLi8uLi9hcHAnXHJcbmltcG9ydCB7IENvdXJzZURldGFpbEluZm8gfSBmcm9tICcuLi8uLi91dGlscy9jb3Vyc2UvQ291cnNlSW5mbydcclxuaW1wb3J0IHsgaGlzdG9yeVJlcywgSGlzdG9yeUl0ZW0gfSBmcm9tICcuLi8uLi91dGlscy9jb3Vyc2UvY2hlY2tJbi9oaXN0b3J5UmVzJ1xyXG5pbXBvcnQgeyBpdGVtUmVzIH0gZnJvbSAnLi4vLi4vdXRpbHMvY291cnNlL2NoZWNrSW4vaXRlbVJlcydcclxuaW1wb3J0IGRheWpzID0gcmVxdWlyZSgnZGF5anMnKVxyXG5cclxuY29uc3QgYXBwID0gZ2V0QXBwPElNeUFwcD4oKVxyXG5cclxuUGFnZSh7XHJcbiAgICAvKipcclxuICAgICAqIOmhtemdoueahOWIneWni+aVsOaNrlxyXG4gICAgICovXHJcbiAgICBkYXRhOiB7XHJcbiAgICAgICAgY291cnNlSUQ6ICcnLFxyXG4gICAgICAgIGxpc3Q6IDxIaXN0b3J5SXRlbVtdPltdLFxyXG4gICAgICAgIGlzT3BlbjogZmFsc2UsXHJcbiAgICAgICAgbG9hZGluZzogZmFsc2UsXHJcbiAgICAgICAgbGlzdExvYWRpbmc6IHRydWUsXHJcbiAgICAgICAgY3VycmVudFRpbWU6ICcnLFxyXG4gICAgICAgIHdlZWtOdW06IFsn5LiAJywgJ+S6jCcsICfkuIknLCAn5ZubJywgJ+S6lCcsICflha0nLCAn5pelJ11cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWKoOi9vVxyXG4gICAgICovXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5pbml0KClcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgICAgICBsaXN0TG9hZGluZzogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCgocmVhc29uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZWFzb24pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIHRvZ2dsZVN0YXRlKF86IHd4LlRhcEV2ZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGF0YS5pc09wZW4pIHtcclxuICAgICAgICAgICAgdGhpcy5jbG9zZSgpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7fSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaCgocmVhc29uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVhc29uKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm9wZW4oKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge30pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goKHJlYXNvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlYXNvbilcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBkZWxldGVJdGVtKGU6IHd4LlRhcEV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5kZWxldGUoZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudGltZSlcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge30pXHJcbiAgICAgICAgICAgIC5jYXRjaCgocmVhc29uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZWFzb24pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGFzeW5jIGluaXQoKSB7XHJcbiAgICAgICAgbGV0IGNvdXJzZUluZm86IENvdXJzZURldGFpbEluZm8gfCBudWxsID0gbnVsbFxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvdXJzZUluZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnQ291cnNlRGV0YWlsJylcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIC8vIFRPRE86XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCBuZXcgUHJvbWlzZTxoaXN0b3J5UmVzPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBhcHAuZ2xvYmFsRGF0YS5ob3N0TmFtZSArICcvY291cnNlL2NoZWNrX2luL2hpc3RvcnknLFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHsgY291cnNlSUQ6IGNvdXJzZUluZm8hLmNvdXJzZUlEIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoeyBkYXRhIH0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKDxoaXN0b3J5UmVzPmRhdGEpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogcmVqZWN0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgIGNvdXJzZUlEOiBjb3Vyc2VJbmZvIS5jb3Vyc2VJRCxcclxuICAgICAgICAgICAgICAgIGxpc3Q6IHJlc3VsdC5yZXN1bHRcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL1RPRE86XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBhc3luYyBvcGVuKCkge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCBuZXcgUHJvbWlzZTxpdGVtUmVzPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBhcHAuZ2xvYmFsRGF0YS5ob3N0TmFtZSArICcvY291cnNlL2NoZWNrX2luL2l0ZW0nLFxyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdXJzZUlEOiB0aGlzLmRhdGEuY291cnNlSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgdGltZTogZGF5anMoKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzT3BlbjogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoeyBkYXRhIH0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKDxpdGVtUmVzPmRhdGEpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogcmVqZWN0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRUaW1lOiByZXN1bHQucmVzdWx0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8vIFRPRE86IOWPjemmiFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIFRPRE86XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBhc3luYyBjbG9zZSgpIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgbmV3IFByb21pc2U8aXRlbVJlcz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgIHVybDogYXBwLmdsb2JhbERhdGEuaG9zdE5hbWUgKyAnL2NvdXJzZS9jaGVja19pbi9pdGVtJyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICBjb3Vyc2VJRDogdGhpcy5kYXRhLmNvdXJzZUlELFxyXG4gICAgICAgICAgICAgICAgICAgIHRpbWU6IHRoaXMuZGF0YS5jdXJyZW50VGltZSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzT3BlbjogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHsgZGF0YSB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSg8aXRlbVJlcz5kYXRhKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6IHJlamVjdFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaWYgKHJlc3VsdC5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IOWIt+aWsGxpc3RcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBUT0RPOlxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgYXN5bmMgZGVsZXRlKHRpbWU6IHN0cmluZykge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCBuZXcgUHJvbWlzZTxpdGVtUmVzPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBhcHAuZ2xvYmFsRGF0YS5ob3N0TmFtZSArICcvY291cnNlL2NoZWNrX2luL2l0ZW0nLFxyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdXJzZUlEOiB0aGlzLmRhdGEuY291cnNlSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgdGltZTogdGltZSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBudWxsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHsgZGF0YSB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSg8aXRlbVJlcz5kYXRhKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6IHJlamVjdFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaWYgKHJlc3VsdC5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IOWIt+aWsGxpc3RcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBUT0RPOlxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSlcclxuIl19