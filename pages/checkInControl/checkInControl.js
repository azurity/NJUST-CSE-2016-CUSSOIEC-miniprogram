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
        list: [
            {
                time: '2019-02-20 12:03:23',
                count: 28
            }
        ],
        isOpen: false,
        loading: false,
        listLoading: false,
        currentTime: '',
        weekNum: ['一', '二', '三', '四', '五', '六', '日']
    },
    onLoad: function () {
        console.log(this.data.list);
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
        this.delete(e.currentTarget.dataset.index)
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
                    case 0:
                        console.log(time);
                        return [2];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tJbkNvbnRyb2wuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjaGVja0luQ29udHJvbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS0EsNkJBQStCO0FBRS9CLElBQU0sR0FBRyxHQUFHLE1BQU0sRUFBVSxDQUFBO0FBRTVCLElBQUksQ0FBQztJQUlELElBQUksRUFBRTtRQUNGLFFBQVEsRUFBRSxFQUFFO1FBQ1osSUFBSSxFQUFpQjtZQUNqQjtnQkFDSSxJQUFJLEVBQUUscUJBQXFCO2dCQUMzQixLQUFLLEVBQUUsRUFBRTthQUNaO1NBQ0o7UUFDRCxNQUFNLEVBQUUsS0FBSztRQUNiLE9BQU8sRUFBRSxLQUFLO1FBQ2QsV0FBVyxFQUFFLEtBQUs7UUFDbEIsV0FBVyxFQUFFLEVBQUU7UUFDZixPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7S0FDL0M7SUFLRCxNQUFNO1FBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBVS9CLENBQUM7SUFFRCxXQUFXLFlBQUMsQ0FBYztRQUN0QixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxLQUFLLEVBQUU7aUJBQ1AsSUFBSSxDQUFDLGNBQU8sQ0FBQyxDQUFDO2lCQUNkLEtBQUssQ0FBQyxVQUFDLE1BQU07Z0JBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUN2QixDQUFDLENBQUMsQ0FBQTtTQUNUO2FBQU07WUFDSCxJQUFJLENBQUMsSUFBSSxFQUFFO2lCQUNOLElBQUksQ0FBQyxjQUFPLENBQUMsQ0FBQztpQkFDZCxLQUFLLENBQUMsVUFBQyxNQUFNO2dCQUNWLE9BQU8sQ0FBQyxHQUFH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QUFFLEtBQUs7cUNBQ2hCO2lDQUNKO2dDQUNELE9BQU8sRUFBRSxVQUFDLEVBQVE7d0NBQU4sY0FBSTtvQ0FDWixPQUFPLENBQVUsSUFBSSxDQUFDLENBQUE7Z0NBQzFCLENBQUM7Z0NBQ0QsSUFBSSxFQUFFLE1BQU07NkJBQ2YsQ0FBQyxDQUFBO3dCQUNOLENBQUMsQ0FBQyxFQUFBOzt3QkFmRSxNQUFNLEdBQUcsU0FlWDt3QkFDRixJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUU7eUJBRW5COzZCQUFNO3lCQUVOOzs7OztLQUNKO0lBRUssTUFBTSxZQUFDLElBQVk7Ozs7Ozs7d0JBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7d0JBQ2pCLFdBQU07O3dCQUNGLE1BQU0sR0FBRyxTQWFYO3dCQUNGLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRTt5QkFFbkI7NkJBQU07eUJBRU47Ozs7O0tBQ0o7Q0FDSixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBwYWdlcy9jaGVja0luQ29udHJvbC9jaGVja0luQ29udHJvbC50c1xyXG5pbXBvcnQgeyBJTXlBcHAgfSBmcm9tICcuLi8uLi9hcHAnXHJcbmltcG9ydCB7IENvdXJzZURldGFpbEluZm8gfSBmcm9tICcuLi8uLi91dGlscy9jb3Vyc2UvQ291cnNlSW5mbydcclxuaW1wb3J0IHsgaGlzdG9yeVJlcywgSGlzdG9yeUl0ZW0gfSBmcm9tICcuLi8uLi91dGlscy9jb3Vyc2UvY2hlY2tJbi9oaXN0b3J5UmVzJ1xyXG5pbXBvcnQgeyBpdGVtUmVzIH0gZnJvbSAnLi4vLi4vdXRpbHMvY291cnNlL2NoZWNrSW4vaXRlbVJlcydcclxuaW1wb3J0IGRheWpzID0gcmVxdWlyZSgnZGF5anMnKVxyXG5cclxuY29uc3QgYXBwID0gZ2V0QXBwPElNeUFwcD4oKVxyXG5cclxuUGFnZSh7XHJcbiAgICAvKipcclxuICAgICAqIOmhtemdoueahOWIneWni+aVsOaNrlxyXG4gICAgICovXHJcbiAgICBkYXRhOiB7XHJcbiAgICAgICAgY291cnNlSUQ6ICcnLFxyXG4gICAgICAgIGxpc3Q6IDxIaXN0b3J5SXRlbVtdPltcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGltZTogJzIwMTktMDItMjAgMTI6MDM6MjMnLFxyXG4gICAgICAgICAgICAgICAgY291bnQ6IDI4XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdLFxyXG4gICAgICAgIGlzT3BlbjogZmFsc2UsXHJcbiAgICAgICAgbG9hZGluZzogZmFsc2UsXHJcbiAgICAgICAgbGlzdExvYWRpbmc6IGZhbHNlLFxyXG4gICAgICAgIGN1cnJlbnRUaW1lOiAnJyxcclxuICAgICAgICB3ZWVrTnVtOiBbJ+S4gCcsICfkuownLCAn5LiJJywgJ+WbmycsICfkupQnLCAn5YWtJywgJ+aXpSddXHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliqDovb1cclxuICAgICAqL1xyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGF0YS5saXN0KVxyXG4gICAgICAgIC8qdGhpcy5pbml0KClcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgICAgICBsaXN0TG9hZGluZzogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCgocmVhc29uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZWFzb24pXHJcbiAgICAgICAgICAgIH0pKi9cclxuICAgIH0sXHJcblxyXG4gICAgdG9nZ2xlU3RhdGUoXzogd3guVGFwRXZlbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5kYXRhLmlzT3Blbikge1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlKClcclxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHt9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKChyZWFzb24pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZWFzb24pXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMub3BlbigpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7fSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaCgocmVhc29uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVhc29uKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGRlbGV0ZUl0ZW0oZTogd3guVGFwRXZlbnQpIHtcclxuICAgICAgICB0aGlzLmRlbGV0ZShlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pbmRleClcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge30pXHJcbiAgICAgICAgICAgIC5jYXRjaCgocmVhc29uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZWFzb24pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGFzeW5jIGluaXQoKSB7XHJcbiAgICAgICAgbGV0IGNvdXJzZUluZm86IENvdXJzZURldGFpbEluZm8gfCBudWxsID0gbnVsbFxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvdXJzZUluZm8gPSB3eC5nZXRTdG9yYWdlU3luYygnQ291cnNlRGV0YWlsJylcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIC8vIFRPRE86XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCBuZXcgUHJvbWlzZTxoaXN0b3J5UmVzPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBhcHAuZ2xvYmFsRGF0YS5ob3N0TmFtZSArICcvY291cnNlL2NoZWNrX2luL2hpc3RvcnknLFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHsgY291cnNlSUQ6IGNvdXJzZUluZm8hLmNvdXJzZUlEIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoeyBkYXRhIH0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKDxoaXN0b3J5UmVzPmRhdGEpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogcmVqZWN0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgIGNvdXJzZUlEOiBjb3Vyc2VJbmZvIS5jb3Vyc2VJRCxcclxuICAgICAgICAgICAgICAgIGxpc3Q6IHJlc3VsdC5yZXN1bHRcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL1RPRE86XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBhc3luYyBvcGVuKCkge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCBuZXcgUHJvbWlzZTxpdGVtUmVzPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBhcHAuZ2xvYmFsRGF0YS5ob3N0TmFtZSArICcvY291cnNlL2NoZWNrX2luL2l0ZW0nLFxyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdXJzZUlEOiB0aGlzLmRhdGEuY291cnNlSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgdGltZTogZGF5anMoKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzT3BlbjogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoeyBkYXRhIH0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKDxpdGVtUmVzPmRhdGEpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogcmVqZWN0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRUaW1lOiByZXN1bHQucmVzdWx0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8vIFRPRE86IOWPjemmiFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIFRPRE86XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBhc3luYyBjbG9zZSgpIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgbmV3IFByb21pc2U8aXRlbVJlcz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgIHVybDogYXBwLmdsb2JhbERhdGEuaG9zdE5hbWUgKyAnL2NvdXJzZS9jaGVja19pbi9pdGVtJyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICBjb3Vyc2VJRDogdGhpcy5kYXRhLmNvdXJzZUlELFxyXG4gICAgICAgICAgICAgICAgICAgIHRpbWU6IHRoaXMuZGF0YS5jdXJyZW50VGltZSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzT3BlbjogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHsgZGF0YSB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSg8aXRlbVJlcz5kYXRhKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6IHJlamVjdFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaWYgKHJlc3VsdC5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IOWIt+aWsGxpc3RcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBUT0RPOlxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgYXN5bmMgZGVsZXRlKHRpbWU6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRpbWUpXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IG5ldyBQcm9taXNlPGl0ZW1SZXM+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgd3gucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IGFwcC5nbG9iYWxEYXRhLmhvc3ROYW1lICsgJy9jb3Vyc2UvY2hlY2tfaW4vaXRlbScsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY291cnNlSUQ6IHRoaXMuZGF0YS5jb3Vyc2VJRCxcclxuICAgICAgICAgICAgICAgICAgICB0aW1lOiB0aW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IG51bGxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoeyBkYXRhIH0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKDxpdGVtUmVzPmRhdGEpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogcmVqZWN0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgLy8gVE9ETzog5Yi35pawbGlzdFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIFRPRE86XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KVxyXG4iXX0=