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
var DirectAim;
(function (DirectAim) {
    DirectAim[DirectAim["Binding"] = 0] = "Binding";
    DirectAim[DirectAim["Index"] = 1] = "Index";
})(DirectAim || (DirectAim = {}));
Page({
    data: {},
    onLoad: function () {
        var _this = this;
        Promise.all([this.initOpenid()])
            .then(function () {
            var aim = DirectAim.Binding;
            if (app.globalData.college != null && app.globalData.personID != null) {
                aim = DirectAim.Index;
            }
            _this.direct(aim);
        })
            .catch(function (reason) {
            console.log(reason);
        });
    },
    initOpenid: function () {
        return __awaiter(this, void 0, void 0, function () {
            var code, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, new Promise(function (resolve, reject) {
                            wx.login({ success: resolve, fail: reject });
                        })];
                    case 1:
                        code = _a.sent();
                        return [4, new Promise(function (resolve, reject) {
                                wx.request({
                                    url: app.globalData.hostName + '/global/login',
                                    method: 'POST',
                                    data: JSON.stringify({ code: code.code }),
                                    success: function (_a) {
                                        var data = _a.data;
                                        resolve(data);
                                    },
                                    fail: reject
                                });
                            })];
                    case 2:
                        res = _a.sent();
                        if (res.success) {
                            app.globalData.openid = res.result;
                        }
                        else {
                        }
                        return [2];
                }
            });
        });
    },
    direct: function (aim) {
        if (aim == DirectAim.Binding) {
        }
        else if (aim == DirectAim.Index) {
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF1bmNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGF1bmNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJQSxJQUFNLEdBQUcsR0FBRyxNQUFNLEVBQVUsQ0FBQTtBQUU1QixJQUFLLFNBR0o7QUFIRCxXQUFLLFNBQVM7SUFDViwrQ0FBTyxDQUFBO0lBQ1AsMkNBQUssQ0FBQTtBQUNULENBQUMsRUFISSxTQUFTLEtBQVQsU0FBUyxRQUdiO0FBRUQsSUFBSSxDQUFDO0lBSUQsSUFBSSxFQUFFLEVBQUU7SUFLUixNQUFNO1FBQU4saUJBWUM7UUFYRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7YUFDM0IsSUFBSSxDQUFDO1lBQ0YsSUFBSSxHQUFHLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQTtZQUMzQixJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsT0FBTyxJQUFJLElBQUksSUFBSSxHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsSUFBSSxJQUFJLEVBQUU7Z0JBQ25FLEdBQUcsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFBO2FBQ3hCO1lBQ0QsS0FBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNwQixDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQyxNQUFNO1lBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUN2QixDQUFDLENBQUMsQ0FBQTtJQUNWLENBQUM7SUFFSyxVQUFVOzs7Ozs0QkFDRCxXQUFNLElBQUksT0FBTyxDQUFtQixVQUFDLE9BQU8sRUFBRSxNQUFNOzRCQUMzRCxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQTt3QkFDaEQsQ0FBQyxDQUFDLEVBQUE7O3dCQUZFLElBQUksR0FBRyxTQUVUO3dCQUNRLFdBQU0sSUFBSSxPQUFPLENBQVksVUFBQyxPQUFPLEVBQUUsTUFBTTtnQ0FDbkQsRUFBRSxDQUFDLE9BQU8sQ0FBQztvQ0FDUCxHQUFHLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsZUFBZTtvQ0FDOUMsTUFBTSxFQUFFLE1BQU07b0NBQ2QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO29DQUN6QyxPQUFPLEVBQUUsVUFBQyxFQUFROzRDQUFOLGNBQUk7d0NBQ1osT0FBTyxDQUFZLElBQUksQ0FBQyxDQUFBO29DQUM1QixDQUFDO29DQUNELElBQUksRUFBRSxNQUFNO2lDQUNmLENBQUMsQ0FBQTs0QkFDTixDQUFDLENBQUMsRUFBQTs7d0JBVkUsR0FBRyxHQUFHLFNBVVI7d0JBQ0YsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFOzRCQUNiLEdBQUcsQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUE7eUJBQ3JDOzZCQUFNO3lCQUVOOzs7OztLQUVKO0lBRUQsTUFBTSxZQUFDLEdBQWM7UUFFakIsSUFBSSxHQUFHLElBQUksU0FBUyxDQUFDLE9BQU8sRUFBRTtTQUU3QjthQUFNLElBQUksR0FBRyxJQUFJLFNBQVMsQ0FBQyxLQUFLLEVBQUU7U0FFbEM7SUFDTCxDQUFDO0NBQ0osQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gcGFnZXMvbGF1bmNoL2xhdW5jaC5qc1xyXG5pbXBvcnQgeyBJTXlBcHAgfSBmcm9tICcuLi8uLi9hcHAnXHJcbmltcG9ydCB7IG9wZW5pZFJlcyB9IGZyb20gJy4uLy4uL3V0aWxzL2dsb2JhbFJlcydcclxuXHJcbmNvbnN0IGFwcCA9IGdldEFwcDxJTXlBcHA+KClcclxuXHJcbmVudW0gRGlyZWN0QWltIHtcclxuICAgIEJpbmRpbmcsXHJcbiAgICBJbmRleFxyXG59XHJcblxyXG5QYWdlKHtcclxuICAgIC8qKlxyXG4gICAgICog6aG16Z2i55qE5Yid5aeL5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIGRhdGE6IHt9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliqDovb3vvIzlnKjmraTlpITlgZrpnIDopoHlkIzmraXnmoTliJ3lp4vljJZcclxuICAgICAqL1xyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIFByb21pc2UuYWxsKFt0aGlzLmluaXRPcGVuaWQoKV0pIC8vIOWIqeeUqFBybW9pc2UuYWxs5YGa5aSa5Liq5bm26KGM55qE5Yid5aeL5YyW5rWB56iLXHJcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBhaW0gPSBEaXJlY3RBaW0uQmluZGluZyAvLyDmsqHmnInlrablj7fkv6Hmga/ml7blvLrliLbnu5HlrppcclxuICAgICAgICAgICAgICAgIGlmIChhcHAuZ2xvYmFsRGF0YS5jb2xsZWdlICE9IG51bGwgJiYgYXBwLmdsb2JhbERhdGEucGVyc29uSUQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFpbSA9IERpcmVjdEFpbS5JbmRleFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kaXJlY3QoYWltKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKHJlYXNvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVhc29uKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBhc3luYyBpbml0T3BlbmlkKCkge1xyXG4gICAgICAgIGxldCBjb2RlID0gYXdhaXQgbmV3IFByb21pc2U8d3guTG9naW5SZXNwb25zZT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB3eC5sb2dpbih7IHN1Y2Nlc3M6IHJlc29sdmUsIGZhaWw6IHJlamVjdCB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IG5ldyBQcm9taXNlPG9wZW5pZFJlcz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgIHVybDogYXBwLmdsb2JhbERhdGEuaG9zdE5hbWUgKyAnL2dsb2JhbC9sb2dpbicsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHsgY29kZTogY29kZS5jb2RlIH0pLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHsgZGF0YSB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSg8b3BlbmlkUmVzPmRhdGEpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogcmVqZWN0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZiAocmVzLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgYXBwLmdsb2JhbERhdGEub3BlbmlkID0gcmVzLnJlc3VsdFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IOacquiDveiOt+WPluWIsG9wZW5pZO+8jOWBmuWHuuWkhOeQhlxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBlcnJvcuaKm+WHuuWIsOWklumdou+8jOeUsWNhdGNo5aSE55CGXHJcbiAgICB9LFxyXG5cclxuICAgIGRpcmVjdChhaW06IERpcmVjdEFpbSkge1xyXG4gICAgICAgIC8vIFRPRE86IOWcqOatpOWkhOWujOaIkOWunumZheeahOi3s+i9rOi/h+eoi++8jOi3s+i9rOiHs+S4u+mhtemdolxyXG4gICAgICAgIGlmIChhaW0gPT0gRGlyZWN0QWltLkJpbmRpbmcpIHtcclxuICAgICAgICAgICAgLy8g6Lez6L2s6Iez57uR5a6a6aG1XHJcbiAgICAgICAgfSBlbHNlIGlmIChhaW0gPT0gRGlyZWN0QWltLkluZGV4KSB7XHJcbiAgICAgICAgICAgIC8vIOi3s+i9rOiHs+S4u+mhtVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSlcclxuIl19