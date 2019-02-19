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
        list: [
            {
                weekInfo: {
                    numOfWeek: 1,
                    dayOfWeek: 1,
                    indexOfDay: [1, 2, 3]
                },
                recordID: 12,
                count: 28
            }
        ],
        isOpen: false,
        loading: false,
        listLoading: true,
        weekNum: ['一', '二', '三', '四', '五', '六', '日']
    },
    onLoad: function () {
        console.log(this.data.list);
    },
    toggleState: function (e) { },
    deleteItem: function (e) {
    },
    toggleAction: function (action) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2];
        }); });
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
    delete: function (recordID) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, new Promise(function (resolve, reject) {
                            wx.request({
                                url: app.globalData.hostName + '',
                                data: {},
                                success: function (_a) {
                                    var data = _a.data;
                                    resolve(data);
                                },
                                fail: reject
                            });
                        })];
                    case 1:
                        result = _a.sent();
                        return [2];
                }
            });
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tJbkNvbnRyb2wuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjaGVja0luQ29udHJvbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS0EsSUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFVLENBQUE7QUFFNUIsSUFBSSxDQUFDO0lBSUQsSUFBSSxFQUFFO1FBQ0YsSUFBSSxFQUFpQjtZQUNqQjtnQkFDSSxRQUFRLEVBQUU7b0JBQ04sU0FBUyxFQUFFLENBQUM7b0JBQ1osU0FBUyxFQUFFLENBQUM7b0JBQ1osVUFBVSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7aUJBQ3hCO2dCQUNELFFBQVEsRUFBRSxFQUFFO2dCQUNaLEtBQUssRUFBRSxFQUFFO2FBQ1o7U0FDSjtRQUNELE1BQU0sRUFBRSxLQUFLO1FBQ2IsT0FBTyxFQUFFLEtBQUs7UUFDZCxXQUFXLEVBQUUsSUFBSTtRQUNqQixPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7S0FDL0M7SUFLRCxNQUFNO1FBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBVS9CLENBQUM7SUFFRCxXQUFXLFlBQUMsQ0FBYyxJQUFHLENBQUM7SUFFOUIsVUFBVSxZQUFDLENBQWM7SUFFekIsQ0FBQztJQUVLLFlBQVksWUFBQyxNQUFjOzs7O0tBQUk7SUFFL0IsSUFBSTs7Ozs7O3dCQUNGLFVBQVUsR0FBNEIsSUFBSSxDQUFBO3dCQUM5QyxJQUFJOzRCQUNBLFVBQVUsR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFBO3lCQUNqRDt3QkFBQyxPQUFPLENBQUMsRUFBRTt5QkFFWDt3QkFDWSxXQUFNLElBQUksT0FBTyxDQUFhLFVBQUMsT0FBTyxFQUFFLE1BQU07Z0NBQ3ZELEVBQUUsQ0FBQyxPQUFPLENBQUM7b0NBQ1AsR0FBRyxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxHQUFHLDBCQUEwQjtvQ0FDekQsTUFBTSxFQUFFLEtBQUs7b0NBQ2IsSUFBSSxFQUFFLEVBQUUsUUFBUSxFQUFFLFVBQVcsQ0FBQyxRQUFRLEVBQUU7b0NBQ3hDLE9BQU8sRUFBRSxVQUFDLEVBQVE7NENBQU4sY0FBSTt3Q0FDWixPQUFPLENBQWEsSUFBSSxDQUFDLENBQUE7b0NBQzdCLENBQUM7b0NBQ0QsSUFBSSxFQUFFLE1BQU07aUNBQ2YsQ0FBQyxDQUFBOzRCQUNOLENBQUMsQ0FBQyxFQUFBOzt3QkFWRSxNQUFNLEdBQUcsU0FVWDt3QkFDRixJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUU7NEJBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUM7Z0NBQ1QsSUFBSSxFQUFFLE1BQU0sQ0FBQyxNQUFNOzZCQUN0QixDQUFDLENBQUE7eUJBQ0w7NkJBQU07eUJBRU47Ozs7O0tBQ0o7SUFFSyxNQUFNLFlBQUMsUUFBZ0I7Ozs7OzRCQUNaLFdBQU0sSUFBSSxPQUFPLENBQUcsVUFBQyxPQUFPLEVBQUMsTUFBTTs0QkFDNUMsRUFBRSxDQUFDLE9BQU8sQ0FBQztnQ0FDUCxHQUFHLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUMsRUFBRTtnQ0FDL0IsSUFBSSxFQUFDLEVBQUU7Z0NBQ1AsT0FBTyxFQUFDLFVBQUMsRUFBTTt3Q0FBTCxjQUFJO29DQUNWLE9BQU8sQ0FBRyxJQUFJLENBQUMsQ0FBQTtnQ0FDbkIsQ0FBQztnQ0FDRCxJQUFJLEVBQUMsTUFBTTs2QkFDZCxDQUFDLENBQUE7d0JBQ04sQ0FBQyxDQUFDLEVBQUE7O3dCQVRFLE1BQU0sR0FBRyxTQVNYOzs7OztLQUNMO0NBQ0osQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gcGFnZXMvY2hlY2tJbkNvbnRyb2wvY2hlY2tJbkNvbnRyb2wudHNcclxuaW1wb3J0IHsgSU15QXBwIH0gZnJvbSAnLi4vLi4vYXBwJ1xyXG5pbXBvcnQgeyBDb3Vyc2VEZXRhaWxJbmZvIH0gZnJvbSAnLi4vLi4vdXRpbHMvY291cnNlL0NvdXJzZUluZm8nXHJcbmltcG9ydCB7IGhpc3RvcnlSZXMsIEhpc3RvcnlJdGVtIH0gZnJvbSAnLi4vLi4vdXRpbHMvY291cnNlL2NoZWNrSW4vaGlzdG9yeVJlcydcclxuXHJcbmNvbnN0IGFwcCA9IGdldEFwcDxJTXlBcHA+KClcclxuXHJcblBhZ2Uoe1xyXG4gICAgLyoqXHJcbiAgICAgKiDpobXpnaLnmoTliJ3lp4vmlbDmja5cclxuICAgICAqL1xyXG4gICAgZGF0YToge1xyXG4gICAgICAgIGxpc3Q6IDxIaXN0b3J5SXRlbVtdPltcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgd2Vla0luZm86IHtcclxuICAgICAgICAgICAgICAgICAgICBudW1PZldlZWs6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF5T2ZXZWVrOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4T2ZEYXk6IFsxLCAyLCAzXVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHJlY29yZElEOiAxMixcclxuICAgICAgICAgICAgICAgIGNvdW50OiAyOFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXSxcclxuICAgICAgICBpc09wZW46IGZhbHNlLFxyXG4gICAgICAgIGxvYWRpbmc6IGZhbHNlLFxyXG4gICAgICAgIGxpc3RMb2FkaW5nOiB0cnVlLFxyXG4gICAgICAgIHdlZWtOdW06IFsn5LiAJywgJ+S6jCcsICfkuIknLCAn5ZubJywgJ+S6lCcsICflha0nLCAn5pelJ11cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWKoOi9vVxyXG4gICAgICovXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5kYXRhLmxpc3QpXHJcbiAgICAgICAgLyp0aGlzLmluaXQoKVxyXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgICAgIGxpc3RMb2FkaW5nOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKChyZWFzb24pID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlYXNvbilcclxuICAgICAgICAgICAgfSkqL1xyXG4gICAgfSxcclxuXHJcbiAgICB0b2dnbGVTdGF0ZShlOiB3eC5UYXBFdmVudCkge30sXHJcblxyXG4gICAgZGVsZXRlSXRlbShlOiB3eC5UYXBFdmVudCkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaW5kZXgpXHJcbiAgICB9LFxyXG5cclxuICAgIGFzeW5jIHRvZ2dsZUFjdGlvbihhY3Rpb246IHN0cmluZykge30sXHJcblxyXG4gICAgYXN5bmMgaW5pdCgpIHtcclxuICAgICAgICBsZXQgY291cnNlSW5mbzogQ291cnNlRGV0YWlsSW5mbyB8IG51bGwgPSBudWxsXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY291cnNlSW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdDb3Vyc2VEZXRhaWwnKVxyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgLy8gVE9ETzpcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IG5ldyBQcm9taXNlPGhpc3RvcnlSZXM+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgd3gucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IGFwcC5nbG9iYWxEYXRhLmhvc3ROYW1lICsgJy9jb3Vyc2UvY2hlY2tfaW4vaGlzdG9yeScsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogeyBjb3Vyc2VJRDogY291cnNlSW5mbyEuY291cnNlSUQgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ICh7IGRhdGEgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoPGhpc3RvcnlSZXM+ZGF0YSlcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsOiByZWplY3RcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIGlmIChyZXN1bHQuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgbGlzdDogcmVzdWx0LnJlc3VsdFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vVE9ETzpcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGFzeW5jIGRlbGV0ZShyZWNvcmRJRDogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IG5ldyBQcm9taXNlPD4oKHJlc29sdmUscmVqZWN0KT0+e1xyXG4gICAgICAgICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgIHVybDogYXBwLmdsb2JhbERhdGEuaG9zdE5hbWUrJycsXHJcbiAgICAgICAgICAgICAgICBkYXRhOnt9LFxyXG4gICAgICAgICAgICAgICAgc3VjY2Vzczooe2RhdGF9KT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoPD5kYXRhKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6cmVqZWN0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufSlcclxuIl19