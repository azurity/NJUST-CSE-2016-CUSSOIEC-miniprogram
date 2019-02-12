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
        console.log(e);
        console.log(this.data.scheduleDay);
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
        var sch = [];
        sch.push({
            courseID: 'qw123',
            active: [2, 3, 4],
            position: [
                {
                    dayOfWeek: 0,
                    indexOfDay: [0, 1, 2]
                }
            ],
            info: {
                name: '高等数学',
                teacher: '祖冲之',
                location: 'III-105'
            }
        }, {
            courseID: 'qw124',
            active: [2, 3, 4],
            position: [
                {
                    dayOfWeek: 0,
                    indexOfDay: [3, 4]
                }
            ],
            info: {
                name: '毛泽东思想与中国特色社会主义理论体系概论',
                teacher: '冯友兰·茅以升',
                location: 'IV-C108'
            }
        }, {
            courseID: 'qw125',
            active: [2, 3, 4],
            position: [
                {
                    dayOfWeek: 1,
                    indexOfDay: [0, 1, 2]
                }
            ],
            info: {
                name: '计算机组成原理',
                teacher: '侯捷',
                location: 'I-205'
            }
        });
        var week = 2;
        this.setData({
            scheduleDay: sch,
            numOfWeek: week,
            loading: false
        });
        this.showCourses();
        this.toggleDelay();
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
    courseSchedule: function () {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, new Promise(function (resolve, reject) {
                            wx.request({
                                url: app.globalData.hostName + '/course/courses',
                                method: 'POST',
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
                        return [2, res.success];
                }
            });
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291cnNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY291cnNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSw2QkFBK0I7QUFFL0IsSUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFVLENBQUE7QUFFNUIsSUFBSSxDQUFDO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsT0FBTyxFQUFFLElBQUk7UUFDYixNQUFNLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQy9CLFVBQVUsRUFBRSxDQUFDO1FBQ2IsR0FBRyxFQUFnQixFQUFFO1FBQ3JCLFdBQVcsRUFBZ0IsRUFBRTtRQUM3QixTQUFTLEVBQUUsQ0FBQztRQUNaLE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztRQUM1QyxXQUFXLEVBQUUsS0FBSztLQUNyQjtJQUNELFNBQVMsWUFBQyxDQUFjO1FBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUE7UUFDbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNULE1BQU0sRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ2xDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFO1NBQ3BELENBQUMsQ0FBQTtRQUNGLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUN0QixDQUFDO0lBQ0QsV0FBVztRQUNQLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQTtRQUNqQixJQUFJLENBQUMsT0FBTyxD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S0FBSzs2QkFDakIsQ0FBQyxDQUFBO3lCQUVMO3dCQUNELFdBQU8sR0FBRyxDQUFDLE9BQU8sRUFBQTs7OztLQUNyQjtDQUNKLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElNeUFwcCB9IGZyb20gJy4uLy4uL2FwcCdcclxuaW1wb3J0IHsgQ291cnNlSXRlbSwgc2NoZWR1bGVSZXMgfSBmcm9tICcuLi8uLi91dGlscy9jb3Vyc2UvY291cnNlUmVzJ1xyXG5pbXBvcnQgZGF5anMgPSByZXF1aXJlKCdkYXlqcycpXHJcblxyXG5jb25zdCBhcHAgPSBnZXRBcHA8SU15QXBwPigpXHJcblxyXG5QYWdlKHtcclxuICAgIGRhdGE6IHtcclxuICAgICAgICBsb2FkaW5nOiB0cnVlLFxyXG4gICAgICAgIFRhYkN1cjogKGRheWpzKCkuZGF5KCkgKyA2KSAlIDcsXHJcbiAgICAgICAgc2Nyb2xsTGVmdDogMCxcclxuICAgICAgICBvYmo6IDxDb3Vyc2VJdGVtW10+W10sXHJcbiAgICAgICAgc2NoZWR1bGVEYXk6IDxDb3Vyc2VJdGVtW10+W10sXHJcbiAgICAgICAgbnVtT2ZXZWVrOiAwLFxyXG4gICAgICAgIHdlZWtOdW06IFsn5LiAJywgJ+S6jCcsICfkuIknLCAn5ZubJywgJ+S6lCcsICflha0nLCAn5pelJ10sXHJcbiAgICAgICAgdG9nZ2xlRGVsYXk6IGZhbHNlXHJcbiAgICB9LFxyXG4gICAgdGFiU2VsZWN0KGU6IHd4LlRhcEV2ZW50KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZSlcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmRhdGEuc2NoZWR1bGVEYXkpXHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgVGFiQ3VyOiBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZCxcclxuICAgICAgICAgICAgc2Nyb2xsTGVmdDogKGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkIC0gMSkgKiA2MFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5zaG93Q291cnNlcygpXHJcbiAgICB9LFxyXG4gICAgdG9nZ2xlRGVsYXkoKSB7XHJcbiAgICAgICAgY29uc3QgdGhhdCA9IHRoaXNcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICB0b2dnbGVEZWxheTogdHJ1ZVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGhhdC5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgIHRvZ2dsZURlbGF5OiBmYWxzZVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sIDEwMDApXHJcbiAgICB9LFxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIGxldCBzY2ggPSBbXVxyXG4gICAgICAgIHNjaC5wdXNoKFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb3Vyc2VJRDogJ3F3MTIzJyxcclxuICAgICAgICAgICAgICAgIGFjdGl2ZTogWzIsIDMsIDRdLFxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRheU9mV2VlazogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXhPZkRheTogWzAsIDEsIDJdXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIGluZm86IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAn6auY562J5pWw5a2mJyxcclxuICAgICAgICAgICAgICAgICAgICB0ZWFjaGVyOiAn56WW5Yay5LmLJyxcclxuICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbjogJ0lJSS0xMDUnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvdXJzZUlEOiAncXcxMjQnLFxyXG4gICAgICAgICAgICAgICAgYWN0aXZlOiBbMiwgMywgNF0sXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF5T2ZXZWVrOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleE9mRGF5OiBbMywgNF1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgaW5mbzoge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICfmr5vms73kuJzmgJ3mg7PkuI7kuK3lm73nibnoibLnpL7kvJrkuLvkuYnnkIborrrkvZPns7vmpoLorronLFxyXG4gICAgICAgICAgICAgICAgICAgIHRlYWNoZXI6ICflhq/lj4vlhbDCt+iMheS7peWNhycsXHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb246ICdJVi1DMTA4J1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb3Vyc2VJRDogJ3F3MTI1JyxcclxuICAgICAgICAgICAgICAgIGFjdGl2ZTogWzIsIDMsIDRdLFxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRheU9mV2VlazogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXhPZkRheTogWzAsIDEsIDJdXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIGluZm86IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAn6K6h566X5py657uE5oiQ5Y6f55CGJyxcclxuICAgICAgICAgICAgICAgICAgICB0ZWFjaGVyOiAn5L6v5o23JyxcclxuICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbjogJ0ktMjA1J1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgICAgIGxldCB3ZWVrID0gMlxyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIHNjaGVkdWxlRGF5OiBzY2gsXHJcbiAgICAgICAgICAgIG51bU9mV2Vlazogd2VlayxcclxuICAgICAgICAgICAgbG9hZGluZzogZmFsc2VcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuc2hvd0NvdXJzZXMoKVxyXG4gICAgICAgIHRoaXMudG9nZ2xlRGVsYXkoKVxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgUHJvbWlzZS5hbGwoW3RoaXMuY291cnNlU2NoZWR1bGUoKV0pXHJcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0NvdXJzZXMoKVxyXG4gICAgICAgICAgICAgICAgdGhpcy50b2dnbGVEZWxheSgpXHJcbiAgICAgICAgICAgICAgICAvLyBUT0RP5pWw5o2u57uR5a6a5YiwdGhpc1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKHJlYXNvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVhc29uKVxyXG4gICAgICAgICAgICB9KSovXHJcbiAgICB9LFxyXG4gICAgc2hvd0NvdXJzZXMoKSB7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgb2JqOiB0aGlzLmRhdGEuc2NoZWR1bGVEYXlcclxuICAgICAgICAgICAgICAgIC5yZWR1Y2UoKGFycjogQ291cnNlSXRlbVtdLCBpdGVtOiBDb3Vyc2VJdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgcG9zIG9mIGl0ZW0ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBvcy5kYXlPZldlZWsgPT0gdGhpcy5kYXRhLlRhYkN1cikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdDogQ291cnNlSXRlbSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoaXRlbSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucG9zaXRpb24gPSBbcG9zXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyLnB1c2gocmVzdWx0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhcnJcclxuICAgICAgICAgICAgICAgIH0sIFtdKVxyXG4gICAgICAgICAgICAgICAgLmZpbHRlcigoaXRlbTogQ291cnNlSXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHBvcyBvZiBpdGVtLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwb3MuZGF5T2ZXZWVrID09IHRoaXMuZGF0YS5UYWJDdXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLmFjdGl2ZS5pbmRleE9mKHRoaXMuZGF0YS5udW1PZldlZWspICE9IC0xXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgYXN5bmMgY291cnNlU2NoZWR1bGUoKSB7XHJcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IG5ldyBQcm9taXNlPHNjaGVkdWxlUmVzPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBhcHAuZ2xvYmFsRGF0YS5ob3N0TmFtZSArICcvY291cnNlL2NvdXJzZXMnLFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sbGVnZTogYXBwLmdsb2JhbERhdGEuY29sbGVnZSxcclxuICAgICAgICAgICAgICAgICAgICBwZXJzb25JRDogYXBwLmdsb2JhbERhdGEucGVyc29uSURcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoeyBkYXRhIH0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKDxzY2hlZHVsZVJlcz5kYXRhKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6IHJlamVjdFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaWYgKHJlcy5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICBzY2hlZHVsZURheTogcmVzLnJlc3VsdCxcclxuICAgICAgICAgICAgICAgIGxvYWRpbmc6IGZhbHNlXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgIGxvYWRpbmc6IGZhbHNlXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8vIFRPRE86XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXMuc3VjY2Vzc1xyXG4gICAgfVxyXG59KVxyXG4iXX0=