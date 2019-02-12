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
        loading: true,
        TabCur: (dayjs().day() + 6) % 7,
        scrollLeft: 0,
        obj: [],
        scheduleDay: [],
        numOfWeek: 0,
        weekNum: ['一', '二', '三', '四', '五', '六', '日'],
        toggleDelay: false
    },
    tabSelect: function (e) {
        this.setData({
            TabCur: e.currentTarget.dataset.id,
            scrollLeft: (e.currentTarget.dataset.id - 1) * 60
        });
        this.showCourses();
    },
    toggleDelay: function () {
        var that = this;
        this.setData({
            toggleDelay: true
        });
        setTimeout(function () {
            that.setData({
                toggleDelay: false
            });
        }, 1000);
    },
    onLoad: function () {
        var _this = this;
        Promise.all([this.courseSchedule(), this.weekInfo()])
            .then(function () {
            _this.showCourses();
            _this.toggleDelay();
        })
            .catch(function (reason) {
            console.log(reason);
        });
    },
    showCourses: function () {
        var _this = this;
        this.setData({
            obj: this.data.scheduleDay
                .reduce(function (arr, item) {
                for (var _i = 0, _a = item.position; _i < _a.length; _i++) {
                    var pos = _a[_i];
                    if (pos.dayOfWeek == _this.data.TabCur) {
                        var result = JSON.parse(JSON.stringify(item));
                        result.position = [pos];
                        arr.push(result);
                    }
                }
                return arr;
            }, [])
                .filter(function (item) {
                for (var _i = 0, _a = item.position; _i < _a.length; _i++) {
                    var pos = _a[_i];
                    if (pos.dayOfWeek == _this.data.TabCur) {
                        return item.active.indexOf(_this.data.numOfWeek) != -1;
                    }
                }
                return false;
            })
        });
    },
    weekInfo: function () {
        return __awaiter(this, void 0, void 0, function () {
            var info;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, new Promise(function (resolve, reject) {
                            wx.request({
                                url: app.globalData.hostName + '/global/week_info',
                                method: 'GET',
                                data: {
                                    college: app.globalData.college,
                                    personID: app.globalData.personID,
                                    date: dayjs().format('YYYY-MM-DD')
                                },
                                success: function (_a) {
                                    var data = _a.data;
                                    resolve(data);
                                },
                                fail: reject
                            });
                        })];
                    case 1:
                        info = _a.sent();
                        if (info.success) {
                            this.setData({
                                numOfWeek: info.result.numOfWeek
                            });
                        }
                        else {
                        }
                        return [2];
                }
            });
        });
    },
    courseSchedule: function () {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, new Promise(function (resolve, reject) {
                            wx.request({
                                url: app.globalData.hostName + '/course/courses',
                                method: 'GET',
                                data: {
                                    college: app.globalData.college,
                                    personID: app.globalData.personID
                                },
                                success: function (_a) {
                                    var data = _a.data;
                                    resolve(data);
                                },
                                fail: reject
                            });
                        })];
                    case 1:
                        res = _a.sent();
                        if (res.success) {
                            this.setData({
                                scheduleDay: res.result,
                                loading: false
                            });
                        }
                        else {
                            this.setData({
                                loading: false
                            });
                        }
                        return [2];
                }
            });
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291cnNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY291cnNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQSw2QkFBK0I7QUFFL0IsSUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFVLENBQUE7QUFFNUIsSUFBSSxDQUFDO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsT0FBTyxFQUFFLElBQUk7UUFDYixNQUFNLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQy9CLFVBQVUsRUFBRSxDQUFDO1FBQ2IsR0FBRyxFQUFnQixFQUFFO1FBQ3JCLFdBQVcsRUFBZ0IsRUFBRTtRQUM3QixTQUFTLEVBQUUsQ0FBQztRQUNaLE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztRQUM1QyxXQUFXLEVBQUUsS0FBSztLQUNyQjtJQUNELFNBQVMsWUFBQyxDQUFjO1FBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDVCxNQUFNLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNsQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRTtTQUNwRCxDQUFDLENBQUE7UUFDRixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUE7SUFDdEIsQ0FBQztJQUNELFdBQVc7UUFDUCxJQUFNLElBQUksR0FBRyxJQUFJLENBQUE7UUFDakIsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNULFdBQVcsRUFBRSxJQUFJO1NBQ3BCLENBQUMsQ0FBQTtRQUNGLFVBQVUsQ0FBQztZQUNQLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1QsV0FBVyxFQUFFLEtBQUs7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eUJBQ0w7NkJBQU07eUJBRU47Ozs7O0tBQ0o7SUFDSyxjQUFjOzs7Ozs0QkFDTixXQUFNLElBQUksT0FBTyxDQUFjLFVBQUMsT0FBTyxFQUFFLE1BQU07NEJBQ3JELEVBQUUsQ0FBQyxPQUFPLENBQUM7Z0NBQ1AsR0FBRyxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxHQUFHLGlCQUFpQjtnQ0FDaEQsTUFBTSxFQUFFLEtBQUs7Z0NBQ2IsSUFBSSxFQUFFO29DQUNGLE9BQU8sRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLE9BQU87b0NBQy9CLFFBQVEsRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVE7aUNBQ3BDO2dDQUNELE9BQU8sRUFBRSxVQUFDLEVBQVE7d0NBQU4sY0FBSTtvQ0FDWixPQUFPLENBQWMsSUFBSSxDQUFDLENBQUE7Z0NBQzlCLENBQUM7Z0NBQ0QsSUFBSSxFQUFFLE1BQU07NkJBQ2YsQ0FBQyxDQUFBO3dCQUNOLENBQUMsQ0FBQyxFQUFBOzt3QkFiRSxHQUFHLEdBQUcsU0FhUjt3QkFDRixJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUU7NEJBQ2IsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQ0FDVCxXQUFXLEVBQUUsR0FBRyxDQUFDLE1BQU07Z0NBQ3ZCLE9BQU8sRUFBRSxLQUFLOzZCQUNqQixDQUFDLENBQUE7eUJBQ0w7NkJBQU07NEJBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQ0FDVCxPQUFPLEVBQUUsS0FBSzs2QkFDakIsQ0FBQyxDQUFBO3lCQUVMOzs7OztLQUVKO0NBQ0osQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSU15QXBwIH0gZnJvbSAnLi4vLi4vYXBwJ1xyXG5pbXBvcnQgeyB3ZWVrSW5mb1JlcyB9IGZyb20gJy4uLy4uL3V0aWxzL2dsb2JhbFJlcydcclxuaW1wb3J0IHsgQ291cnNlSXRlbSwgc2NoZWR1bGVSZXMgfSBmcm9tICcuLi8uLi91dGlscy9jb3Vyc2UvY291cnNlUmVzJ1xyXG5pbXBvcnQgZGF5anMgPSByZXF1aXJlKCdkYXlqcycpXHJcblxyXG5jb25zdCBhcHAgPSBnZXRBcHA8SU15QXBwPigpXHJcblxyXG5QYWdlKHtcclxuICAgIGRhdGE6IHtcclxuICAgICAgICBsb2FkaW5nOiB0cnVlLFxyXG4gICAgICAgIFRhYkN1cjogKGRheWpzKCkuZGF5KCkgKyA2KSAlIDcsXHJcbiAgICAgICAgc2Nyb2xsTGVmdDogMCxcclxuICAgICAgICBvYmo6IDxDb3Vyc2VJdGVtW10+W10sXHJcbiAgICAgICAgc2NoZWR1bGVEYXk6IDxDb3Vyc2VJdGVtW10+W10sXHJcbiAgICAgICAgbnVtT2ZXZWVrOiAwLFxyXG4gICAgICAgIHdlZWtOdW06IFsn5LiAJywgJ+S6jCcsICfkuIknLCAn5ZubJywgJ+S6lCcsICflha0nLCAn5pelJ10sXHJcbiAgICAgICAgdG9nZ2xlRGVsYXk6IGZhbHNlXHJcbiAgICB9LFxyXG4gICAgdGFiU2VsZWN0KGU6IHd4LlRhcEV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgVGFiQ3VyOiBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZCxcclxuICAgICAgICAgICAgc2Nyb2xsTGVmdDogKGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkIC0gMSkgKiA2MFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5zaG93Q291cnNlcygpXHJcbiAgICB9LFxyXG4gICAgdG9nZ2xlRGVsYXkoKSB7XHJcbiAgICAgICAgY29uc3QgdGhhdCA9IHRoaXNcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICB0b2dnbGVEZWxheTogdHJ1ZVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGhhdC5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgIHRvZ2dsZURlbGF5OiBmYWxzZVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sIDEwMDApXHJcbiAgICB9LFxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIC8qbGV0IHNjaCA9IFtdXHJcbiAgICAgICAgc2NoLnB1c2goXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvdXJzZUlEOiAncXcxMjMnLFxyXG4gICAgICAgICAgICAgICAgYWN0aXZlOiBbMiwgMywgNF0sXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF5T2ZXZWVrOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleE9mRGF5OiBbMCwgMSwgMl1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgaW5mbzoge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICfpq5jnrYnmlbDlraYnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRlYWNoZXI6ICfnpZblhrLkuYsnLFxyXG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAnSUlJLTEwNSdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY291cnNlSUQ6ICdxdzEyNCcsXHJcbiAgICAgICAgICAgICAgICBhY3RpdmU6IFsyLCAzLCA0XSxcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXlPZldlZWs6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4T2ZEYXk6IFszLCA0XVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICBpbmZvOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ+avm+azveS4nOaAneaDs+S4juS4reWbveeJueiJsuekvuS8muS4u+S5ieeQhuiuuuS9k+ezu+amguiuuicsXHJcbiAgICAgICAgICAgICAgICAgICAgdGVhY2hlcjogJ+WGr+WPi+WFsMK36IyF5Lul5Y2HJyxcclxuICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbjogJ0lWLUMxMDgnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvdXJzZUlEOiAncXcxMjUnLFxyXG4gICAgICAgICAgICAgICAgYWN0aXZlOiBbMiwgMywgNF0sXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF5T2ZXZWVrOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleE9mRGF5OiBbMCwgMSwgMl1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgaW5mbzoge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICforqHnrpfmnLrnu4TmiJDljp/nkIYnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRlYWNoZXI6ICfkvq/mjbcnLFxyXG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAnSS0yMDUnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICAgICAgbGV0IHdlZWsgPSAyXHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgc2NoZWR1bGVEYXk6IHNjaCxcclxuICAgICAgICAgICAgbnVtT2ZXZWVrOiB3ZWVrLFxyXG4gICAgICAgICAgICBsb2FkaW5nOiBmYWxzZVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5zaG93Q291cnNlcygpXHJcbiAgICAgICAgdGhpcy50b2dnbGVEZWxheSgpXHJcbiAgICAgICAgKi9cclxuICAgICAgICBQcm9taXNlLmFsbChbdGhpcy5jb3Vyc2VTY2hlZHVsZSgpLCB0aGlzLndlZWtJbmZvKCldKVxyXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dDb3Vyc2VzKClcclxuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlRGVsYXkoKVxyXG4gICAgICAgICAgICAgICAgLy8gVE9ET+aVsOaNrue7keWumuWIsHRoaXNcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKChyZWFzb24pID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlYXNvbilcclxuICAgICAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBzaG93Q291cnNlcygpIHtcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBvYmo6IHRoaXMuZGF0YS5zY2hlZHVsZURheVxyXG4gICAgICAgICAgICAgICAgLnJlZHVjZSgoYXJyOiBDb3Vyc2VJdGVtW10sIGl0ZW06IENvdXJzZUl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBwb3Mgb2YgaXRlbS5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocG9zLmRheU9mV2VlayA9PSB0aGlzLmRhdGEuVGFiQ3VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0OiBDb3Vyc2VJdGVtID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShpdGVtKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wb3NpdGlvbiA9IFtwb3NdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnIucHVzaChyZXN1bHQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFyclxyXG4gICAgICAgICAgICAgICAgfSwgW10pXHJcbiAgICAgICAgICAgICAgICAuZmlsdGVyKChpdGVtOiBDb3Vyc2VJdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgcG9zIG9mIGl0ZW0ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBvcy5kYXlPZldlZWsgPT0gdGhpcy5kYXRhLlRhYkN1cikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uYWN0aXZlLmluZGV4T2YodGhpcy5kYXRhLm51bU9mV2VlaykgIT0gLTFcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBhc3luYyB3ZWVrSW5mbygpIHtcclxuICAgICAgICBsZXQgaW5mbyA9IGF3YWl0IG5ldyBQcm9taXNlPHdlZWtJbmZvUmVzPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBhcHAuZ2xvYmFsRGF0YS5ob3N0TmFtZSArICcvZ2xvYmFsL3dlZWtfaW5mbycsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbGxlZ2U6IGFwcC5nbG9iYWxEYXRhLmNvbGxlZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcGVyc29uSUQ6IGFwcC5nbG9iYWxEYXRhLnBlcnNvbklELFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGU6IGRheWpzKCkuZm9ybWF0KCdZWVlZLU1NLUREJylcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoeyBkYXRhIH0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKDx3ZWVrSW5mb1Jlcz5kYXRhKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6IHJlamVjdFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaWYgKGluZm8uc3VjY2Vzcykge1xyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgbnVtT2ZXZWVrOiBpbmZvLnJlc3VsdC5udW1PZldlZWtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBUT0RPOiDlpLHotKXlpITnkIZcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgYXN5bmMgY291cnNlU2NoZWR1bGUoKSB7XHJcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IG5ldyBQcm9taXNlPHNjaGVkdWxlUmVzPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBhcHAuZ2xvYmFsRGF0YS5ob3N0TmFtZSArICcvY291cnNlL2NvdXJzZXMnLFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICBjb2xsZWdlOiBhcHAuZ2xvYmFsRGF0YS5jb2xsZWdlLFxyXG4gICAgICAgICAgICAgICAgICAgIHBlcnNvbklEOiBhcHAuZ2xvYmFsRGF0YS5wZXJzb25JRFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ICh7IGRhdGEgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoPHNjaGVkdWxlUmVzPmRhdGEpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogcmVqZWN0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZiAocmVzLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgIHNjaGVkdWxlRGF5OiByZXMucmVzdWx0LFxyXG4gICAgICAgICAgICAgICAgbG9hZGluZzogZmFsc2VcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgbG9hZGluZzogZmFsc2VcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLy8gVE9ETzog5aSx6LSl5aSE55CGXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vcmV0dXJuIHJlcy5zdWNjZXNzXHJcbiAgICB9XHJcbn0pXHJcbiJdfQ==