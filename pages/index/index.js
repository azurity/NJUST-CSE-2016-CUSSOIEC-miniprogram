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
    types: ['all', 'exam', 'score', 'notice', 'community'],
    data: {
        floating: false,
        scrollLeft: 0,
        TabCur: 0,
        infoList: [],
        listName: ['全部', '考试', '成绩', '通知', '社区']
    },
    onLoad: function () {
        this.loadInfo(this.types[0], true)
            .then(function () { })
            .catch(function (reason) {
            console.log(reason);
        });
    },
    cardSwiper: function (e) {
    },
    onPageScroll: function () {
        var _this = this;
        wx.createSelectorQuery()
            .select('#recommand')
            .boundingClientRect(function (rect) {
            if (rect.height + rect.top <= 0) {
                _this.setData({
                    floating: true
                });
            }
            else {
                _this.setData({
                    floating: false
                });
            }
        })
            .exec();
    },
    onReachBottom: function () {
        this.loadInfo(this.types[this.data.TabCur], false)
            .then(function () { })
            .catch(function (reason) {
            console.log(reason);
        });
    },
    scroll: function (e) {
        this.setData({
            scrollLeft: e.detail.scrollLeft
        });
    },
    tabSelect: function (e) {
        var _this = this;
        wx.createSelectorQuery()
            .select("#" + e.currentTarget.id)
            .boundingClientRect(function (rect) {
            _this.setData({
                TabCur: e.currentTarget.dataset.id,
                scrollLeft: (e.currentTarget.dataset.id - 1) * rect.width
            });
        })
            .exec();
        this.loadInfo(this.types[e.currentTarget.dataset.id], true)
            .then(function () { })
            .catch(function (reason) {
            console.log(reason);
        });
    },
    loadInfo: function (type, reset) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (reset) {
                            this.setData({
                                infoList: []
                            });
                        }
                        return [4, new Promise(function (resolve, reject) {
                                wx.request({
                                    url: app.globalData.hostName + '/stream/infos',
                                    method: 'GET',
                                    data: {
                                        college: app.globalData.college,
                                        personID: app.globalData.personID,
                                        type: type,
                                        startIndex: _this.data.infoList.length
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
                                infoList: this.data.infoList.concat(result.result)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBVUEsSUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFVLENBQUE7QUFFNUIsSUFBSSxDQUFDO0lBSUQsS0FBSyxFQUFFLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFdBQVcsQ0FBQztJQUN0RCxJQUFJLEVBQUU7UUFDRixRQUFRLEVBQUUsS0FBSztRQUNmLFVBQVUsRUFBRSxDQUFDO1FBQ2IsTUFBTSxFQUFFLENBQUM7UUFDVCxRQUFRLEVBQWMsRUFBRTtRQUN4QixRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO0tBQzNDO0lBS0QsTUFBTTtRQUNGLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUM7YUFDN0IsSUFBSSxDQUFDLGNBQU8sQ0FBQyxDQUFDO2FBQ2QsS0FBSyxDQUFDLFVBQUMsTUFBTTtZQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDdkIsQ0FBQyxDQUFDLENBQUE7SUFDVixDQUFDO0lBRUQsVUFBVSxZQUFDLENBQXlDO0lBRXBELENBQUM7SUFFRCxZQUFZO1FBQVosaUJBZUM7UUFkRyxFQUFFLENBQUMsbUJBQW1CLEVBQUU7YUFDbkIsTUFBTSxDQUFDLFlBQVksQ0FBQzthQUNwQixrQkFBa0IsQ0FBQyxVQUFDLElBQXFCO1lBQ3RDLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRTtnQkFDN0IsS0FBSSxDQUFDLE9BQU8sQ0FBQztvQkFDVCxRQUFRLEVBQUUsSUFBSTtpQkFDakIsQ0FBQyxDQUFBO2FBQ0w7aUJB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QyxDQUFBO3lCQUNMOzZCQUFNO3lCQUVOOzs7OztLQUNKO0NBQ0osQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy9pbmRleC5qc1xyXG5pbXBvcnQgeyBJTXlBcHAgfSBmcm9tICcuLi8uLi9hcHAnXHJcbmltcG9ydCB7IEluZm9JdGVtLCBpbmZvUmVzIH0gZnJvbSAnLi4vLi4vdXRpbHMvaW5mb1JlcydcclxuXHJcbmludGVyZmFjZSBDaGFuZ2VEZXRhaWwge1xyXG4gICAgY3VycmVudDogbnVtYmVyXHJcbiAgICBjdXJyZW50SXRlbUlkOiBzdHJpbmdcclxuICAgIHNvdXJjZTogJ2F1dG9wbGF5JyB8ICd0b3VjaCdcclxufVxyXG5cclxuY29uc3QgYXBwID0gZ2V0QXBwPElNeUFwcD4oKVxyXG5cclxuUGFnZSh7XHJcbiAgICAvKipcclxuICAgICAqIOmhtemdoueahOWIneWni+aVsOaNrlxyXG4gICAgICovXHJcbiAgICB0eXBlczogWydhbGwnLCAnZXhhbScsICdzY29yZScsICdub3RpY2UnLCAnY29tbXVuaXR5J10sXHJcbiAgICBkYXRhOiB7XHJcbiAgICAgICAgZmxvYXRpbmc6IGZhbHNlLFxyXG4gICAgICAgIHNjcm9sbExlZnQ6IDAsXHJcbiAgICAgICAgVGFiQ3VyOiAwLFxyXG4gICAgICAgIGluZm9MaXN0OiA8SW5mb0l0ZW1bXT5bXSxcclxuICAgICAgICBsaXN0TmFtZTogWyflhajpg6gnLCAn6ICD6K+VJywgJ+aIkOe7qScsICfpgJrnn6UnLCAn56S+5Yy6J11cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWKoOi9vVxyXG4gICAgICovXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5sb2FkSW5mbyh0aGlzLnR5cGVzWzBdLCB0cnVlKVxyXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7fSlcclxuICAgICAgICAgICAgLmNhdGNoKChyZWFzb24pID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlYXNvbilcclxuICAgICAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgY2FyZFN3aXBlcihlOiB3eC5DdXN0b21FdmVudDwnY2hhbmdlJywgQ2hhbmdlRGV0YWlsPikge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coZSlcclxuICAgIH0sXHJcblxyXG4gICAgb25QYWdlU2Nyb2xsKCkge1xyXG4gICAgICAgIHd4LmNyZWF0ZVNlbGVjdG9yUXVlcnkoKVxyXG4gICAgICAgICAgICAuc2VsZWN0KCcjcmVjb21tYW5kJylcclxuICAgICAgICAgICAgLmJvdW5kaW5nQ2xpZW50UmVjdCgocmVjdDogd3guTm9kZXNSZWZSZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVjdC5oZWlnaHQgKyByZWN0LnRvcCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmxvYXRpbmc6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbG9hdGluZzogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuZXhlYygpXHJcbiAgICB9LFxyXG5cclxuICAgIG9uUmVhY2hCb3R0b20oKSB7XHJcbiAgICAgICAgdGhpcy5sb2FkSW5mbyh0aGlzLnR5cGVzW3RoaXMuZGF0YS5UYWJDdXJdLCBmYWxzZSlcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge30pXHJcbiAgICAgICAgICAgIC5jYXRjaCgocmVhc29uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZWFzb24pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIHNjcm9sbChlOiB3eC5TY3JvbGxFdmVudCkge1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIHNjcm9sbExlZnQ6IGUuZGV0YWlsLnNjcm9sbExlZnRcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICB0YWJTZWxlY3QoZTogd3guVGFwRXZlbnQpIHtcclxuICAgICAgICB3eC5jcmVhdGVTZWxlY3RvclF1ZXJ5KClcclxuICAgICAgICAgICAgLnNlbGVjdChgIyR7ZS5jdXJyZW50VGFyZ2V0LmlkfWApXHJcbiAgICAgICAgICAgIC5ib3VuZGluZ0NsaWVudFJlY3QoKHJlY3QpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICAgICAgVGFiQ3VyOiBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZCxcclxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxMZWZ0OiAoZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWQgLSAxKSAqICg8d3guTm9kZXNSZWZSZWN0PnJlY3QpLndpZHRoXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuZXhlYygpXHJcbiAgICAgICAgdGhpcy5sb2FkSW5mbyh0aGlzLnR5cGVzW2UuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkXSwgdHJ1ZSlcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge30pXHJcbiAgICAgICAgICAgIC5jYXRjaCgocmVhc29uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZWFzb24pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGFzeW5jIGxvYWRJbmZvKHR5cGU6IHN0cmluZywgcmVzZXQ6IGJvb2xlYW4pIHtcclxuICAgICAgICBpZiAocmVzZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgIGluZm9MaXN0OiA8SW5mb0l0ZW1bXT5bXVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgbmV3IFByb21pc2U8aW5mb1Jlcz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgIHVybDogYXBwLmdsb2JhbERhdGEuaG9zdE5hbWUgKyAnL3N0cmVhbS9pbmZvcycsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbGxlZ2U6IGFwcC5nbG9iYWxEYXRhLmNvbGxlZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcGVyc29uSUQ6IGFwcC5nbG9iYWxEYXRhLnBlcnNvbklELFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IHR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRJbmRleDogdGhpcy5kYXRhLmluZm9MaXN0Lmxlbmd0aFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ICh7IGRhdGEgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoPGluZm9SZXM+ZGF0YSlcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsOiByZWplY3RcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIGlmIChyZXN1bHQuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgaW5mb0xpc3Q6IHRoaXMuZGF0YS5pbmZvTGlzdC5jb25jYXQocmVzdWx0LnJlc3VsdClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBUT0RPOlxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSlcclxuIl19