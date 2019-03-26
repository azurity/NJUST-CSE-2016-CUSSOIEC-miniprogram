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
            if (app.globalData.personInfo != null) {
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
            var code, res, personInfo;
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
                                    url: app.globalData.hostName + '/user/info',
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
                        personInfo = _a.sent();
                        if (personInfo.success) {
                            app.globalData.personInfo = personInfo.result;
                        }
                        return [2];
                }
            });
        });
    },
    direct: function (aim) {
        if (aim == DirectAim.Binding) {
            wx.redirectTo({ url: '/pages/binding/binding' });
        }
        else if (aim == DirectAim.Index) {
            wx.switchTab({ url: '/pages/index/index' });
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF1bmNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGF1bmNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLQSxJQUFNLEdBQUcsR0FBRyxNQUFNLEVBQVUsQ0FBQTtBQUU1QixJQUFLLFNBR0o7QUFIRCxXQUFLLFNBQVM7SUFDViwrQ0FBTyxDQUFBO0lBQ1AsMkNBQUssQ0FBQTtBQUNULENBQUMsRUFISSxTQUFTLEtBQVQsU0FBUyxRQUdiO0FBRUQsSUFBSSxDQUFDO0lBSUQsSUFBSSxFQUFFLEVBQUU7SUFLUixNQUFNO1FBQU4saUJBYUM7UUFaRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7YUFDM0IsSUFBSSxDQUFDO1lBQ0YsSUFBSSxHQUFHLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQTtZQUMzQixJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsVUFBVSxJQUFJLElBQUksRUFBRTtnQkFDbkMsR0FBRyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUE7YUFDeEI7WUFDRCxLQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ3BCLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxVQUFDLE1BQU07WUFFVixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ3ZCLENBQUMsQ0FBQyxDQUFBO0lBQ1YsQ0FBQztJQUVLLFVBQVU7Ozs7OzRCQUNELFdBQU0sSUFBSSxPQUFPLENBQW1CLFVBQUMsT0FBTyxFQUFFLE1BQU07NEJBQzNELEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFBO3dCQUNoRCxDQUFDLENBQUMsRUFBQTs7d0JBRkUsSUFBSSxHQUFHLFNBRVQ7d0JBQ1EsV0FBTSxJQUFJLE9BQU8sQ0FBWSxVQUFDLE9BQU8sRUFBRSxNQUFNO2dDQUNuRCxFQUFFLENBQUMsT0FBTyxDQUFDO29DQUNQLEdBQUcsRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsR0FBRyxnQkFBZ0I7b0NBQy9DLE1BQU0sRUFBRSxLQUFLO29DQUNiLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFO29DQUN6QixPQUFPLEVBQUUsVUFBQyxFQUFROzRDQUFOLGNBQUk7d0NBQ1osT0FBTyxDQUFZLElBQUksQ0FBQyxDQUFBO29DQUM1QixDQUFDO29DQUNELElBQUksRUFBRSxNQUFNO2lDQUNmLENBQUMsQ0FBQTs0QkFDTixDQUFDLENBQUMsRUFBQTs7d0JBVkUsR0FBRyxHQUFHLFNBVVI7d0JBQ0YsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFOzRCQUNiLEdBQUcsQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUE7eUJBQ3JDOzZCQUFNO3lCQUVOO3dCQUNnQixXQUFNLElBQUksT0FBTyxDQUFVLFVBQUMsT0FBTyxFQUFFLE1BQU07Z0NBQ3hELEVBQUUsQ0FBQyxPQUFPLENBQUM7b0NBQ1AsR0FBRyxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxHQUFHLFlBQVk7b0NBQzNDLE1BQU0sRUFBRSxLQUFLO29DQUNiLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRTtvQ0FDdkMsT0FBTyxFQUFFLFVBQUMsRUFBUTs0Q0FBTixjQUFJO3dDQUNaLE9BQU8sQ0FBVSxJQUFJLENBQUMsQ0FBQTtvQ0FDMUIsQ0FBQztvQ0FDRCxJQUFJLEVBQUUsTUFBTTtpQ0FDZixDQUFDLENBQUE7NEJBQ04sQ0FBQyxDQUFDLEVBQUE7O3dCQVZFLFVBQVUsR0FBRyxTQVVmO3dCQUNGLElBQUksVUFBVSxDQUFDLE9BQU8sRUFBRTs0QkFDcEIsR0FBRyxDQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQTt5QkFDaEQ7Ozs7O0tBRUo7SUFFRCxNQUFNLFlBQUMsR0FBYztRQUNqQixJQUFJLEdBQUcsSUFBSSxTQUFTLENBQUMsT0FBTyxFQUFFO1lBRTFCLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxHQUFHLEVBQUUsd0JBQXdCLEVBQUUsQ0FBQyxDQUFBO1NBQ25EO2FBQU0sSUFBSSxHQUFHLElBQUksU0FBUyxDQUFDLEtBQUssRUFBRTtZQUUvQixFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsR0FBRyxFQUFFLG9CQUFvQixFQUFFLENBQUMsQ0FBQTtTQUM5QztJQUNMLENBQUM7Q0FDSixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBwYWdlcy9sYXVuY2gvbGF1bmNoLmpzXHJcbmltcG9ydCB7IElNeUFwcCB9IGZyb20gJy4uLy4uL2FwcCdcclxuaW1wb3J0IHsgb3BlbmlkUmVzIH0gZnJvbSAnLi4vLi4vdXRpbHMvZ2xvYmFsUmVzJ1xyXG5pbXBvcnQgeyBpbmZvUmVzIH0gZnJvbSAnLi4vLi4vdXRpbHMvaW5mby9pbmZvUmVzJ1xyXG5cclxuY29uc3QgYXBwID0gZ2V0QXBwPElNeUFwcD4oKVxyXG5cclxuZW51bSBEaXJlY3RBaW0ge1xyXG4gICAgQmluZGluZyxcclxuICAgIEluZGV4XHJcbn1cclxuXHJcblBhZ2Uoe1xyXG4gICAgLyoqXHJcbiAgICAgKiDpobXpnaLnmoTliJ3lp4vmlbDmja5cclxuICAgICAqL1xyXG4gICAgZGF0YToge30sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWKoOi9ve+8jOWcqOatpOWkhOWBmumcgOimgeWQjOatpeeahOWIneWni+WMllxyXG4gICAgICovXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgUHJvbWlzZS5hbGwoW3RoaXMuaW5pdE9wZW5pZCgpXSkgLy8g5Yip55SoUHJtb2lzZS5hbGzlgZrlpJrkuKrlubbooYznmoTliJ3lp4vljJbmtYHnqItcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGFpbSA9IERpcmVjdEFpbS5CaW5kaW5nIC8vIOayoeacieWtpuWPt+S/oeaBr+aXtuW8uuWItue7keWumlxyXG4gICAgICAgICAgICAgICAgaWYgKGFwcC5nbG9iYWxEYXRhLnBlcnNvbkluZm8gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFpbSA9IERpcmVjdEFpbS5JbmRleFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kaXJlY3QoYWltKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKHJlYXNvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gVE9ETzog6ZSZ6K+v5aSE55CGXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZWFzb24pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGFzeW5jIGluaXRPcGVuaWQoKSB7XHJcbiAgICAgICAgbGV0IGNvZGUgPSBhd2FpdCBuZXcgUHJvbWlzZTx3eC5Mb2dpblJlc3BvbnNlPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHd4LmxvZ2luKHsgc3VjY2VzczogcmVzb2x2ZSwgZmFpbDogcmVqZWN0IH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICBsZXQgcmVzID0gYXdhaXQgbmV3IFByb21pc2U8b3BlbmlkUmVzPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBhcHAuZ2xvYmFsRGF0YS5ob3N0TmFtZSArICcvZ2xvYmFsL29wZW5pZCcsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogeyBjb2RlOiBjb2RlLmNvZGUgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ICh7IGRhdGEgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoPG9wZW5pZFJlcz5kYXRhKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6IHJlamVjdFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaWYgKHJlcy5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIGFwcC5nbG9iYWxEYXRhLm9wZW5pZCA9IHJlcy5yZXN1bHRcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBUT0RPOiDmnKrog73ojrflj5bliLBvcGVuaWTvvIzlgZrlh7rlpITnkIZcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHBlcnNvbkluZm8gPSBhd2FpdCBuZXcgUHJvbWlzZTxpbmZvUmVzPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBhcHAuZ2xvYmFsRGF0YS5ob3N0TmFtZSArICcvdXNlci9pbmZvJyxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7IG9wZW5pZDogYXBwLmdsb2JhbERhdGEub3BlbmlkIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoeyBkYXRhIH0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKDxpbmZvUmVzPmRhdGEpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogcmVqZWN0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZiAocGVyc29uSW5mby5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIGFwcC5nbG9iYWxEYXRhLnBlcnNvbkluZm8gPSBwZXJzb25JbmZvLnJlc3VsdFxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBlcnJvcuaKm+WHuuWIsOWklumdou+8jOeUsWNhdGNo5aSE55CGXHJcbiAgICB9LFxyXG5cclxuICAgIGRpcmVjdChhaW06IERpcmVjdEFpbSkge1xyXG4gICAgICAgIGlmIChhaW0gPT0gRGlyZWN0QWltLkJpbmRpbmcpIHtcclxuICAgICAgICAgICAgLy8g6Lez6L2s6Iez57uR5a6a6aG1XHJcbiAgICAgICAgICAgIHd4LnJlZGlyZWN0VG8oeyB1cmw6ICcvcGFnZXMvYmluZGluZy9iaW5kaW5nJyB9KVxyXG4gICAgICAgIH0gZWxzZSBpZiAoYWltID09IERpcmVjdEFpbS5JbmRleCkge1xyXG4gICAgICAgICAgICAvLyDot7Povazoh7PkuLvpobVcclxuICAgICAgICAgICAgd3guc3dpdGNoVGFiKHsgdXJsOiAnL3BhZ2VzL2luZGV4L2luZGV4JyB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSlcclxuIl19