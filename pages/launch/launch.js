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
            var code, res, personID;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, new Promise(function (resolve, reject) {
                            wx.login({ success: resolve, fail: reject });
                        })];
                    case 1:
                        code = _a.sent();
                        return [4, new Promise(function (resolve, reject) {
                                wx.request({
                                    url: app.globalData.hostName + '/global/openid',
                                    method: 'GET',
                                    data: { code: code.code },
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
                        return [4, new Promise(function (resolve, reject) {
                                wx.request({
                                    url: app.globalData.hostName + '/global/person_id',
                                    method: 'GET',
                                    data: { openid: app.globalData.openid },
                                    success: function (_a) {
                                        var data = _a.data;
                                        resolve(data);
                                    },
                                    fail: reject
                                });
                            })];
                    case 3:
                        personID = _a.sent();
                        if (personID.success) {
                            app.globalData.college = personID.result.college;
                            app.globalData.personID = personID.result.personID;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF1bmNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGF1bmNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJQSxJQUFNLEdBQUcsR0FBRyxNQUFNLEVBQVUsQ0FBQTtBQUU1QixJQUFLLFNBR0o7QUFIRCxXQUFLLFNBQVM7SUFDViwrQ0FBTyxDQUFBO0lBQ1AsMkNBQUssQ0FBQTtBQUNULENBQUMsRUFISSxTQUFTLEtBQVQsU0FBUyxRQUdiO0FBRUQsSUFBSSxDQUFDO0lBSUQsSUFBSSxFQUFFLEVBQUU7SUFLUixNQUFNO1FBQU4saUJBWUM7UUFYRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7YUFDM0IsSUFBSSxDQUFDO1lBQ0YsSUFBSSxHQUFHLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQTtZQUMzQixJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsT0FBTyxJQUFJLElBQUksSUFBSSxHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsSUFBSSxJQUFJLEVBQUU7Z0JBQ25FLEdBQUcsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFBO2FBQ3hCO1lBQ0QsS0FBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNwQixDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQyxNQUFNO1lBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUN2QixDQUFDLENBQUMsQ0FBQTtJQUNWLENBQUM7SUFFSyxVQUFVOzs7Ozs0QkFDRCxXQUFNLElBQUksT0FBTyxDQUFtQixVQUFDLE9BQU8sRUFBRSxNQUFNOzRCQUMzRCxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQTt3QkFDaEQsQ0FBQyxDQUFDLEVBQUE7O3dCQUZFLElBQUksR0FBRyxTQUVUO3dCQUNRLFdBQU0sSUFBSSxPQUFPLENBQVksVUFBQyxPQUFPLEVBQUUsTUFBTTtnQ0FDbkQsRUFBRSxDQUFDLE9BQU8sQ0FBQztvQ0FDUCxHQUFHLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsZ0JBQWdCO29DQUMvQyxNQUFNLEVBQUUsS0FBSztvQ0FDYixJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRTtvQ0FDekIsT0FBTyxFQUFFLFVBQUMsRUFBUTs0Q0FBTixjQUFJO3dDQUNaLE9BQU8sQ0FBWSxJQUFJLENBQUMsQ0FBQTtvQ0FDNUIsQ0FBQztvQ0FDRCxJQUFJLEVBQUUsTUFBTTtpQ0FDZixDQUFDLENBQUE7NEJBQ04sQ0FBQyxDQUFDLEVBQUE7O3dCQVZFLEdBQUcsR0FBRyxTQVVSO3dCQUNGLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRTs0QkFDYixHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFBO3lCQUNyQzs2QkFBTTt5QkFFTjt3QkFDYyxXQUFNLElBQUksT0FBTyxDQUFjLFVBQUMsT0FBTyxFQUFFLE1BQU07Z0NBQzFELEVBQUUsQ0FBQyxPQUFPLENBQUM7b0NBQ1AsR0FBRyxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxHQUFHLG1CQUFtQjtvQ0FDbEQsTUFBTSxFQUFFLEtBQUs7b0NBQ2IsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFO29DQUN2QyxPQUFPLEVBQUUsVUFBQyxFQUFROzRDQUFOLGNBQUk7d0NBQ1osT0FBTyxDQUFjLElBQUksQ0FBQyxDQUFBO29DQUM5QixDQUFDO29DQUNELElBQUksRUFBRSxNQUFNO2lDQUNmLENBQUMsQ0FBQTs0QkFDTixDQUFDLENBQUMsRUFBQTs7d0JBVkUsUUFBUSxHQUFHLFNBVWI7d0JBQ0YsSUFBSSxRQUFRLENBQUMsT0FBTyxFQUFFOzRCQUNsQixHQUFHLENBQUMsVUFBVSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQTs0QkFDaEQsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUE7eUJBQ3JEOzs7OztLQUVKO0lBRUQsTUFBTSxZQUFDLEdBQWM7UUFFakIsSUFBSSxHQUFHLElBQUksU0FBUyxDQUFDLE9BQU8sRUFBRTtTQUU3QjthQUFNLElBQUksR0FBRyxJQUFJLFNBQVMsQ0FBQyxLQUFLLEVBQUU7U0FFbEM7SUFDTCxDQUFDO0NBQ0osQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gcGFnZXMvbGF1bmNoL2xhdW5jaC5qc1xyXG5pbXBvcnQgeyBJTXlBcHAgfSBmcm9tICcuLi8uLi9hcHAnXHJcbmltcG9ydCB7IG9wZW5pZFJlcywgcGVyc29uSURSZXMgfSBmcm9tICcuLi8uLi91dGlscy9nbG9iYWxSZXMnXHJcblxyXG5jb25zdCBhcHAgPSBnZXRBcHA8SU15QXBwPigpXHJcblxyXG5lbnVtIERpcmVjdEFpbSB7XHJcbiAgICBCaW5kaW5nLFxyXG4gICAgSW5kZXhcclxufVxyXG5cclxuUGFnZSh7XHJcbiAgICAvKipcclxuICAgICAqIOmhtemdoueahOWIneWni+aVsOaNrlxyXG4gICAgICovXHJcbiAgICBkYXRhOiB7fSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yqg6L2977yM5Zyo5q2k5aSE5YGa6ZyA6KaB5ZCM5q2l55qE5Yid5aeL5YyWXHJcbiAgICAgKi9cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICBQcm9taXNlLmFsbChbdGhpcy5pbml0T3BlbmlkKCldKSAvLyDliKnnlKhQcm1vaXNlLmFsbOWBmuWkmuS4quW5tuihjOeahOWIneWni+WMlua1geeoi1xyXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYWltID0gRGlyZWN0QWltLkJpbmRpbmcgLy8g5rKh5pyJ5a2m5Y+35L+h5oGv5pe25by65Yi257uR5a6aXHJcbiAgICAgICAgICAgICAgICBpZiAoYXBwLmdsb2JhbERhdGEuY29sbGVnZSAhPSBudWxsICYmIGFwcC5nbG9iYWxEYXRhLnBlcnNvbklEICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBhaW0gPSBEaXJlY3RBaW0uSW5kZXhcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0KGFpbSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKChyZWFzb24pID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlYXNvbilcclxuICAgICAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgYXN5bmMgaW5pdE9wZW5pZCgpIHtcclxuICAgICAgICBsZXQgY29kZSA9IGF3YWl0IG5ldyBQcm9taXNlPHd4LkxvZ2luUmVzcG9uc2U+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgd3gubG9naW4oeyBzdWNjZXNzOiByZXNvbHZlLCBmYWlsOiByZWplY3QgfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIGxldCByZXMgPSBhd2FpdCBuZXcgUHJvbWlzZTxvcGVuaWRSZXM+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgd3gucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IGFwcC5nbG9iYWxEYXRhLmhvc3ROYW1lICsgJy9nbG9iYWwvb3BlbmlkJyxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7IGNvZGU6IGNvZGUuY29kZSB9LFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHsgZGF0YSB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSg8b3BlbmlkUmVzPmRhdGEpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogcmVqZWN0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZiAocmVzLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgYXBwLmdsb2JhbERhdGEub3BlbmlkID0gcmVzLnJlc3VsdFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IOacquiDveiOt+WPluWIsG9wZW5pZO+8jOWBmuWHuuWkhOeQhlxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcGVyc29uSUQgPSBhd2FpdCBuZXcgUHJvbWlzZTxwZXJzb25JRFJlcz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgIHVybDogYXBwLmdsb2JhbERhdGEuaG9zdE5hbWUgKyAnL2dsb2JhbC9wZXJzb25faWQnLFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHsgb3BlbmlkOiBhcHAuZ2xvYmFsRGF0YS5vcGVuaWQgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ICh7IGRhdGEgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoPHBlcnNvbklEUmVzPmRhdGEpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogcmVqZWN0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZiAocGVyc29uSUQuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICBhcHAuZ2xvYmFsRGF0YS5jb2xsZWdlID0gcGVyc29uSUQucmVzdWx0LmNvbGxlZ2VcclxuICAgICAgICAgICAgYXBwLmdsb2JhbERhdGEucGVyc29uSUQgPSBwZXJzb25JRC5yZXN1bHQucGVyc29uSURcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZXJyb3Lmipvlh7rliLDlpJbpnaLvvIznlLFjYXRjaOWkhOeQhlxyXG4gICAgfSxcclxuXHJcbiAgICBkaXJlY3QoYWltOiBEaXJlY3RBaW0pIHtcclxuICAgICAgICAvLyBUT0RPOiDlnKjmraTlpITlrozmiJDlrp7pmYXnmoTot7Povazov4fnqIvvvIzot7Povazoh7PkuLvpobXpnaJcclxuICAgICAgICBpZiAoYWltID09IERpcmVjdEFpbS5CaW5kaW5nKSB7XHJcbiAgICAgICAgICAgIC8vIOi3s+i9rOiHs+e7keWumumhtVxyXG4gICAgICAgIH0gZWxzZSBpZiAoYWltID09IERpcmVjdEFpbS5JbmRleCkge1xyXG4gICAgICAgICAgICAvLyDot7Povazoh7PkuLvpobVcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pXHJcbiJdfQ==