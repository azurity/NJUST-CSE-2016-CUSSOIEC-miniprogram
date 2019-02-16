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
        var _this = this;
        console.log(this.createSelectorQuery().select("#" + e.currentTarget.id));
        wx.createSelectorQuery()
            .select("#" + e.currentTarget.id)
            .boundingClientRect(function (rect) {
            _this.setData({
                TabCur: e.currentTarget.dataset.id,
                scrollLeft: (e.currentTarget.dataset.id - 1) * rect.width
            });
            _this.showCourses();
        })
            .exec();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291cnNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY291cnNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQSw2QkFBK0I7QUFFL0IsSUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFVLENBQUE7QUFFNUIsSUFBSSxDQUFDO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsT0FBTyxFQUFFLElBQUk7UUFDYixNQUFNLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQy9CLFVBQVUsRUFBRSxDQUFDO1FBQ2IsR0FBRyxFQUFnQixFQUFFO1FBQ3JCLFdBQVcsRUFBZ0IsRUFBRTtRQUM3QixTQUFTLEVBQUUsQ0FBQztRQUNaLE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztRQUM1QyxXQUFXLEVBQUUsS0FBSztLQUNyQjtJQUNELFNBQVMsWUFBQyxDQUFjO1FBQXhCLGlCQVlDO1FBWEcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBSSxDQUFDLENBQUMsYUFBYSxDQUFDLEVBQUksQ0FBQyxDQUFDLENBQUE7UUFDeEUsRUFBRSxDQUFDLG1CQUFtQixFQUFFO2FBQ25CLE1BQU0sQ0FBQyxNQUFJLENBQUMsQ0FBQyxhQUFhLENBQUMsRUFBSSxDQUFDO2FBQ2hDLGtCQUFrQixDQUFDLFVBQUMsSUFBSTtZQUNyQixLQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNULE1BQU0sRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNsQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdB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T0FBTyxFQUFFLEtBQUs7NkJBQ2pCLENBQUMsQ0FBQTt5QkFFTDs7Ozs7S0FFSjtDQUNKLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElNeUFwcCB9IGZyb20gJy4uLy4uL2FwcCdcclxuaW1wb3J0IHsgd2Vla0luZm9SZXMgfSBmcm9tICcuLi8uLi91dGlscy9nbG9iYWxSZXMnXHJcbmltcG9ydCB7IENvdXJzZUl0ZW0sIHNjaGVkdWxlUmVzIH0gZnJvbSAnLi4vLi4vdXRpbHMvY291cnNlL2NvdXJzZVJlcydcclxuaW1wb3J0IGRheWpzID0gcmVxdWlyZSgnZGF5anMnKVxyXG5cclxuY29uc3QgYXBwID0gZ2V0QXBwPElNeUFwcD4oKVxyXG5cclxuUGFnZSh7XHJcbiAgICBkYXRhOiB7XHJcbiAgICAgICAgbG9hZGluZzogdHJ1ZSxcclxuICAgICAgICBUYWJDdXI6IChkYXlqcygpLmRheSgpICsgNikgJSA3LFxyXG4gICAgICAgIHNjcm9sbExlZnQ6IDAsXHJcbiAgICAgICAgb2JqOiA8Q291cnNlSXRlbVtdPltdLFxyXG4gICAgICAgIHNjaGVkdWxlRGF5OiA8Q291cnNlSXRlbVtdPltdLFxyXG4gICAgICAgIG51bU9mV2VlazogMCxcclxuICAgICAgICB3ZWVrTnVtOiBbJ+S4gCcsICfkuownLCAn5LiJJywgJ+WbmycsICfkupQnLCAn5YWtJywgJ+aXpSddLFxyXG4gICAgICAgIHRvZ2dsZURlbGF5OiBmYWxzZVxyXG4gICAgfSxcclxuICAgIHRhYlNlbGVjdChlOiB3eC5UYXBFdmVudCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY3JlYXRlU2VsZWN0b3JRdWVyeSgpLnNlbGVjdChgIyR7ZS5jdXJyZW50VGFyZ2V0LmlkfWApKVxyXG4gICAgICAgIHd4LmNyZWF0ZVNlbGVjdG9yUXVlcnkoKVxyXG4gICAgICAgICAgICAuc2VsZWN0KGAjJHtlLmN1cnJlbnRUYXJnZXQuaWR9YClcclxuICAgICAgICAgICAgLmJvdW5kaW5nQ2xpZW50UmVjdCgocmVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgICAgICBUYWJDdXI6IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkLFxyXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbExlZnQ6IChlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZCAtIDEpICogKDx3eC5Ob2Rlc1JlZlJlY3Q+cmVjdCkud2lkdGhcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dDb3Vyc2VzKClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmV4ZWMoKVxyXG4gICAgfSxcclxuICAgIHRvZ2dsZURlbGF5KCkge1xyXG4gICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzXHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgdG9nZ2xlRGVsYXk6IHRydWVcclxuICAgICAgICB9KVxyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRoYXQuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICB0b2dnbGVEZWxheTogZmFsc2VcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LCAxMDAwKVxyXG4gICAgfSxcclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICAvKmxldCBzY2ggPSBbXVxyXG4gICAgICAgIHNjaC5wdXNoKFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb3Vyc2VJRDogJ3F3MTIzJyxcclxuICAgICAgICAgICAgICAgIGFjdGl2ZTogWzIsIDMsIDRdLFxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRheU9mV2VlazogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXhPZkRheTogWzAsIDEsIDJdXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIGluZm86IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAn6auY562J5pWw5a2mJyxcclxuICAgICAgICAgICAgICAgICAgICB0ZWFjaGVyOiAn56WW5Yay5LmLJyxcclxuICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbjogJ0lJSS0xMDUnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvdXJzZUlEOiAncXcxMjQnLFxyXG4gICAgICAgICAgICAgICAgYWN0aXZlOiBbMiwgMywgNF0sXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF5T2ZXZWVrOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleE9mRGF5OiBbMywgNF1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgaW5mbzoge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICfmr5vms73kuJzmgJ3mg7PkuI7kuK3lm73nibnoibLnpL7kvJrkuLvkuYnnkIborrrkvZPns7vmpoLorronLFxyXG4gICAgICAgICAgICAgICAgICAgIHRlYWNoZXI6ICflhq/lj4vlhbDCt+iMheS7peWNhycsXHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb246ICdJVi1DMTA4J1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb3Vyc2VJRDogJ3F3MTI1JyxcclxuICAgICAgICAgICAgICAgIGFjdGl2ZTogWzIsIDMsIDRdLFxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRheU9mV2VlazogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXhPZkRheTogWzAsIDEsIDJdXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIGluZm86IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAn6K6h566X5py657uE5oiQ5Y6f55CGJyxcclxuICAgICAgICAgICAgICAgICAgICB0ZWFjaGVyOiAn5L6v5o23JyxcclxuICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbjogJ0ktMjA1J1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgICAgIGxldCB3ZWVrID0gMlxyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIHNjaGVkdWxlRGF5OiBzY2gsXHJcbiAgICAgICAgICAgIG51bU9mV2Vlazogd2VlayxcclxuICAgICAgICAgICAgbG9hZGluZzogZmFsc2VcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuc2hvd0NvdXJzZXMoKVxyXG4gICAgICAgIHRoaXMudG9nZ2xlRGVsYXkoKVxyXG4gICAgICAgICovXHJcbiAgICAgICAgUHJvbWlzZS5hbGwoW3RoaXMuY291cnNlU2NoZWR1bGUoKSwgdGhpcy53ZWVrSW5mbygpXSlcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93Q291cnNlcygpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZURlbGF5KClcclxuICAgICAgICAgICAgICAgIC8vIFRPRE/mlbDmja7nu5HlrprliLB0aGlzXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCgocmVhc29uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZWFzb24pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgc2hvd0NvdXJzZXMoKSB7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgb2JqOiB0aGlzLmRhdGEuc2NoZWR1bGVEYXlcclxuICAgICAgICAgICAgICAgIC5yZWR1Y2UoKGFycjogQ291cnNlSXRlbVtdLCBpdGVtOiBDb3Vyc2VJdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgcG9zIG9mIGl0ZW0ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBvcy5kYXlPZldlZWsgPT0gdGhpcy5kYXRhLlRhYkN1cikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdDogQ291cnNlSXRlbSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoaXRlbSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucG9zaXRpb24gPSBbcG9zXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyLnB1c2gocmVzdWx0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhcnJcclxuICAgICAgICAgICAgICAgIH0sIFtdKVxyXG4gICAgICAgICAgICAgICAgLmZpbHRlcigoaXRlbTogQ291cnNlSXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHBvcyBvZiBpdGVtLnBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwb3MuZGF5T2ZXZWVrID09IHRoaXMuZGF0YS5UYWJDdXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLmFjdGl2ZS5pbmRleE9mKHRoaXMuZGF0YS5udW1PZldlZWspICE9IC0xXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgYXN5bmMgd2Vla0luZm8oKSB7XHJcbiAgICAgICAgbGV0IGluZm8gPSBhd2FpdCBuZXcgUHJvbWlzZTx3ZWVrSW5mb1Jlcz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgIHVybDogYXBwLmdsb2JhbERhdGEuaG9zdE5hbWUgKyAnL2dsb2JhbC93ZWVrX2luZm8nLFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICBjb2xsZWdlOiBhcHAuZ2xvYmFsRGF0YS5jb2xsZWdlLFxyXG4gICAgICAgICAgICAgICAgICAgIHBlcnNvbklEOiBhcHAuZ2xvYmFsRGF0YS5wZXJzb25JRCxcclxuICAgICAgICAgICAgICAgICAgICBkYXRlOiBkYXlqcygpLmZvcm1hdCgnWVlZWS1NTS1ERCcpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHsgZGF0YSB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSg8d2Vla0luZm9SZXM+ZGF0YSlcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsOiByZWplY3RcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIGlmIChpbmZvLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgIG51bU9mV2VlazogaW5mby5yZXN1bHQubnVtT2ZXZWVrXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gVE9ETzog5aSx6LSl5aSE55CGXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGFzeW5jIGNvdXJzZVNjaGVkdWxlKCkge1xyXG4gICAgICAgIGxldCByZXMgPSBhd2FpdCBuZXcgUHJvbWlzZTxzY2hlZHVsZVJlcz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgIHVybDogYXBwLmdsb2JhbERhdGEuaG9zdE5hbWUgKyAnL2NvdXJzZS9jb3Vyc2VzJyxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sbGVnZTogYXBwLmdsb2JhbERhdGEuY29sbGVnZSxcclxuICAgICAgICAgICAgICAgICAgICBwZXJzb25JRDogYXBwLmdsb2JhbERhdGEucGVyc29uSURcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoeyBkYXRhIH0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKDxzY2hlZHVsZVJlcz5kYXRhKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6IHJlamVjdFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaWYgKHJlcy5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICBzY2hlZHVsZURheTogcmVzLnJlc3VsdCxcclxuICAgICAgICAgICAgICAgIGxvYWRpbmc6IGZhbHNlXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgIGxvYWRpbmc6IGZhbHNlXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8vIFRPRE86IOWksei0peWkhOeQhlxyXG4gICAgICAgIH1cclxuICAgICAgICAvL3JldHVybiByZXMuc3VjY2Vzc1xyXG4gICAgfVxyXG59KVxyXG4iXX0=